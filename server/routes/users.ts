//====================================================================================================
// USERS
//====================================================================================================

// ------------------------------ SETUP ------------------------------ //
import { Auth0Uid, UnassignedUser, User, UserEmail, UserId } from '#models'
import express from 'express'
import { Users } from '../db/db-functions'

import checkJwt from 'server/auth0'
import type { JwtRequest } from '../auth0'

const router = express.Router()

// ------------------------------ CREATE ------------------------------ //
router.post('/', checkJwt, async (req: JwtRequest, res) => {
  console.log('server route: users, POST /') // TEST LOG
  try {
    const auth0UidFromReq: Auth0Uid | undefined = req.auth?.sub

    if (!auth0UidFromReq) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { auth0Uid, email, name, bio, profilePicture } = req.body

    if (auth0UidFromReq !== auth0Uid) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    if (
      typeof auth0Uid !== 'string' ||
      typeof email !== 'string' ||
      typeof name !== 'string' ||
      (typeof bio !== 'string' && bio !== null) ||
      (typeof profilePicture !== 'string' && profilePicture !== undefined)
    ) {
      return res
        .status(400)
        .json({ error: 'Bad request: invalid request body' })
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

router.get('/all', async (req, res) => {
  console.log('server route: users, GET /all') // TEST LOG

  try {
    const response = await Users.getAllUsers()
    return res.status(200).json(response)
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/byemail/:email', async (req, res) => {
  console.log('server route: users, GET /byemail/:email') // TEST LOG
  try {
    const email: UserEmail | string = req.params.email
    const user: User | undefined = await Users.getUserByEmail(email)
    if (!user) {
      return res.status(404).json({ error: 'Not Found' })
    }
    return res.status(200).json(user)
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/:id', async (req, res) => {
  console.log('server route: users, GET /:id') // TEST LOG
  try {
    const userId: UserId | number = Number(req.params.id)
    if (isNaN(userId) || !Number.isInteger(userId)) {
      return res.status(400).json({ error: 'Bad request: invalid user id' })
    }
    const user: User | undefined = await Users.getUser(userId as UserId)
    if (!user) {
      return res.status(404).json({ error: 'Not Found' })
    }
    return res.status(200).json(user)
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/auth0/:id', async (req, res) => {
  console.log('server route: users, GET /auth0/:id')
  try {
    const auth0Id: string | undefined = req.params.id
    const user: User | undefined = await Users.getUserByAuth0Uid(auth0Id)
    return res.status(200).json(user)
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/search/:searchTerm', async (req, res) => {
  console.log('server route: users, GET /search/:searchTerm') // Test log
  const searchTerm = req.params.searchTerm
  try {
    const response = await Users.fuzzyUserSearch(String(searchTerm))
    return res.status(200).json(response)
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

// ------------------------------ UPDATE ------------------------------ //
router.patch('/:id', async (req, res) => {
  console.log('server route: users, Patch /:id')
  const id = Number(req.params.id)
  try {
    const { name, bio, profilePicture } = req.body
    const updatedUser = {
      id: id,
      name: name,
      bio: bio,
      profilePicture: profilePicture,
    }
    Users.updateUser(updatedUser)
    res.sendStatus(204)
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})
// ------------------------------ DELETE ------------------------------ //
router.delete('/:id', checkJwt, async (req, res) => {
  console.log('server route: users, DELETE /:id') // TEST LOG
  try {
    const userId: UserId | number = Number(req.params.id)
    if (isNaN(userId) || !Number.isInteger(userId)) {
      return res.status(400).json({ error: 'Bad request: invalid user id' })
    }
    await Users.deleteUser(userId)
    return res.sendStatus(204)
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

// ------------------------------ EXPORT ------------------------------ //
export default router
