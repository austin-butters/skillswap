//====================================================================================================
// USERS
//====================================================================================================

// ------------------------------ SETUP ------------------------------ //

import db from '../connection'
import {
  Question,
  UnassignedQuestion,
  QuestionBody,
  QuestionTitle,
  QuestionId,
} from '#models/question'
import { UserId } from '#models'

const questionFieldsToCamelCase: (keyof Question | string)[] = [
  'id',
  'user_id as userId',
  'title',
  'body',
]

interface DBUnassignedQuestion {
  user_id: UserId
  title: QuestionTitle
  body: QuestionBody
}

// Eventually, this will extend Omit<DBUnassignedQuestion, "user_id">, re-adding user_id as possibly null to allow for user deletion.
// interface DBQuestion extends DBUnassignedQuestion {
//   id: QuestionId
// }

// ------------------------------ CREATE ------------------------------ //
export async function addQuestion(
  question: UnassignedQuestion,
): Promise<QuestionId> {
  const { userId: user_id, title, body } = question
  const newDBQuestion: DBUnassignedQuestion = { user_id, title, body }
  const result = await db('questions').insert(newDBQuestion).returning('id')
  return result[0].id as QuestionId // May need changing in future for PostgreSQL.
}

// ------------------------------ READ ------------------------------ //
export async function getQuestions(): Promise<Question[]> {
  return await db('questions').select(...questionFieldsToCamelCase)
}

export async function getQuestion(id: QuestionId): Promise<Question> {
  return await db('questions')
    .where('id', id)
    .select(...questionFieldsToCamelCase)
}

export async function getQuestionsByUser(userId: UserId): Promise<Question[]> {
  return await db('questions')
    .where('user_id', userId)
    .select(...questionFieldsToCamelCase)
}

// ------------------------------ UPDATE ------------------------------ //

// ------------------------------ DELETE ------------------------------ //
export async function deleteQuestion(id: QuestionId): Promise<void> {
  await db('questions').where('id', id).del()
}
