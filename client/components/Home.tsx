import { Question } from '#models'
import { useUserById } from '../hooks/useUsers'
import { useAddQuestion, useQuestions } from '../hooks/useQuestions'
import '../styles/main.css'
import { DEFAULT_PROFILE_PICTURE } from '#server-constants'
import { Link } from 'react-router-dom'
export default function Home() {
  const addQuestion = useAddQuestion()

  const { questions, isPending, isError } = useQuestions()

  const userId = 1

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target
    const formData = await new FormData(form)

    addQuestion.mutate({
      userId: userId,
      title: String(formData.get('title')),
      body: String(formData.get('body')),
    })
  }

  if (isPending) return <p>Loading Questions...</p>
  if (isError) return <p>Error displaying questions.</p>

  return (
    <>
      <div className="column-flex">
        <div className="question-box block">
          <div className="sidebar-header">
            <h1
              style={{
                fontWeight: 'bold',
                fontSize: '2.5rem',
                marginBottom: '10px',
              }}
            >
              Post your own question!
            </h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="question-box"
            style={{
              padding: 0,
              boxShadow: 'none',
              backgroundColor: 'transparent',
            }}
          >
            <label htmlFor="title" style={{ width: '100%' }}>
              <input
                type="text"
                placeholder="Question Title"
                name="title"
                className="input-fields"
                required
              />
            </label>

            <label htmlFor="body" style={{ width: '100%' }}>
              <textarea
                placeholder="Question Description"
                name="body"
                className="input-fields"
                rows="4"
                required
              ></textarea>
            </label>

            <button type="submit">Post Question</button>
          </form>
        </div>

        <div style={{ marginTop: '30px', width: '100%' }}>
          {!questions
            ? null
            : [...questions].reverse().map((question, i) => (
                <div className="question-box-other block" key={i}>
                  <QuestionDisplayBlock
                    id={question.id}
                    userId={question.userId}
                    title={question.title}
                    body={question.body}
                  />
                </div>
              ))}
        </div>
      </div>
    </>
  )
}

function QuestionDisplayBlock(question: Question) {
  const { title, body, userId } = question
  const { user } = useUserById(userId)

  // console.log(user)

  return (
    <div className="question-box-other">
      <img
        src={user?.profilePicture ?? DEFAULT_PROFILE_PICTURE}
        alt={user?.name}
      />
      <Link to={`/questions/${question.id}`}>
        <h1 style={{ fontWeight: 'bold', fontSize: '2rem' }}>
          {title ?? 'Missing or deleted question title'}
        </h1>
      </Link>
      <div className="question-box-text">
        <p>{body ?? 'No question body provided.'}</p>
      </div>
    </div>
  )
}
