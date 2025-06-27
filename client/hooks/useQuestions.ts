import { QuestionId } from '#models'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllQuestions } from 'client/api/questions'
import { getQuestionById } from '../api/questions'
import request from 'superagent'

export function useAddQuestion() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (question: {
      userId: number
      title: string
      body: string
    }) => {
      const response = await request.post(`/api/v1/questions`).send(question)
      return response.body
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['questions'] }),
  })
}

export function useQuestions() {
  const { data: questions, ...properties } = useQuery({
    queryKey: ['questions'],
    queryFn: getAllQuestions,
  })

  return { questions, ...properties }
}

export function useQuestionById(id: QuestionId) {
  const { data: question, ...properties } = useQuery({
    queryKey: ['question'],
    queryFn: () => getQuestionById(id),
  })
  return { question, ...properties }
}
