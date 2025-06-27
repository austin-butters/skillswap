import { Router } from 'express'
import { getDirectMessages } from 'server/db/db-functions/directMessages'

const router = Router()

router.get('/:id/:otherId', async (req, res) => {
  const id = req.params.id
  const otherId = req.params.otherId
  try {
    const response = await getDirectMessages(Number(id), Number(otherId))
    console.log(id, otherId)
    console.log(response)
    return res.status(200).json(response)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
