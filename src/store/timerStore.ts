import { create } from 'zustand'

interface TimerState {
  seconds: number
  isRunning: boolean
  start: (initialSeconds: number) => void
  pause: () => void
  resume: () => void
  reset: () => void
  tick: () => void
}

export const useTimerStore = create<TimerState>((set, get) => ({
  seconds: 0,
  isRunning: false,
  start: (initialSeconds: number) => {
    set({ seconds: initialSeconds, isRunning: true })
  },
  pause: () => {
    set({ isRunning: false })
  },
  resume: () => {
    set({ isRunning: true })
  },
  reset: () => {
    set({ seconds: 0, isRunning: false })
  },
  tick: () => {
    const { seconds, isRunning } = get()
    if (isRunning && seconds > 0) {
      set({ seconds: seconds - 1 })
    }
  },
}))
