import { Router } from 'express'
import { saveMeeting } from '../db/db-functions/savedMettings'

const router = Router()

router.post('/:userId/:meetingId', async (req, res) => {
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

export default router
