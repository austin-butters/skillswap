import { UserId } from '#models'

export type QuestionId = number
export type QuestionTitle = string
export type QuestionBody = string

export interface UnassignedQuestion {
  userId: UserId
  title: QuestionTitle
  body: QuestionBody
}

export interface Question extends UnassignedQuestion {
  id: QuestionId
}
