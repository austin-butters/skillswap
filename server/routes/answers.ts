//====================================================================================================
// ANSWERS
//====================================================================================================

// ------------------------------ SETUP ------------------------------ //

import { Router } from 'express'

import { Answers } from '../db/db-functions'

import {
  Answer,
  AnswerId,
  AnswerReplyTo,
  QuestionId,
  UnassignedAnswer,
  UserId,
} from '#models'
import checkJwt from '../auth0'
import type { JwtRequest } from '../auth0'

const router = Router()

// ------------------------------ CREATE ------------------------------ //
router.post('/', checkJwt, async (req: JwtRequest, res) => {
  console.log('server route: answers, POST /') // TEST LOG
  try {
    const answer = req.body
    console.log('answer to post is : ', answer) // TEST LOG

    const answerIdValid = (
      answer: UnassignedAnswer,
    ): answer is UnassignedAnswer => {
      return (
        typeof answer.userId === 'number' &&
        !isNaN(answer.userId) &&
        Number.isInteger(answer.userId) &&
        typeof answer.body === 'string' &&
        answer.body !== '' &&
        typeof answer.questionId === 'number' &&
        !isNaN(answer.questionId) &&
        Number.isInteger(answer.questionId)
      )
    }

    if (!answerIdValid(answer)) {
      return res.status(400).json({ error: 'Bad request: invalid answer.' })
    } else {
      const newAnswerId: AnswerId = await Answers.createAnswer(answer)
      return res.status(200).json(newAnswerId)
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

// ------------------------------ READ ------------------------------ //
router.get('questionbyanswer/:answerid', async (req, res) => {
  console.log('server route: answers, GET /questionbyanswer/:answerid') // TEST LOG
  try {
    const answerId: AnswerId = Number(req.params.answerid)
    if (!Number.isInteger(answerId)) {
      return res.status(400).json({ error: 'Bad request: invalid answer id' })
    }
    const questionId: QuestionId | undefined =
      await Answers.getQuestionIdFromAnswer(answerId)
    if (!questionId) {
      return res.status(404).json({ error: 'Not Found' })
    }
    return res.status(200).json(questionId)
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/replysto/:answerid', async (req, res) => {
  console.log('server route: answers GET /replysto/:answerid')
  try {
    const replyTo: AnswerReplyTo = Number(req.params.answerid)
    if (!replyTo || !Number.isInteger(replyTo)) {
      return res
        .status(400)
        .json({ error: 'Bad request: invalid replyTo answer id' })
    }
    const answers: Answer[] = await Answers.getReplysToAnswer(replyTo)
    return res.status(200).json(answers)
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/question/:id', async (req, res) => {
  console.log('server route: answers, GET /question/:id') // TEST LOG
  try {
    const questionId: QuestionId = Number(req.params.id)
    if (isNaN(questionId) || !Number.isInteger(questionId)) {
      return res.status(400).json({ error: 'Bad request: invalid question id' })
    }
    const answers: Answer[] = await Answers.getAnswersByQuestion(questionId)
    return res.status(200).json(answers)
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/user/:id', async (req, res) => {
  console.log('server route: answers, GET /user/:id') // TEST LOG
  try {
    const userId: UserId = Number(req.params.id)
    if (isNaN(userId) || !Number.isInteger(userId)) {
      return res.status(400).json({ error: 'Bad request: invalid user id' })
    }
    const answers: Answer[] = await Answers.getAnswersByUser(userId)
    return res.status(200).json(answers)
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/:id', async (req, res) => {
  console.log('server route: answers, GET /:id') // TEST LOg
  try {
    const answerId: AnswerId = Number(req.params.id)
    if (isNaN(answerId) || !Number.isInteger(answerId)) {
      return res.status(400).json({ error: 'Bad request: invalid answer id' })
    }
    const answer: Answer | undefined = await Answers.getAnswerById(answerId)
    if (!answer) {
      return res.status(404).json({ error: 'Not Found' })
    }
    return res.status(200).json(answer)
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

// ------------------------------ UPDATE ------------------------------ //

// ------------------------------ DELETE ------------------------------ //
router.delete('/:id', checkJwt, async (req: JwtRequest, res) => {
  console.log('server route, answers: DELETE /:id') // TEST LOg
  try {
    const answerId: AnswerId = Number(req.params.id)
    if (isNaN(answerId) || !Number.isInteger(answerId)) {
      return res.status(400).json({ error: 'Bad request: invalid answer id' })
    }
    await Answers.deleteAnswer(answerId)
    return res.sendStatus(204)
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

// ------------------------------ EXPORT ------------------------------ //
export default router
