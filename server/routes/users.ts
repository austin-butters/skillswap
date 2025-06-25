//====================================================================================================
// USERS
//====================================================================================================

// ------------------------------ SETUP ------------------------------ //
import { UnassignedUser, User, UserEmail, UserId } from '#models'
import express from 'express'
import { Users } from '../db/db-functions'
const router = express.Router()

// ------------------------------ CREATE ------------------------------ //
router.post('/', async (req, res) => {
  console.log('server route: users, POST /') // TEST LOG
  try {
    const { auth0Uid, email, name, bio, profilePicture } = req.body

    if (
      typeof auth0Uid !== 'string' ||
      typeof email !== 'string' ||
      typeof name !== 'string' ||
      (typeof bio !== 'string' && bio !== null) ||
      (typeof profilePicture !== 'string' && profilePicture !== undefined)
    ) {
      return res
        .status(400)
        .json({ error: 'Bad request: invalid request body.' })
    }

    const userData: UnassignedUser = {
      auth0Uid,
      email,
      name,
      bio,
      profilePicture,
    }
    const newUserId: UserId = await Users.createUser(userData)
    return res.status(200).json(newUserId)
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

// ------------------------------ READ ------------------------------ //

// ------------------------------ UPDATE ------------------------------ //

// ------------------------------ DELETE ------------------------------ //

// ------------------------------ EXPORT ------------------------------ //
export default router
