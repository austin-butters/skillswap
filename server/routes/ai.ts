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

    await addAiFix({ userId, title, input, output })

    return res.status(200)
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})
// This is techincally creating I guess?
router.get('/:title', checkJwt, async (req: JwtRequest, res) => {
  const title = String(req.params.title)
  const userInput = req.query.prompt
  try {
    const response = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `You are an AI assistant helping beginner programmers learn to code. Your responses should be clear, encouraging, and educational.

      Context: This question is about "${title}"

      Instructions:
      - If you receive only a code block, analyze it for errors and provide corrections with explanations
      - If you receive a question with or without code, provide a helpful answer appropriate for beginners
      - Use simple language and explain technical concepts clearly
      - Include examples when helpful
      - Be encouraging and patient

      Question: ${userInput}`,
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
