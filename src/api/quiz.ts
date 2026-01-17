import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from './client'
import type {
  GenerateQuizRequest,
  GenerateQuizResponse,
  Quiz,
} from './types'

export const useGenerateQuiz = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: GenerateQuizRequest): Promise<GenerateQuizResponse> => {
      return apiClient.post<GenerateQuizResponse>('/api/v1/quiz/generate', data)
    },
    onSuccess: (data) => {
      // 생성된 문제를 캐시에 저장
      queryClient.setQueryData(['quiz', data.quiz.id], data.quiz)
    },
  })
}

export const useQuiz = (quizId: string | null) => {
  return useQuery({
    queryKey: ['quiz', quizId],
    queryFn: async (): Promise<Quiz> => {
      if (!quizId) throw new Error('Quiz ID is required')
      return apiClient.get<Quiz>(`/api/v1/quiz/${quizId}`)
    },
    enabled: !!quizId,
    staleTime: 1000 * 60 * 5, // 5분
  })
}
