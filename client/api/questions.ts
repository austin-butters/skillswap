import { Question } from '#models'
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
