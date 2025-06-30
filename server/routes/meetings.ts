import { Router } from 'express'
import {
  addMeeting,
  getPublicMeetings,
  getUsersMeetings,
} from '../db/db-functions/meetings'

const router = Router()

router.post('/', async (req, res) => {
  const meetingData = req.body
  try {
    const response = await addMeeting(meetingData)
    return res.status(200).json(response)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/:id', async (req, res) => {
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

export default router
