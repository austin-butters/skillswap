import request from 'superagent'

const rootUrl = new URL(`/api/v1/users`, document.baseURI)

export async function getUserByAuth0Uid(auth0Id: string | undefined) {
  const response = await request.get(`${rootUrl}/auth0/${auth0Id}`)
  return response.body
}
