import request from 'superagent'

const rootUrl = new URL(`/api/v1/friends`, document.baseURI)

export async function addFriend(userId: number, requestId: number) {
  const response = await request.post(`${rootUrl}/${userId}/${requestId}`)
  return response.body
}

export async function unaddFriend(userId: number, requestId: number) {
  const response = await request.delete(`${rootUrl}/${userId}/${requestId}`)
  return response.body
}

export async function getStatus(userId: number, requestId: number) {
  const response = await request.get(`${rootUrl}/status/${userId}/${requestId}`)
  return response.body
}
