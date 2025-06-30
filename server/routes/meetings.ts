import { Router } from 'express'
import { addMeeting, meetingData } from 'server/db/db-functions/meetings'

const router = Router()

router.post('/', async (req, res) => {
  const meetingData = req.query.data
  try {
    const response = await addMeeting(meetingData)
    return res.json(200).json(meetingData)
  }
})

export default router