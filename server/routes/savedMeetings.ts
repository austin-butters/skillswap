import { Router } from 'express'
import {
  getSavedMeetings,
  removeSavedMeeting,
  saveMeeting,
} from '../db/db-functions/savedMettings'
import checkJwt, { JwtRequest } from '../auth0'

const router = Router()

// ------------------------------ CREATE ------------------------------ //
router.post('/:userId/:meetingId', checkJwt, async (req: JwtRequest, res) => {
  const userId = Number(req.params.userId)
  const meetingId = Number(req.params.meetingId)
  try {
    const response = await saveMeeting(userId, meetingId)
    return res.status(200).json(response)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// ------------------------------ READ ------------------------------ //
router.get('/:userId', checkJwt, async (req: JwtRequest, res) => {
  const userId = Number(req.params.userId)
  try {
    const response = await getSavedMeetings(userId)
    return res.status(200).json(response)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// ------------------------------ DELETE ------------------------------ //
router.delete('/:userId/:meetingId', checkJwt, async (req: JwtRequest, res) => {
  const userId = Number(req.params.userId)
  const meetingId = Number(req.params.meetingId)
  try {
    const response = await removeSavedMeeting(userId, meetingId)
    return res.status(200).json(response)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
