import { QuestionId, UserId } from '#models'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllQuestions, getQuestionByUser } from '../api/questions'
import { getQuestionById } from '../api/questions'
import request from 'superagent'
import { useAuth0 } from '@auth0/auth0-react'
import { getUserById } from '../api/users'

export function useAddQuestion() {
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (question: {
      userId: number
      title: string
      body: string
    }) => {
      const token = await getAccessTokenSilently()
      const response = await request
        .post(`/api/v1/questions`)
        .send(question)
        .set('Authorization', `Bearer ${token}`)
      return response.body
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['questions'] }),
  })
}

export function useQuestions() {
  const { data: questions, ...properties } = useQuery({
    queryKey: ['questions'],
    queryFn: async () => await getAllQuestions(),
  })

  return { questions, ...properties }
}

export function useQuestionById(id: QuestionId) {
  const { data: question, ...properties } = useQuery({
    queryKey: ['question'],
    queryFn: async () => await getQuestionById(id),
  })
  return { question, ...properties }
}

export function useQuestionByUserId(userId: number) {
  const { data: question, ...properties } = useQuery({
    queryKey: ['questions'],
    queryFn: () => getQuestionByUser(userId),
  })
  return { question, ...properties }
}

export function useQuestionAuthor(authorId: UserId | undefined) {
  const { data: author, ...props } = useQuery({
    queryKey: ['questionAuthor', authorId],
    queryFn: async () => await getUserById(authorId as UserId),
    enabled: !!authorId,
  })
  return { author, ...props }
}
