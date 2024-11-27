export interface GameState {
  companyName: string
  startupType: string
  stage: string
  metrics: {
    cash: number
    revenue: number
    employees: number
    partners: number
    reputation: number
    morale: number
    technology: number
    marketShare: number
  }
  history: GameEvent[]
  currentEvent?: GameEvent
  isGameOver: boolean
  endingType?: 'bankruptcy' | 'ipo' | 'acquisition' | 'dissolution'
}

export interface GameEvent {
  id: string
  type: 'choice' | 'random' | 'milestone'
  description: string
  choices: Choice[]
  timestamp: number
}

export interface Choice {
  id: string
  text: string
  consequences: {
    description: string
    metrics: Partial<GameState['metrics']>
  }
}

export interface APILatency {
  latency: number
}

export interface AIResponse {
  event: GameEvent
  systemMessage: string
  apiLatency: APILatency
}
