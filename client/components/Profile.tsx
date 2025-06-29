export default function Profile() {
  return (
    <>
      <div
        style={{
          marginTop: '20vh',
          display: 'flex',
          paddingRight: '10vw',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '30vw',
            alignItems: 'center',
          }}
        >
          <h1
            style={{
              backgroundColor: 'grey',
              width: '100%',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '2rem',
              padding: '10px',
              borderRadius: '10px',
            }}
          >
            `Hello $&#123;User&#125;`
          </h1>
          <div
            style={{
              backgroundColor: 'lightgray',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '30px',
              justifyContent: 'space-between',
              height: '40vh',
              marginTop: '20px',
              borderRadius: '10px',
            }}
          >
            <h1 style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
              User details:
            </h1>
            <h2>
              Name: <input type="text" />
            </h2>
            <h2>
              Bio: <input type="text" />
            </h2>
            <button
              style={{
                backgroundColor: 'white',
                padding: '5px 20px',
                borderRadius: '10px',
              }}
            >
              Update
            </button>
          </div>
        </div>
        <div
          style={{
            backgroundColor: 'lightgray',
            width: '30vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            borderRadius: '10px',
            overflow: 'scroll',
            height: '55vh',
            scrollbarWidth: 'none',
          }}
        >
          <h1 style={{ fontWeight: 'bold', fontSize: '2rem' }}>
            Past solutions
          </h1>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'lightgrey',
              alignItems: 'center',
              padding: '20px',
              borderRadius: '10px',
              width: '100%',
            }}
          >
            <h1 style={{ fontWeight: 'bold', fontSize: '2rem' }}>Title</h1>
            <p
              style={{
                backgroundColor: 'white',
                padding: '10px 10px',
                borderRadius: '5px',
                marginTop: '10px',
              }}
            >
              Description blah blah blah blah blah blahblah blahblah blah blah
              blah blah blah blah
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
              width: '100%',
            }}
          >
            <h1 style={{ fontWeight: 'bold', fontSize: '2rem' }}>Title</h1>
            <p
              style={{
                backgroundColor: 'white',
                padding: '10px 10px',
                borderRadius: '5px',
                marginTop: '10px',
              }}
            >
              Description blah blah blah blah blah blahblah blahblah blah blah
              blah blah blah blah
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
