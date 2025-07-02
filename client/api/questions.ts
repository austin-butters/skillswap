import { Question, QuestionId } from '#models'
import request from 'superagent'

const rootUrl = new URL(`/api/v1/questions`, document.baseURI)

export async function getAllQuestions(): Promise<Question[]> {
  try {
    const response = await request.get(`${rootUrl}/`)
    return response.body
  } catch (err) {
    throw new Error('Unknown error fetching questions')
  }
}

export async function getQuestionById(
  questionId: QuestionId,
): Promise<Question> {
  console.log(`getQuestionById(${questionId})`)
  try {
    if (isNaN(questionId) || !Number.isInteger(questionId)) {
      throw new Error('Bad request: invalid question id')
    }
    const response = await request.get(`${rootUrl}/${String(questionId)}`)
    return response.body
  } catch (err) {
    throw new Error('Unknown error fetching question')
  }
}
