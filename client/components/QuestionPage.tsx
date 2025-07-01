import { useAddAnswer, useAnswersByQuestion } from '../hooks/useAnswers'
import { useQuestionById } from '../hooks/useQuestions'
import { useNavigate, useParams } from 'react-router-dom'
import { QuestionId, UnassignedAnswer } from '#models'
import { useState } from 'react'
import { useAuth0Id } from '../hooks/useUsers'
import { useAuth0 } from '@auth0/auth0-react'
import AnswerDisplayBox from './AnswerDisplayBox'

function QuestionPage() {
  const { user: auth0User } = useAuth0()
  const { data } = useAuth0Id(auth0User?.sub)

  let userCanAddAnswer: boolean = false
  if (!data || !data.id || !Number.isInteger(data.id)) {
    userCanAddAnswer = false
  } else {
    userCanAddAnswer = true
  }

  const [answer, setAnswer] = useState<string>('')
  const addAnswer = useAddAnswer()

  const { id: idParam } = useParams()

  const { question, isPending, isError, error } = useQuestionById(
    Number(idParam),
  )

  const enableAnswerSearch: boolean =
    question !== undefined &&
    question.id !== undefined &&
    !isPending &&
    !isError

  const {
    answers,
    isPending: isAnswersPending,
    isError: isAnswersError,
    error: answerError,
  } = useAnswersByQuestion(question?.id as QuestionId, enableAnswerSearch)

  const navigate = useNavigate()
  if (!idParam) navigate('/')

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setAnswer(event.target.value)
  }
  const handleAddAnswer = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newAnswer: UnassignedAnswer = {
      replyTo: null,
      body: answer,
      questionId: Number(idParam),
      userId: data.id,
    }
    addAnswer.mutateAsync(newAnswer)
  }

  if (isPending) return <p>Loading Question...</p>
  if (isError) return <p>Error: {error.message}</p>
  if (!question) return <p>No question found.</p>

  return (
    <>
      <p>This is the question page.</p>
      <p>QuestionId: {question.id}</p>
      <p>Question user id: {question.userId}</p>
      <p>Question Title: {question.title}</p>
      <p>Question Body: {question.body}</p>
      <p>{isAnswersPending && 'Answers Loading...'}</p>
      <p>{isAnswersError && 'Error getting answers'}</p>
      <p>{isAnswersError && answerError.message}</p>
      {!answers ? null : answers.length === 0 ? (
        <p>No answers for this question.</p>
      ) : (
        answers.map((answer, i) => {
          return <AnswerDisplayBox key={i} answerId={answer.id} />
        })
      )}
      {userCanAddAnswer && (
        <form onSubmit={handleAddAnswer}>
          <label htmlFor="add-answer">Add an answer</label>
          <textarea
            id="add-answer"
            value={answer}
            onChange={handleAnswerChange}
          ></textarea>
          <button type="submit">Submit Answer</button>
        </form>
      )}
    </>
  )
}

export default QuestionPage
