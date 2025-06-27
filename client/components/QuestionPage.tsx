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

  // The Typescript types need to be fixed here - starting with the return value from the database functions, but for now this works.
  return (
    <>
      <p>This is the question page.</p>
      <p>QuestionId: {question[0].id}</p>
      <p>Question user id: {question[0].userId}</p>
      <p>Question Title: {question[0].title}</p>
      <p>Question Body: {question[0].body}</p>
    </>
  )
}

export default QuestionPage
