import { UnassignedUser } from '#models'
import request from 'superagent'

const rootUrl = new URL(`/api/v1/users`, document.baseURI)

export async function getUserByAuth0Uid(auth0Id: string | undefined) {
  const response = await request.get(`${rootUrl}/auth0/${auth0Id}`)
  return response.body
}

export async function addUser(user: UnassignedUser) {
  const response = await request.post(`${rootUrl}`).send(user)
  return response.body
}

export async function getUsersFromSearch(searchInput: string) {
  const response = await request.get(`${rootUrl}/search/${searchInput}`)
  return response.body
}

export async function getAllUsers() {
  const response = await request.get(`${rootUrl}/all`)
  return response.body
}
