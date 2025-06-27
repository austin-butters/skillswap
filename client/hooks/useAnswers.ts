import { AnswerId, QuestionId, UserId } from '#models'
import { useQuery } from '@tanstack/react-query'
import {
  getAnswerById,
  getAnswersByQuestion,
  getAnswersByUser,
} from '../api/answers'

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
