import request from 'superagent'

const rootURL = new URL('/api/v1', document.baseURI)

export async function getDirectMessages(userId: number, otherId: number) {
  const response = await request.get(
    `${rootURL}/directMessages/${userId}/${otherId}`,
  )
  return response.body
}

export async function sendDirectMessage(
  userId: number,
  receiverId: number,
  time: string,
  body: string,
) {
  const response = await request
    .post(`${rootURL}/directMessages/${userId}/${receiverId}`)
    .send({ time, body })
  return response.body
}
