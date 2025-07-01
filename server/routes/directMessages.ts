import { Router } from 'express'
import type { JwtRequest } from '../auth0'
import checkJwt from '../auth0'

import {
  getDirectMessages,
  getDirectMessagesByUser,
  sendDirectMessage,
} from '../db/db-functions/directMessages'
import { DirectMessage, UserId } from '#models'

const router = Router()

router.get('/:id/:otherId', checkJwt, async (req: JwtRequest, res) => {
  const id = req.params.id
  const otherId = req.params.otherId
  try {
    const response = await getDirectMessages(Number(id), Number(otherId))
    return res.status(200).json(response)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/:userId/:receiverId', checkJwt, async (req: JwtRequest, res) => {
  console.log('server route: POST /:userId/:reveiverId') // TEST LOG
  const userId = Number(req.params.userId)
  const receiverId = Number(req.params.receiverId)
  const { time, body } = req.body
  try {
    const response = await sendDirectMessage(userId, receiverId, time, body)
    return res.status(200).json(response)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router

router.get('/:userid', checkJwt, async (req: JwtRequest, res) => {
  console.log('server route: GET /:userId')
  try {
    const userId: UserId = Number(req.params.userid)
    if (!Number.isInteger(userId)) {
      return res.status(400).json({ message: 'Bad reqest: invalid user id' })
    }
    const messages: DirectMessage[] = await getDirectMessagesByUser(userId)
    return res.status(200).json(messages)
  } catch (err) {
    return res.status(500).json({ message: 'something went wrong' })
  }
})
