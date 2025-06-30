import { Router } from 'express'
import { addMeeting } from 'server/db/db-functions/meetings'

const router = Router()

router.post('/', async (req, res) => {
  const meetingData = req.body
  try {
    const response = await addMeeting(meetingData)
    return res.json(200).json(response)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
