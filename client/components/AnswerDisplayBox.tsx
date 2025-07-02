import { Link } from 'react-router-dom'
import { AnswerId, UserId } from '#models'
import { useAnswer } from '../hooks/useAnswers'
import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import { useAuth0Id } from '../hooks/useUsers'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  answerId: AnswerId
  depth: number
}

function AnswerDisplayBox({ answerId, depth = 0 }: Props) {
  const queryClient = useQueryClient()
  const { isAuthenticated, user: auth0User } = useAuth0()
  const { answer, replies, isError, isPending, author, replyToAnswer } =
    useAnswer(answerId)

  const [displayReplies, setDisplayReplies] = useState<boolean>(false)

  const [reply, setReply] = useState<string>('')

  const { data: user } = useAuth0Id(auth0User?.sub)
  const userId: UserId | undefined = user?.id

  const maxdepth: number = 8

  const userCanReply: boolean =
    isAuthenticated && !!auth0User?.sub && depth < maxdepth

  // const answerAuthor: User = {
  //   id: 0,
  //   name: 'HARDCODED ANSWER AUTHOR',
  //   email: 'EMAIL',
  //   profilePicture: DEFAULT_PROFILE_PICTURE,
  //   auth0Uid: 'HARDCODED AUTH0UID',
  //   bio: null,
  // }

  const handleAddAnswer = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!answer?.questionId || !userId)
      throw new Error(
        'Cannot assign answer to undefined question, or when not logged in.',
      )
    await replyToAnswer({
      userId,
      questionId: answer.questionId,
      replyTo: answerId,
      body: reply,
    }) // FIX THIS HARDCODING.

    setReply('')
    setDisplayReplies(true)
    queryClient.invalidateQueries({ queryKey: ['replies'] })
    queryClient.invalidateQueries({ queryKey: ['answer'] })
    queryClient.invalidateQueries({ queryKey: ['answers'] })
  }

  const handleAnswerChange = async (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setReply(event?.target.value)
  }

  if (isPending) {
    return (
      <div className="answer-display-box">
        <p>Loading answer...</p>
      </div>
    )
  }

  if (depth > maxdepth || isError) return null
  return (
    <div className="answer-display-box">
      <hr style={{ borderColor: 'black' }} />
      {isPending ? (
        <p>Loading answer...</p>
      ) : (
        <>
          {/*The initial answer is displayed here.*/}
          <div className="initial-answer-container">
            <Link to={`/profile/${author?.id}`}>
              <img
                className="profilepicture-box"
                src={author?.profilePicture}
                alt={`Profile for ${author?.name ?? 'user'}`}
              />
            </Link>
            <h3>{author?.name}</h3>
            <p>{answer?.body}</p>
            {/* <Link to={`/questions/${answerId}`}>  */}
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
            <p>Replies: {replies?.length ?? '0'}</p>
            {!replies || replies.length === 0 ? null : displayReplies ? (
              <button onClick={() => setDisplayReplies(false)}>
                Hide Replies ({replies?.length ?? '0'})
              </button>
            ) : (
              <button onClick={() => setDisplayReplies(true)}>
                Show replies ({replies?.length ?? '0'})
              </button>
            )}
          </div>

          {/*Sub-answers are displayed here as replies*/}
          {displayReplies && (
            <div
              className="replies-container"
              style={{ paddingLeft: '4rem' /* 4rem CREATES NESTING */ }}
            >
              {!replies
                ? null
                : [...replies].reverse().map((reply) => {
                    return (
                      <AnswerDisplayBox
                        answerId={reply.id}
                        key={reply.id}
                        depth={depth + 1}
                      />
                    )
                  })}
            </div>
          )}
        </>
      )}
      {depth === 0 && (
        <hr
          style={{
            borderColor: 'black',
          }} /* Display bottom line only if it doesn't meet another comment's top line.*/
        />
      )}
    </div>
  )
}

export default AnswerDisplayBox
