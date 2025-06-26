//====================================================================================================
// USERS
//====================================================================================================

// ------------------------------ SETUP ------------------------------ //
import {
  UserEmail,
  UserId,
  UnassignedUser,
  User,
  Auth0Uid,
  UserName,
  UserBio,
  ProfilePictureFilePath,
} from '#models'
import db from '../connection'

import { DEFAULT_PROFILE_PICTURE } from '#server-constants'

const userFieldsToCamelCase: (keyof User | string)[] = [
  'id',
  'auth0_uid as auth0Uid',
  'email',
  'name',
  'bio',
  'profile_picture as profilePicture',
]

interface DBUnassignedUser {
  auth0_uid: Auth0Uid
  email: UserEmail
  name: UserName
  bio: UserBio | null
  profile_picture?: ProfilePictureFilePath
}

// CURRENTLY UNUSED, UNCOMMENT IF NEEDED:
// interface DBUser extends Omit<DBUnassignedUser, 'profile_picture'> {
//   id: UserId
//   profile_picture: ProfilePictureFilePath
// }

// ------------------------------ CREATE ------------------------------ //

export async function createUser(userData: UnassignedUser): Promise<UserId> {
  const { auth0Uid: auth0_uid, email, name, bio } = userData
  const profile_picture: ProfilePictureFilePath =
    userData.profilePicture ?? DEFAULT_PROFILE_PICTURE

  const DBInsert: DBUnassignedUser = {
    auth0_uid,
    email,
    name,
    bio,
    profile_picture,
  }

  const result = await db('users').insert(DBInsert).returning('id')
  return result[0].id as UserId // May require changes for PostGreSQL.
}

// ------------------------------ READ ------------------------------ //

/**
 * Returns a user with a given user id.
 * @async
 * @param {UserId} userId The user's id.
 * @returns {Promise<User | undefined>} The user, if found.
 */
export async function getUser(userId: UserId): Promise<User | undefined> {
  if (typeof userId !== 'number' || isNaN(userId) || !Number.isInteger(userId))
    throw new Error('Invalid Auth0 uid')
  const user: User | undefined = await db('users')
    .where('id', userId)
    .select(...userFieldsToCamelCase)
    .first()
  return user
}

/**
 * Returns a user with a given Auth0 uid
 * @async
 * @param {Auth0Uid} auth0Uid The user's Auth0 UID ('sub')
 * @returns {Promise<User | undefined>} The user, if found.
 */
export async function getUserByAuth0Uid(
  auth0Uid: Auth0Uid,
): Promise<User | undefined> {
  if (!auth0Uid || typeof auth0Uid !== 'string')
    throw new Error('Invalid user id')
  const user: User | undefined = await db('users')
    .where('auth0_uid', auth0Uid)
    .select(...userFieldsToCamelCase)
    .first()
  return user
}

/**
 * Returns a user with a given email address.
 * @async
 * @param {UserEmail} userEmail The user's email.
 * @returns {Promise<User | undefined>} The user, if found.
 */
export async function getUserByEmail(
  userEmail: UserEmail,
): Promise<User | undefined> {
  if (!userEmail || typeof userEmail !== 'string')
    throw new Error('Invalid user email')
  const user: User | undefined = await db('users')
    .where('email', userEmail)
    .select(...userFieldsToCamelCase)
    .first()
  return user
}

// ------------------------------ UPDATE ------------------------------ //

// ------------------------------ DELETE ------------------------------ //
/**
 * Deletes a user with a given user id.
 * @async
 * @param {UserId} userId The user's id.
 * @returns {Promise<void>}
 */
export async function deleteUser(userId: UserId): Promise<void> {
  await db('users').where('id', userId).del()
}
