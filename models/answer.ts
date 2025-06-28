import { QuestionId } from './question'
import { UserId } from './user'

export type AnswerId = number
export type AnswerReplyTo = QuestionId | null
export type AnswerBody = string

export interface UnassignedAnswer {
  userId: UserId
  questionId: QuestionId
  replyTo: AnswerReplyTo
  body: AnswerBody
}

export interface Answer extends UnassignedAnswer {
  id: AnswerId
}
