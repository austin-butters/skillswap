import { Router } from 'express'
import { addFriend } from 'server/db/db-functions/friends'

const router = Router()

router.post('/:userId/:requestId', async (req, res) => {
  const userId = Number(req.params.userId)
  const requestId = Number(req.params.requestId)
  try {
    const response = await addFriend(userId, requestId)
    return res.status(200).json(response)
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ message: 'Something went wrong getting ai api response' })
  }
})

export default router
