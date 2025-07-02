//====================================================================================================
// QUESTIONS
//====================================================================================================

// ------------------------------ SETUP ------------------------------ //

import { Router } from 'express'

import { Questions } from '../db/db-functions'

import { Question, QuestionId, UnassignedQuestion } from '#models'

import type { JwtRequest } from '../auth0'
import checkJwt from '../auth0'

const router = Router()

// ------------------------------ CREATE ------------------------------ //
router.post('/', checkJwt, async (req: JwtRequest, res) => {
  console.log('server route: questions, POST /') // TEST LOG

  try {
    const { userId, body, title } = req.body

    if (
      typeof userId !== 'number' ||
      typeof body !== 'string' ||
      typeof title !== 'string'
    ) {
      return res
        .status(400)
        .json({ error: 'Bad request: invalid request body' })
    }
    if (isNaN(userId) || !Number.isInteger(userId)) {
      return res.status(400).json({ error: 'Bad request: invalid user id' })
    }

    const newQuestion: UnassignedQuestion = { userId, body, title }

    const newQuestionId: QuestionId = await Questions.addQuestion(newQuestion)
    return res.status(200).json({ newQuestionId })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Something went wrong' })
  }
})

// ------------------------------ READ ------------------------------ //
router.get('/', async (req, res) => {
  console.log('server route: questions, GET /') // TEST LOG
  try {
    const questions: Question[] = await Questions.getQuestions()
    return res.status(200).json(questions)
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/:id', async (req, res) => {
  console.log('server route: questions, GET /:id') // TEST LOG
  try {
    const questionId: QuestionId | number = Number(req.params.id)
    if (isNaN(questionId) || !Number.isInteger(questionId)) {
      return res.status(400).json({ error: 'Bad request: invalid question id' })
    }
    const question: Question | undefined =
      await Questions.getQuestion(questionId)
    if (!question) {
      return res.status(404).json({ error: 'Not Found' })
    }

    return res.status(200).json(question)
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/:userid', async (req, res) => {
  console.log('server route: questions, GET /:userid') // TEST LOG
  try {
    const userId = Number(req.params.userid)
    if (isNaN(userId) || !Number.isInteger(userId)) {
      return res.status(400).json({ error: 'Bad request: invalid user id' })
    }
    const questions: Question[] | undefined =
      await Questions.getQuestionByUserId(userId)
    if (!questions) {
      return res.status(404).json({ error: 'Not Found' })
    }

    return res.status(200).json(questions)
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

// ------------------------------ UPDATE ------------------------------ //

// ------------------------------ DELETE ------------------------------ //
router.delete('/:id', checkJwt, async (req: JwtRequest, res) => {
  console.log('server route: questions, DELETE /:id') // TEST LOG
  try {
    const questionId: QuestionId | number = Number(req.params.id)
    if (isNaN(questionId) || !Number.isInteger(questionId)) {
      return res.status(400).json({ error: 'Bad request: invalid user id' })
    }
    await Questions.deleteQuestion(questionId)
    return res.sendStatus(204)
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

// ------------------------------ EXPORT ------------------------------ //
export default router
