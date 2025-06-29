import { Router } from 'express'
import { GoogleGenAI } from '@google/genai'
import 'dotenv/config'

import checkJwt from '../auth0'
import type { JwtRequest } from '../auth0'

const router = Router()

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

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

export default router
