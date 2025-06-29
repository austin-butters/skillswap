import { AnswerId, JWT, QuestionId, UnassignedAnswer, UserId } from '#models'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  addAnswer,
  getAnswerById,
  getAnswersByQuestion,
  getAnswersByUser,
} from '../api/answers'
import { useAuth0 } from '@auth0/auth0-react'

export function useAnswerById(answerId: AnswerId, enable: boolean = true) {
  const { data: answer, ...properties } = useQuery({
    queryKey: ['answer'],
    queryFn: () => getAnswerById(answerId),
    enabled: enable,
  })
  return { answer, ...properties }
}

export function useAnswersByQuestion(
  questionId: QuestionId,
  enable: boolean = true,
) {
  const { data: answers, ...properties } = useQuery({
    queryKey: ['answers'],
    queryFn: () => getAnswersByQuestion(questionId),
    enabled: enable,
  })
  return { answers, ...properties }
}

export function useAnswersByUser(userId: UserId, enable: boolean = true) {
  const { data: answers, ...properties } = useQuery({
    queryKey: ['answers'],
    queryFn: () => getAnswersByUser(userId),
    enabled: enable,
  })
  return { answers, ...properties }
}

export function useAddAnswer() {
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (newAnswer: UnassignedAnswer) => {
      const token: JWT = await getAccessTokenSilently()
      addAnswer(newAnswer, token)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['answers'] }),
  })
  return mutation
}
