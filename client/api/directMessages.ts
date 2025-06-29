import { JWT } from '#models'
import request from 'superagent'

const rootURL = new URL('/api/v1', document.baseURI)

export async function getDirectMessages(
  userId: number,
  otherId: number,
  token: JWT,
) {
  const response = await request
    .get(`${rootURL}/directMessages/${userId}/${otherId}`)
    .set('Authorization', `Bearer ${token}`)
  return response.body
}

export async function sendDirectMessage(
  userId: number,
  receiverId: number,
  time: string,
  body: string,
  token: JWT,
) {
  const response = await request
    .post(`${rootURL}/directMessages/${userId}/${receiverId}`)
    .send({ time, body })
    .set('Authorization', `Bearer ${token}`)
  return response.body
}
