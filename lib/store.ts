import { create } from 'zustand'

interface GameState {
  companyName: string
  startupType: string
  location: string
  teamInfo: string
  initGame: (params: {
    companyName: string
    startupType: string
    location: string
    teamInfo: string
  }) => void
}

export const useGameStore = create<GameState>((set) => ({
  companyName: '',
  startupType: '',
  location: '',
  teamInfo: '',
  initGame: (params) => {
    set({
      companyName: params.companyName,
      startupType: params.startupType,
      location: params.location,
      teamInfo: params.teamInfo,
    })
  },
}))
