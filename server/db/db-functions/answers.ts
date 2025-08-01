//====================================================================================================
// ANSWERS
//====================================================================================================

// ------------------------------ SETUP ------------------------------ //

import db from '../connection'

import {
  Answer,
  AnswerBody,
  AnswerId,
  AnswerReplyTo,
  QuestionId,
  UnassignedAnswer,
} from '#models'
import { UserId } from '#models'

const answerFieldsToCamelCase: (keyof Answer | string)[] = [
  'id',
  'user_id as userId',
  'question_id as questionId',
  'reply_to as replyTo',
  'body',
]

interface DBUnassignedAnswer {
  user_id: UserId
  question_id: QuestionId
  reply_to: AnswerReplyTo
  body: AnswerBody
}

// interface DBAnswer extends DBUnassignedAnswer {
//   id: AnswerId
// }

// ------------------------------ CREATE ------------------------------ //
export async function createAnswer(
  newAnswer: UnassignedAnswer,
): Promise<AnswerId> {
  const {
    userId: user_id,
    questionId: question_id,
    replyTo: reply_to,
    body,
  } = newAnswer
  const newDBAnswer: DBUnassignedAnswer = {
    user_id,
    question_id,
    reply_to: reply_to ?? null,
    body,
  }
  const result = await db('answers').insert(newDBAnswer).returning('id')
  return result[0].id as AnswerId
}

// ------------------------------ READ ------------------------------ //
export async function getAnswerById(
  answerId: AnswerId,
): Promise<Answer | undefined> {
  return await db('answers')
    .where('id', answerId)
    .select(...answerFieldsToCamelCase)
    .first()
}

// THIS FUNCTION HAS BEEN CHANGED SO THAT IT ONLY RETURNS DIRECT ANSWERS WITHOUT REPLIES - SHOULD NOT AFFECT OTHER FUNCTIONALITY.
export async function getAnswersByQuestion(
  questionId: QuestionId,
): Promise<Answer[]> {
  return await db('answers')
    .where({ question_id: questionId, reply_to: null })
    .select(...answerFieldsToCamelCase)
}

export async function getAnswersByUser(userId: UserId): Promise<Answer[]> {
  return await db('answers')
    .where('user_id', userId)
    .select(...answerFieldsToCamelCase)
}

export async function getReplysToAnswer(answerId: AnswerId): Promise<Answer[]> {
  if (!answerId) return []
  return await db('answers')
    .where('reply_to', answerId)
    .select(...answerFieldsToCamelCase)
}

export async function getQuestionIdFromAnswer(
  answerId: AnswerId,
): Promise<QuestionId | undefined> {
  if (!answerId) return
  return await db('answers')
    .where({ id: answerId })
    .select('question_id')
    .first()
}
// ------------------------------ UPDATE ------------------------------ //

// ------------------------------ DELETE ------------------------------ //
export async function deleteAnswer(answerId: AnswerId): Promise<void> {
  await db('answers').where('id', answerId).del()
}
