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
router.post('/response/:title', checkJwt, async (req: JwtRequest, res) => {
  const title = String(req.params.title)
  const { userInput } = req.body
  try {
    const response = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `You are an AI assistant helping beginner programmers learn to code. Your responses should be clear, encouraging, and educational.

Context: This question is about "${title}"

Instructions:
- **For code analysis requests**: If the user provides code and asks you to check/fix/review it, analyze it for errors and provide corrections with explanations
- **For coding questions**: If the user asks "how do I..." or requests help implementing something, provide step-by-step guidance with code examples
- **For conceptual questions**: If the user asks "what is..." or seeks understanding of concepts, provide clear explanations with simple examples when helpful
- **For general questions**: Answer directly without assuming code is needed unless specifically requested

IMPORTANT: The user has already asked their question: "${userInput}"
You must respond to this specific question, not ask what they need help with.
Make sure to add "\\n" for every new line

Guidelines:
- Use simple language and explain technical concepts clearly
- Include code examples only when they help illustrate the answer
- Be encouraging and patient
- Ask for clarification if the request is ambiguous

User's question: ${userInput}`,
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
