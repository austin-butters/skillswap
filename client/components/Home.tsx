import { useAddQuestion } from '../hooks/useQuestions'
import Sidebar from './Sidebar'

export default function Home() {
  const addQuestion = useAddQuestion()

  const userId = 1

  const handleSubmit = async (e) => {
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
      <Sidebar />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '7vh',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '40vw',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'lightgrey',
            alignItems: 'center',
            padding: '20px',
            borderRadius: '10px',
            justifyContent: 'space-between',
            height: '50vh',
            width: '40vw',
          }}
        >
          <h1 style={{ fontWeight: 'bold', fontSize: '2rem' }}>
            Post your own question!
          </h1>
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'lightgrey',
              alignItems: 'center',
              padding: '20px',
              borderRadius: '10px',
              width: '40vw',
              marginBottom: '20px',
            }}
          >
            <h1 style={{ fontWeight: 'bold', fontSize: '2rem' }}>
              Question title
            </h1>
            <p
              style={{
                backgroundColor: 'white',
                padding: '10px 10px',
                borderRadius: '5px',
                marginTop: '10px',
              }}
            >
              Question description blah blah blah blah blah blahblah blahblah
              blah blah blah blah blah blah blah blah blah blah blah
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'lightgrey',
              alignItems: 'center',
              padding: '20px',
              borderRadius: '10px',
              width: '40vw',
              marginBottom: '20px',
            }}
          >
            <h1 style={{ fontWeight: 'bold', fontSize: '2rem' }}>
              Question title
            </h1>
            <p
              style={{
                backgroundColor: 'white',
                padding: '10px 10px',
                borderRadius: '5px',
                marginTop: '10px',
              }}
            >
              Question description blah blah blah blah blah blahblah blahblah
              blah blah blah blah blah blah blah blah blah blah blah blah blah
              blah blah blah blah blah blah blah blah blah blah blah blah blah
              blah blah blah blah blah blah blah
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
