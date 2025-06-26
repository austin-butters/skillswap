import { Router } from 'express'
import { GoogleGenAI } from '@google/genai'

const router = Router()

const genAI = new GoogleGenAI({
  apiKey: 'AIzaSyAmbCdQfU_AVhuD34BxPbZqN5c37EKFawI',
})

router.get('/', async (req, res) => {
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
