import { Router } from 'express'
import type { JwtRequest } from '../auth0'
import checkJwt from '../auth0'

import {
  getDirectMessages,
  sendDirectMessage,
} from 'server/db/db-functions/directMessages'

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
