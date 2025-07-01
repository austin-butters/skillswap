import {
  Answer,
  AnswerId,
  JWT,
  QuestionId,
  UnassignedAnswer,
  User,
  UserId,
} from '#models'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  addAnswer,
  getAnswerById,
  getAnswersByQuestion,
  getAnswersByUser,
} from '../api/answers'
import { useAuth0 } from '@auth0/auth0-react'
import { getAnswerReplys } from '../api/answers'
import { useUserById } from './useUsers'

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
      console.log('mutationFn for useAddAnswer') // TEST LOG
      const token: JWT = await getAccessTokenSilently()
      addAnswer(newAnswer, token)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['answers'] }),
  })
  return mutation
}

export function useAnswer(answerId: AnswerId) {
  const answerQuery = useQuery({
    queryKey: ['answer', answerId],
    queryFn: async () => await getAnswerById(answerId),
  })

  console.log(answerQuery.status)

  const answerReplysQuery = useQuery({
    queryKey: ['replys', answerId],
    queryFn: async () => {
      if (answerQuery.status !== 'success') return []
      return await getAnswerReplys(answerId)
    },
    enabled: answerQuery.status === 'success',
  })

  const authorQuery = useUserById(answerQuery.data?.userId as number) // FIX - THIS MAY NEED TO BE CONDITIONALLY ENABLED TO PREVENT INFINITE REFETCHES. SHOULD BE FINE FOR NOW

  const addAnswerMutation = useAddAnswer()

  const replyToAnswer = async (reply: UnassignedAnswer) =>
    await addAnswerMutation.mutateAsync(reply)

  const isPending: boolean =
    answerQuery.isPending ||
    (answerReplysQuery.isPending && answerQuery?.data?.replyTo !== null)
  const isError: boolean =
    answerQuery.isError ||
    answerReplysQuery.isError ||
    addAnswerMutation.isError ||
    authorQuery.isError
  const answer: Answer | undefined = answerQuery.data
  const author: User | undefined = authorQuery.user
  const replies: Answer[] | undefined = answerReplysQuery.data

  return {
    author,
    isPending,
    isError,
    answer,
    replies,
    replyToAnswer,
  }
}
