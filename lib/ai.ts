import OpenAI from 'openai'
import { StreamingTextResponse, LangChainStream } from 'ai'
import { generateDefaultStartup, generateStartupSuggestions } from './startup-defaults'

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
  baseURL: process.env.NEXT_PUBLIC_OPENAI_API_BASE_URL,
  dangerouslyAllowBrowser: true,
})

export async function generateInitialStory({
  companyName,
  startupType,
  location,
  teamInfo,
  onStream,
}: {
  companyName: string
  startupType: string
  location: string
  teamInfo: string
  onStream: (chunk: string) => void
}): Promise<void> {
  const response = await openai.chat.completions.create({
    model: process.env.NEXT_PUBLIC_OPENAI_MODEL_NAME || 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `你是一个创业模拟器，用第一人称视角("你")讲述创业故事。要求：
1. 用"你"作为第一人称主角
2. 每次生成200-300字的内容
3. 内容要具体生动，富有代入感
4. 结尾给出一个需要玩家决策的场景`,
      },
      {
        role: 'user',
        content: `生成一个创业开局故事：

公司名称：${companyName}
创业类型：${startupType}
创业地点：${location}
团队信息：${teamInfo}

要求：
1. 以"你"为主角描述创业初期场景
2. 介绍公司成立背景和现状
3. 描述团队优势
4. 提出一个需要决策的关键场景
5. 用Markdown格式输出，标题用一级标题`,
      },
    ],
    stream: true,
  })

  for await (const chunk of response) {
    const content = chunk.choices[0]?.delta?.content || ''
    onStream(content)
  }
}

export async function generateChoices({
  story,
  context,
}: {
  story: string
  context: string
}): Promise<{ choices: string[] }> {
  const response = await openai.chat.completions.create({
    model: process.env.NEXT_PUBLIC_OPENAI_MODEL_NAME || 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: '你是一个创业顾问，负责为创业者提供选择建议。每个选择都应该具体且有趣，能推动故事发展。',
      },
      {
        role: 'user',
        content: `基于以下背景和故事，生成3-4个可能的选择。每个选择应该：
1. 不超过20个字
2. 具体可执行
3. 有趣且符合逻辑
4. 能带来不同的结果

背景信息：
${context}

当前故事：
${story}

请返回一个JSON对象，格式为：{"choices": ["选项1", "选项2", "选项3"]}`,
      },
    ],
    response_format: { type: 'json_object' },
  })

  try {
    const content = response.choices[0].message.content
    if (!content) {
      console.error('No content in response')
      return { choices: ['招募技术团队', '寻找投资人', '开发产品原型'] }
    }
    
    const result = JSON.parse(content)
    if (!result.choices || !Array.isArray(result.choices) || result.choices.length === 0) {
      console.error('Invalid choices format:', result)
      return { choices: ['招募技术团队', '寻找投资人', '开发产品原型'] }
    }
    
    return result
  } catch (error) {
    console.error('Failed to parse choices:', error)
    return { choices: ['招募技术团队', '寻找投资人', '开发产品原型'] }
  }
}

export async function generateNextEvent({
  story,
  choice,
  context,
  onStream,
}: {
  story: string
  choice: string
  context: string
  onStream: (chunk: string) => void
}): Promise<void> {
  const response = await openai.chat.completions.create({
    model: process.env.NEXT_PUBLIC_OPENAI_MODEL_NAME || 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `你是一个创业模拟器，用第一人称视角("你")讲述创业故事。要求：
1. 用"你"作为第一人称主角
2. 每次生成200-300字的内容
3. 内容要具体生动，富有代入感
4. 结尾给出一个需要玩家决策的场景`,
      },
      {
        role: 'user',
        content: `基于玩家的选择，继续创业故事：

背景信息：
${context}

当前故事：
${story}

玩家选择：${choice}

要求：
1. 以"你选择了${choice}"开头
2. 详细描述选择带来的具体结果
3. 提出新的决策场景
4. 用Markdown格式输出，用一级标题`,
      },
    ],
    stream: true,
  })

  for await (const chunk of response) {
    const content = chunk.choices[0]?.delta?.content || ''
    onStream(content)
  }
}

export async function generateStartupTypes(): Promise<string[]> {
  // 先返回本地默认值
  const localTypes = generateStartupSuggestions(5)

  try {
    // 异步获取AI生成的建议
    const response = await openai.chat.completions.create({
      model: process.env.NEXT_PUBLIC_OPENAI_MODEL_NAME || 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: '你是一个创业顾问，负责推荐有趣且现实的创业方向。',
        },
        {
          role: 'user',
          content: '请推荐5个有趣的创业方向，要求：\n1. 每个选项不超过10个字\n2. 要具体可执行\n3. 符合当前创业趋势\n4. 返回JSON格式',
        },
      ],
      response_format: { type: 'json_object' },
    })

    const result = JSON.parse(response.choices[0].message.content!) as {
      types: string[]
    }
    return result.types
  } catch (error) {
    console.error('Failed to generate startup types:', error)
    return localTypes
  }
}

export async function generateStartupDefaults(): Promise<{
  companyName: string
  startupType: string
  location: string
  teamInfo: string
}> {
  // 直接返回本地默认值
  return generateDefaultStartup()
}
