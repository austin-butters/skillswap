import { AddCodeFixData, JWT, UserId } from '#models'
import request from 'superagent'

const rootURL = new URL('/api/v1', document.baseURI)

export async function getAiResponse(
  title: string,
  userInput: string,
  token: JWT,
) {
  const response = await request
    .post(`${rootURL}/ai/response/${title}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ userInput })
  return `${response.body[0].content.parts[0].text}`
}

export async function addAiResponse(responseData: AddCodeFixData, token: JWT) {
  const response = await request
    .post(`${rootURL}/ai`)
    .set('Authorization', `Bearer ${token}`)
    .send(responseData)
  return response.body
}

export async function getUsersCodeFixes(userId: UserId, token: JWT) {
  const response = await request
    .get(`${rootURL}/ai/user/${userId}`)
    .set('Authorization', `Bearer ${token}`)
  return response.body
}
