import { Question } from '#models'
import { useAddQuestion, useQuestions } from '../hooks/useQuestions'
import '../styles/main.css'
export default function Home() {
  const addQuestion = useAddQuestion()

  const { questions, isPending, isError, error } = useQuestions()

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

  return (
    <>
      <div className="column-flex">
        <div className="question-box">
          <div className="sidebar-header">
            <h1 style={{ fontWeight: 'bold', fontSize: '2rem' }}>
              Post your own question!
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">
              Title
              <input
                type="text"
                placeholder="Question Title"
                name="title"
                style={{ width: '80%', padding: '7px 10px' }}
              />
            </label>
            <label htmlFor="body">
              Description
              <input
                type="text"
                placeholder="Question Description"
                name="body"
                style={{ width: '80%', height: '40%', padding: '7px 10px' }}
              />
            </label>
            <button
              style={{
                backgroundColor: 'white',
                fontWeight: 'bold',
                fontSize: '1.3rem',
                padding: '5px 30px',
                borderRadius: '10px',
              }}
            >
              Post!
            </button>
          </form>
        </div>
        <div style={{ marginTop: '30px' }}>
          {!questions
            ? null
            : questions.map((question, i) => {
                return (
                  <QuestionDisplayBlock
                    key={i}
                    id={question.id}
                    userId={question.userId}
                    title={question.title}
                    body={question.body}
                  />
                )
              })}
        </div>
      </div>
    </>
  )
}

function QuestionDisplayBlock(question: Question) {
  const { title, body } = question

  return (
    <div className="question-box-other">
      <h1 style={{ fontWeight: 'bold', fontSize: '2rem' }}>{title}</h1>
      <div className="question-box-text">
        <p>{body}</p>
      </div>
    </div>
  )
}
