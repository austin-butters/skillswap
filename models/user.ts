export type UserId = number
export type Auth0Uid = string
export type UserEmail = string
export type UserName = string
export type UserBio = string
export type ProfilePictureFilePath = string

export interface UnassignedUser {
  auth0Uid: Auth0Uid
  email: UserEmail
  name: UserName
  bio: UserBio | null
  profilePicture?: ProfilePictureFilePath // Initially optional, will default to '/images/butters.webp' if not provided
}

export interface User extends Omit<UnassignedUser, 'profilePicture'> {
  id: UserId
  profilePicture: ProfilePictureFilePath // No longer optional
}
