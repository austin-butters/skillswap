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
    <div
      className={`answer-display-box ${depth === 0 ? 'main-answer' : 'nested-answer'}`}
      style={{ marginLeft: `${depth * 2}rem` }} // Indent nested replies
    >
      <hr className="answer-top-divider" />

      {isPending ? (
        <p className="loading-text">Loading answer...</p>
      ) : (
        <>
          <article className="answer-content">
            <header className="answer-header">
              <Link
                to={`/profile/${author?.id}`}
                className="author-profile-link"
              >
                <img
                  className="profilepicture-box"
                  src={author?.profilePicture}
                  alt={`Profile for ${author?.name ?? 'user'}`}
                />
              </Link>
              <h3 className="answer-author">{author?.name}</h3>
            </header>

            <p className="answer-body">{answer?.body}</p>

            {userCanReply && (
              <form onSubmit={handleAddAnswer} className="reply-form">
                <label htmlFor="add-answer" className="form-label">
                  Add a reply
                </label>
                <textarea
                  id="add-answer"
                  value={reply}
                  onChange={handleAnswerChange}
                  className="reply-textarea"
                  placeholder="Write your reply..."
                />
                <button type="submit" className="reply-button">
                  Reply
                </button>
              </form>
            )}

            {replies && replies.length > 0 && (
              <div className="reply-toggle">
                <p>Replies: {replies.length}</p>
                <button
                  onClick={() => setDisplayReplies(!displayReplies)}
                  className="toggle-replies-button"
                >
                  {displayReplies
                    ? `Hide Replies (${replies.length})`
                    : `Show Replies (${replies.length})`}
                </button>
              </div>
            )}
          </article>

          {displayReplies && replies && replies.length > 0 && (
            <section className="replies-container">
              {[...replies].reverse().map((reply) => (
                <AnswerDisplayBox
                  key={reply.id}
                  answerId={reply.id}
                  depth={depth + 1}
                />
              ))}
            </section>
          )}
        </>
      )}
    </div>
  )
}

export default AnswerDisplayBox
