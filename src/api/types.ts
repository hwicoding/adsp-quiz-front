export interface Quiz {
  id: string
  question: string
  options: string[]
  correctAnswer?: number
  explanation?: string
  category?: string
  difficulty?: 'easy' | 'medium' | 'hard'
}

export interface GenerateQuizRequest {
  source: 'youtube' | 'text'
  content: string
  subjectId?: string
}

export interface GenerateQuizResponse {
  quiz: Quiz
}

export interface StartExamRequest {
  subjectId?: number
  quizCount?: number
}

export interface StartExamResponse {
  examSessionId: string
  quizzes: Quiz[]
  totalQuestions: number
  timeLimit: number
}

export interface SubmitExamRequest {
  examSessionId: string
  answers: {
    quizId: string
    selectedAnswer: number
  }[]
}

export interface ExamResult {
  examSessionId: string
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
  score: number
  answers: {
    quizId: string
    question: string
    selectedAnswer: number
    correctAnswer: number
    isCorrect: boolean
    explanation?: string
  }[]
  completedAt: string
}

export interface Subject {
  id: number
  name: string
  description: string | null
  quiz_count: number | null
  created_at: string
}

export interface ApiError {
  message: string
  code?: string
  details?: unknown
}
