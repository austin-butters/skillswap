import { Router } from 'express'
import { GoogleGenAI } from '@google/genai'
import 'dotenv/config'

import checkJwt from '../auth0'
import type { JwtRequest } from '../auth0'
import { AddCodeFixData } from '#models'
import { addAiFix, aiFixesFromUserId } from '../db/db-functions/codeFixer'

const router = Router()

// ------------------------------ CREATE ------------------------------ //

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const { userId, title, input, output }: AddCodeFixData = req.body

    if (!userId || !title || !input || !output) {
      return res.status(400).json({ error: `Bad request: Missing inputs` })
    }

    await addAiFix({ userId, title, input, output })
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})
// This is techincally creating I guess?
router.get('/', checkJwt, async (req: JwtRequest, res) => {
  const userInput = req.query.prompt
  try {
    const response = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `I am using you for a website to help beginer coders so until I give a question do not bring any of this up in the response. If the following question is just a block of code do your best to fix it. My question is... ${userInput}`,
    })
    res.json(response.candidates)
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ message: 'Something went wrong getting ai api response' })
  }
})

// ------------------------------ READ ------------------------------ //

router.get('/user/:id', async (req: JwtRequest, res) => {
  const userId = Number(req.params.id)
  try {
    const response = await aiFixesFromUserId(userId)
    return res.status(200).json(response)
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router
