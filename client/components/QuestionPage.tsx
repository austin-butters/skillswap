import { useAddAnswer, useAnswersByQuestion } from '../hooks/useAnswers'
import { useQuestionAuthor, useQuestionById } from '../hooks/useQuestions'
import { Link, useNavigate, useParams } from 'react-router-dom'
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

  const {
    author: questionAuthor,
    isPending: isPendingAuthor,
    isError: isErrorAuthor,
  } = useQuestionAuthor(question?.userId)

  const navigate = useNavigate()
  if (!idParam) navigate('/')

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setAnswer(event.target.value)
  }
  const handleAddAnswer = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newAnswer: UnassignedAnswer = {
      replyTo: null,
      body: answer,
      questionId: Number(idParam),
      userId: data.id,
    }
    await addAnswer.mutateAsync(newAnswer)
    setAnswer('')
  }

  if (isPending || isPendingAuthor) return <p>Loading Question...</p>
  if (isError || isErrorAuthor)
    return <p>Error: {!error ? 'Unknown' : error.message}</p>
  if (!question) return <p>No question found.</p>
  if (!questionAuthor)
    return <p>The author of this question could not be found.</p>

  return (
    <>
      <div className="question-wrapper">
        <header className="question-author-header">
          <Link
            to={`/profile/${questionAuthor.id}`}
            className="author-profile-link"
          >
            <img
              className="profilepicture-box"
              src={questionAuthor.profilePicture}
              alt={`Profile for ${questionAuthor.name}`}
            />
          </Link>
          <p className="author-name">{questionAuthor.name}</p>
        </header>

        <section className="question-content">
          <h1 className="question-title">{question.title}</h1>
          <p className="question-body">{question.body}</p>
        </section>

        <section className="answers-status">
          {isAnswersPending && (
            <p className="loading-text">Answers Loading...</p>
          )}
          {isAnswersError && (
            <>
              <p className="error-text">Error getting answers</p>
              <p className="error-message">{answerError.message}</p>
            </>
          )}
        </section>

        {userCanAddAnswer && (
          <form onSubmit={handleAddAnswer} className="answer-form">
            <label htmlFor="add-answer" className="answer-label">
              Add an answer
            </label>
            <textarea
              id="add-answer"
              className="answer-textarea"
              value={answer}
              onChange={handleAnswerChange}
              placeholder="Write your answer here..."
            />
            <button type="submit" className="submit-answer-button">
              Submit Answer
            </button>
          </form>
        )}

        <section className="answers-list">
          {!answers ? null : answers.length === 0 ? (
            <p className="no-answers-text">No answers for this question.</p>
          ) : (
            [...answers]
              .reverse()
              .map((answer, i) => (
                <AnswerDisplayBox key={i} answerId={answer.id} depth={0} />
              ))
          )}
        </section>
      </div>
    </>
  )
}

export default QuestionPage
