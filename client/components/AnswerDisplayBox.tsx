import { Link } from 'react-router-dom'
import { AnswerId } from '#models'
import { useAnswer } from '../hooks/useAnswers'

interface Props {
  answerId: AnswerId
}

function AnswerDisplayBox({ answerId }: Props) {
  const { answer, replies, isError, isPending, author } = useAnswer(answerId)

  if (isError) {
    return (
      <div className="answer-display-box">
        <p>Error loading answer.</p>
      </div>
    )
  }

  if (isPending) {
    return (
      <div className="answer-display-box">
        <p>Loading answer...</p>
      </div>
    )
  }

  return (
    <div className="answer-display-box">
      <hr />
      <h1>AnswerDisplayBox() component.</h1>
      <Link to={`/profile/${author?.id}`}>
        <h3>{author?.name}</h3>
      </Link>
      <p>{answer?.body}</p>
      <p>Replies: {replies?.length ?? '0'}</p>
      <Link to={`/answer/${answerId}`}>
        <p>Reply to this answer.</p>
      </Link>
      <hr />
    </div>
  )
}

export default AnswerDisplayBox
