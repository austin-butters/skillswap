import Sidebar from './Sidebar'

export default function Home() {
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
          <input
            type="text"
            placeholder="Question Title"
            style={{ width: '80%', padding: '7px 10px' }}
          />
          <input
            type="text"
            placeholder="Question Description"
            style={{ width: '80%', height: '40%', padding: '7px 10px' }}
          />
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
