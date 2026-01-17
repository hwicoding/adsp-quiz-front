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
  subjectId?: string
  questionCount?: number
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

export interface ApiError {
  message: string
  code?: string
  details?: unknown
}
