'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { useGameStore } from '@/lib/store'
import { generateStartupTypes, generateStartupDefaults } from '@/lib/ai'
import { Loader2 } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  const { toast } = useToast()
  const initGame = useGameStore((state) => state.initGame)

  const [companyName, setCompanyName] = useState('')
  const [startupType, setStartupType] = useState('')
  const [location, setLocation] = useState('')
  const [teamInfo, setTeamInfo] = useState('')
  const [startupTypes, setStartupTypes] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingDefaults, setIsLoadingDefaults] = useState(true)

  useEffect(() => {
    loadDefaults()
  }, [])

  const loadDefaults = async () => {
    setIsLoadingDefaults(true)
    try {
      const defaults = await generateStartupDefaults()
      setCompanyName(defaults.companyName)
      setStartupType(defaults.startupType)
      setLocation(defaults.location)
      setTeamInfo(defaults.teamInfo)
    } catch (error) {
      console.error('Failed to load defaults:', error)
      toast({
        title: '加载默认值失败',
        description: '使用备用默认值',
        variant: 'destructive',
      })
    } finally {
      setIsLoadingDefaults(false)
    }
  }

  const loadStartupTypes = async () => {
    setIsLoading(true)
    try {
      const types = await generateStartupTypes()
      setStartupTypes(types)
    } catch (error) {
      console.error('Failed to load startup types:', error)
      toast({
        title: '加载失败',
        description: '无法加载创业类型，请刷新页面重试',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleStart = () => {
    if (!companyName.trim()) {
      toast({
        title: '请输入公司名称',
        description: '公司名称不能为空',
        variant: 'destructive',
      })
      return
    }

    if (!startupType.trim()) {
      toast({
        title: '请选择创业类型',
        description: '请选择一个创业类型',
        variant: 'destructive',
      })
      return
    }

    if (!location.trim()) {
      toast({
        title: '请输入创业地点',
        description: '创业地点不能为空',
        variant: 'destructive',
      })
      return
    }

    if (!teamInfo.trim()) {
      toast({
        title: '请输入团队信息',
        description: '团队信息不能为空',
        variant: 'destructive',
      })
      return
    }

    initGame({
      companyName,
      startupType,
      location,
      teamInfo
    })
    router.push('/game')
  }

  if (isLoadingDefaults) {
    return (
      <main className="container mx-auto p-4 max-w-2xl">
        <Card className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>正在生成创业方案...</span>
          </div>
        </Card>
      </main>
    )
  }

  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">AI创业模拟器</h1>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="company-name">公司名称</Label>
            <Input
              id="company-name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="输入你的公司名称"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="startup-type">创业类型</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="startup-type"
                value={startupType}
                onChange={(e) => setStartupType(e.target.value)}
                placeholder="选择或输入创业类型"
              />
              <Button
                variant="outline"
                onClick={loadStartupTypes}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  '换个创业类型'
                )}
              </Button>
            </div>
            {startupTypes.length > 0 && (
              <div className="mt-2">
                <div className="flex flex-wrap gap-2">
                  {startupTypes.map((type) => (
                    <Button
                      key={type}
                      variant="outline"
                      size="sm"
                      onClick={() => setStartupType(type)}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="location">创业地点</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="输入创业地点（如：北京中关村）"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="team-info">团队信息</Label>
            <Textarea
              id="team-info"
              value={teamInfo}
              onChange={(e) => setTeamInfo(e.target.value)}
              placeholder="描述你的创始团队（如：技术出身的创始人，5年互联网经验，有3个核心技术成员）"
              className="mt-1"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Button
              className="w-full"
              onClick={handleStart}
              disabled={isLoading}
            >
              开始创业之旅
            </Button>

            <Button
              className="w-full"
              variant="outline"
              onClick={loadDefaults}
              disabled={isLoading}
            >
              换个创业方案
            </Button>
          </div>
        </div>
      </Card>
    </main>
  )
}
