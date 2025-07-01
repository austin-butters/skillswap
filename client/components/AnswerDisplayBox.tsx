import { Link } from 'react-router-dom'
import { AnswerId, UserId } from '#models'
import { useAnswer } from '../hooks/useAnswers'
import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import { useAuth0Id } from 'client/hooks/useUsers'

interface Props {
  answerId: AnswerId
}

function AnswerDisplayBox({ answerId }: Props) {
  const { isAuthenticated, user: auth0User } = useAuth0()
  const { answer, replies, isError, isPending, author, replyToAnswer } =
    useAnswer(answerId)

  console.log({ answer, replies })

  const [reply, setReply] = useState<string>('')

  const { data: user } = useAuth0Id(auth0User?.sub)
  const userId: UserId | undefined = user?.id

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

  const userCanReply: boolean = isAuthenticated && !!auth0User?.sub

  const handleAddAnswer = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('handleAddAnswer') // TEST LOG
    if (!answer?.questionId || !userId)
      throw new Error('Cannot assign answer to undefined question.')
    await replyToAnswer({
      userId,
      questionId: answer.questionId,
      replyTo: answerId,
      body: reply,
    }) // FIX THIS HARDCODING.
  }

  const handleAnswerChange = async (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    console.log('handleAnswerChange') // TEST LOG
    setReply(event?.target.value)
  }

  return (
    <div className="answer-display-box">
      <hr />
      <h1>{`NOTE: THIS ANSWER IS ${answer?.replyTo === null ? 'A DIRECT REPLY TO THE QUESTION' : 'A REPY TO ANOTHER ANSWER'}`}</h1>
      <h1>AnswerDisplayBox() component.</h1>
      <Link to={`/profile/${author?.id}`}>
        <h3>{author?.name}</h3>
      </Link>
      <p>{answer?.body}</p>
      <p>Replies: {replies?.length ?? '0'}</p>
      {/* <Link to={`/questions/${answerId}`}>  */}
      <p>Reply to this answer.</p>
      {/* </Link> */}
      {userCanReply && (
        <form onSubmit={handleAddAnswer}>
          <label htmlFor="add-answer">Add a reply</label>
          <textarea
            id="add-answer"
            value={reply}
            onChange={handleAnswerChange}
          ></textarea>
          <button type="submit">Reply</button>
        </form>
      )}
      <div className="replies-container" style={{ paddingLeft: '4rem' }}>
        {!replies
          ? null
          : replies.map((reply) => {
              return <AnswerDisplayBox answerId={reply.id} key={reply.id} />
            })}
      </div>
      <hr />
    </div>
  )
}

export default AnswerDisplayBox
