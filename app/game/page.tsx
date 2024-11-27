'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useGameStore } from '@/lib/store'
import { generateInitialStory, generateChoices, generateNextEvent } from '@/lib/ai'
import { Loader2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

export default function GamePage() {
  const router = useRouter()
  const gameState = useGameStore()
  const [story, setStory] = useState('')
  const [choices, setChoices] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingChoices, setIsLoadingChoices] = useState(false)
  const [isGeneratingStory, setIsGeneratingStory] = useState(false)

  useEffect(() => {
    if (!gameState.companyName) {
      router.push('/')
      return
    }
    startGame()
  }, [])

  const startGame = async () => {
    setIsLoading(true)
    setIsGeneratingStory(true)
    setStory('')
    setChoices([])
    let storyContent = ''
    
    // 先生成故事
    await generateInitialStory({
      companyName: gameState.companyName,
      startupType: gameState.startupType,
      location: gameState.location,
      teamInfo: gameState.teamInfo,
      onStream: (chunk) => {
        storyContent += chunk
        setStory(storyContent)
      }
    })
    
    setIsGeneratingStory(false)

    // 再生成选项
    setIsLoadingChoices(true)
    try {
      const result = await generateChoices({
        story: storyContent,
        context: `公司：${gameState.companyName}
类型：${gameState.startupType}
地点：${gameState.location}
团队：${gameState.teamInfo}`
      })
      setChoices(result.choices || [])
    } catch (error) {
      console.error('Failed to generate choices:', error)
      setChoices([])
    } finally {
      setIsLoadingChoices(false)
      setIsLoading(false)
    }
  }

  const handleChoice = async (choice: string) => {
    setIsLoading(true)
    setIsGeneratingStory(true)
    const currentStory = story
    let newStoryContent = currentStory + '\n\n---\n\n'
    setStory(newStoryContent)
    setChoices([])

    // 先生成故事
    await generateNextEvent({
      story: currentStory,
      choice,
      context: `公司：${gameState.companyName}
类型：${gameState.startupType}
地点：${gameState.location}
团队：${gameState.teamInfo}`,
      onStream: (chunk) => {
        newStoryContent += chunk
        setStory(newStoryContent)
      }
    })
    
    setIsGeneratingStory(false)

    // 再生成选项
    setIsLoadingChoices(true)
    try {
      const result = await generateChoices({
        story: newStoryContent,
        context: `公司：${gameState.companyName}
类型：${gameState.startupType}
地点：${gameState.location}
团队：${gameState.teamInfo}`
      })
      setChoices(result.choices || [])
    } catch (error) {
      console.error('Failed to generate choices:', error)
      setChoices([])
    } finally {
      setIsLoadingChoices(false)
      setIsLoading(false)
    }
  }

  if (!gameState.companyName) {
    return null
  }

  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <Card className="p-6">
        <div className="space-y-6">
          <div className={`prose dark:prose-invert max-w-none transition-all duration-200 ${isGeneratingStory ? 'opacity-50' : ''}`}>
            <ReactMarkdown className="whitespace-pre-wrap leading-relaxed">{story || '加载中...'}</ReactMarkdown>
          </div>

          {!isGeneratingStory && !isLoading && (
            <div className="space-y-2 transition-all duration-200">
              {isLoadingChoices ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <span>正在思考可能的选择...</span>
                </div>
              ) : choices.length > 0 ? (
                choices.map((choice, index) => (
                  <Button
                    key={index}
                    className="w-full text-left h-auto whitespace-normal py-4"
                    variant="outline"
                    onClick={() => handleChoice(choice)}
                    disabled={isLoading}
                  >
                    {choice}
                  </Button>
                ))
              ) : (
                <div className="text-center text-gray-500">
                  暂无可用选项
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </main>
  )
}
