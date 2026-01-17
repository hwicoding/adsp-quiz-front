import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from './client'
import type {
  StartExamRequest,
  StartExamResponse,
  SubmitExamRequest,
  ExamResult,
} from './types'

export const useStartExam = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: StartExamRequest): Promise<StartExamResponse> => {
      return apiClient.post<StartExamResponse>('/api/v1/exam/start', data)
    },
    onSuccess: (data) => {
      // 시험 세션 정보를 캐시에 저장
      queryClient.setQueryData(['exam', data.examSessionId], data)
      // 각 문제를 개별적으로 캐시
      data.quizzes.forEach((quiz) => {
        queryClient.setQueryData(['quiz', quiz.id], quiz)
      })
    },
  })
}

export const useSubmitExam = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: SubmitExamRequest): Promise<ExamResult> => {
      return apiClient.post<ExamResult>('/api/v1/exam/submit', data)
    },
    onSuccess: (data, variables) => {
      // 시험 결과를 캐시에 저장
      queryClient.setQueryData(['exam-result', variables.examSessionId], data)
      // 시험 세션 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['exam', variables.examSessionId] })
    },
  })
}

export const useExamResult = (examSessionId: string | null) => {
  return useQuery({
    queryKey: ['exam-result', examSessionId],
    queryFn: async (): Promise<ExamResult> => {
      if (!examSessionId) throw new Error('Exam session ID is required')
      return apiClient.get<ExamResult>(`/api/v1/exam/${examSessionId}`)
    },
    enabled: !!examSessionId,
    staleTime: 1000 * 60 * 10, // 10분
  })
}
