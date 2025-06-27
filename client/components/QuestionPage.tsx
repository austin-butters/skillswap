import { useQuestionById } from 'client/hooks/useQuestions'
import { useParams } from 'react-router-dom'

function QuestionPage() {
  const { id: idParam } = useParams()

  const { question, isPending, isError, error } = useQuestionById(
    Number(idParam),
  )

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
    </>
  )
}

export default QuestionPage
