import {
  Answer,
  AnswerId,
  JWT,
  QuestionId,
  UnassignedAnswer,
  UserId,
} from '#models'
import request from 'superagent'

const rootUrl = new URL(`/api/v1/answers`, document.baseURI)

export async function getAnswerById(answerId: AnswerId): Promise<Answer> {
  try {
    const response = await request.get(`${rootUrl}/${answerId}`)
    return response.body
  } catch (err) {
    throw new Error('Unknown error fetching answer')
  }
}

export async function getAnswersByQuestion(
  questionId: QuestionId,
): Promise<Answer[]> {
  try {
    const response = await request.get(`${rootUrl}/question/${questionId}`)
    return response.body
  } catch (err) {
    throw new Error('Unknown error fetching answers')
  }
}

export async function getAnswersByUser(userId: UserId): Promise<Answer[]> {
  try {
    const response = await request.get(`${rootUrl}/user/${userId}`)
    return response.body
  } catch (err) {
    throw new Error('Unknown error fetching answers')
  }
}

// Add return type for this.
export async function addAnswer(
  newAnswer: UnassignedAnswer,
  token: JWT,
): Promise<AnswerId> {
  try {
    const response = await request
      .post(`${rootUrl}/`)
      .set('Authorization', `Bearer ${token}`)
      .send(newAnswer)
    return response.body
  } catch (err) {
    throw new Error('Unknown error posting answer')
  }
}

export async function getAnswerReplys(answerId: AnswerId): Promise<Answer[]> {
  try {
    const response = await request.get(`${rootUrl}/replysto/${answerId}`)
    return response.body
  } catch (err) {
    throw new Error('Unknown error getting answer replys')
  }
}
