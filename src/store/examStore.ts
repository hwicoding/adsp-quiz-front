import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Answer {
  quizId: string
  selectedAnswer: number
  isCorrect: boolean
}

interface ExamState {
  examSessionId: string | null
  currentQuestionIndex: number
  answers: Answer[]
  startExam: (sessionId: string) => void
  addAnswer: (quizId: string, selectedAnswer: number, isCorrect: boolean) => void
  nextQuestion: () => void
  resetExam: () => void
}

export const useExamStore = create<ExamState>()(
  persist(
    (set) => ({
      examSessionId: null,
      currentQuestionIndex: 0,
      answers: [],
      startExam: (sessionId: string) => {
        set({ examSessionId: sessionId, currentQuestionIndex: 0, answers: [] })
      },
      addAnswer: (quizId: string, selectedAnswer: number, isCorrect: boolean) => {
        set((state) => ({
          answers: [...state.answers, { quizId, selectedAnswer, isCorrect }],
        }))
      },
      nextQuestion: () => {
        set((state) => ({
          currentQuestionIndex: state.currentQuestionIndex + 1,
        }))
      },
      resetExam: () => {
        set({ examSessionId: null, currentQuestionIndex: 0, answers: [] })
      },
    }),
    {
      name: 'exam-storage',
    }
  )
)
