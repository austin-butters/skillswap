import { useAnswersByQuestion } from 'client/hooks/useAnswers'
import { useQuestionById } from '../hooks/useQuestions'
import { useParams } from 'react-router-dom'
import { QuestionId } from '#models'

function QuestionPage() {
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
        answers.map((answer) => {
          return (
            <>
              <p>{`Answer user id: ${answer.userId}`}</p>
              <p>{`Answer body: ` + answer.body}</p>
            </>
          )
        })
      )}
    </>
  )
}

export default QuestionPage
