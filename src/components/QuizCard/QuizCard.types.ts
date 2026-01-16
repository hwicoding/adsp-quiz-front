export interface Quiz {
  id: string
  question: string
  options: string[]
  correctAnswer?: number
  explanation?: string
  category?: string
  difficulty?: 'easy' | 'medium' | 'hard'
}
