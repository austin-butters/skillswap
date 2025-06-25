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

interface DBUser extends Omit<DBUnassignedUser, 'profile_picture'> {
  id: UserId
  profile_picture: ProfilePictureFilePath
}

// ------------------------------ CREATE ------------------------------ //

// ------------------------------ READ ------------------------------ //

// ------------------------------ UPDATE ------------------------------ //

// ------------------------------ DELETE ------------------------------ //
