import { Router } from 'express'
import {
  addMeeting,
  getMeetingById,
  getPublicMeetings,
  getUsersMeetings,
} from '../db/db-functions/meetings'
import { AddMeetingData } from '#models'

import type { JwtRequest } from '../auth0'
import checkJwt from '../auth0'

const router = Router()

// ------------------------------ CREATE ------------------------------ //
router.post('/', checkJwt, async (req: JwtRequest, res) => {
  const meetingData: AddMeetingData = req.body
  try {
    const response = await addMeeting(meetingData)
    return res.status(200).json(response)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// ------------------------------ READ ------------------------------ //

router.get('/user/:id', checkJwt, async (req: JwtRequest, res) => {
  const userId = Number(req.params.id)
  try {
    const response = await getUsersMeetings(userId)
    return res.status(200).json(response)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/public/all', async (req, res) => {
  try {
    const response = await getPublicMeetings()
    return res.status(200).json(response)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/meeting/:id', checkJwt, async (req: JwtRequest, res) => {
  const meetingId = Number(req.params.id)
  try {
    const response = await getMeetingById(meetingId)
    return res.status(200).json(response)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
