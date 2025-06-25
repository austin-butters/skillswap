import { Router } from 'express'

import * as db from '../db/db-functions/questions'

const router = Router()

router.post('/', async (req, res) => {
  const question = req.body
  try {
    await db.addQuestion(question)
    res.status(201).json(question)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
