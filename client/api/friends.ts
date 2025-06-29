import request from 'superagent'

const rootUrl = new URL(`/api/v1/friends`, document.baseURI)

export async function addFriend(userId: number, requestId: number) {
  const response = await request.post(`${rootUrl}/${userId}/${requestId}`)
  return response.body
}
