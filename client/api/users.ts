import { JWT, UnassignedUser, User, UserId } from '#models'
import request from 'superagent'

const rootUrl = new URL(`/api/v1/users`, document.baseURI)

export async function getUserByAuth0Uid(auth0Id: string | undefined) {
  const response = await request.get(`${rootUrl}/auth0/${auth0Id}`)
  return response.body
}

export async function addUser(user: UnassignedUser, token: JWT) {
  const response = await request
    .post(`${rootUrl}`)
    .set('Authorization', `Bearer ${token}`)
    .send(user)
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

export async function getUserById(userId: UserId): Promise<User | undefined> {
  const response = await request.get(`${rootUrl}/${userId}`)
  return response.body
}

export async function editUser(
  id: number,
  name?: string,
  bio?: string,
  profilePicture?: string,
) {
  try {
    const userData = {
      name: name,
      bio: bio,
      profilePicture: profilePicture,
    }
    console.log(userData)
    const response = await request.patch(`${rootUrl}/${id}`).send({ userData })
    return response.body
  } catch (err) {
    throw new Error('Unknown error patching user')
  }
}
