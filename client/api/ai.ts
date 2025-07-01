import { AddCodeFixData, JWT } from '#models'
import request from 'superagent'

const rootURL = new URL('/api/v1', document.baseURI)

export async function getAiResponse(userInput: string, token: JWT) {
  const response = await request
    .get(`${rootURL}/ai?prompt=${userInput}`)
    .set('Authorization', `Bearer ${token}`)
  return `${response.body[0].content.parts[0].text}`
}

export async function addAiResponse(responseData: AddCodeFixData, token: JWT) {
  const response = await request
    .post(`${rootURL}/ai`)
    .set('Authorization', `Bearer ${token}`)
    .send(responseData)
  return response.body
}
