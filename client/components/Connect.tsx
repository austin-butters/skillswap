import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function Connect() {
  return (
    <>
      <Sidebar />
      <div
        style={{
          paddingRight: '10vw',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '60vw',
          marginTop: '7vh',
        }}
      >
        <div
          style={{
            backgroundColor: 'gray',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <h1
            style={{
              fontWeight: 'bold',
              fontSize: '2rem',
            }}
          >
            Search for a user:
          </h1>
          <div style={{ width: '80%' }}>
            <input
              type="text"
              style={{
                width: '70%',
                padding: '5px 20px',
                borderRadius: '5px',
                marginTop: '20px',
              }}
            />
            <button
              style={{
                backgroundColor: 'white',
                marginLeft: '10px',
                fontWeight: 'bold',
                padding: '5px 20px',
                borderRadius: '5px',
              }}
            >
              Search!
            </button>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <div
            style={{
              backgroundColor: 'lightgrey',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 30px',
              borderRadius: '10px',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <h1 style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>User 1</h1>
            <div>
              <Link
                to={`/message/${1}`}
                style={{
                  backgroundColor: 'blue',
                  padding: '5px 15px',
                  color: 'white',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                }}
              >
                Message
              </Link>
              <Link
                to={`/call/${1}`}
                style={{
                  backgroundColor: 'green',
                  padding: '5px 15px',
                  color: 'white',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                  marginLeft: '10px',
                }}
              >
                Call
              </Link>
            </div>
          </div>
          <div
            style={{
              backgroundColor: 'lightgrey',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 30px',
              borderRadius: '10px',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <h1 style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>User 2</h1>
            <div>
              <Link
                to={`/message/${2}`}
                style={{
                  backgroundColor: 'blue',
                  padding: '5px 15px',
                  color: 'white',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                }}
              >
                Message
              </Link>
              <Link
                to={`/call/${2}`}
                style={{
                  backgroundColor: 'green',
                  padding: '5px 15px',
                  color: 'white',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                  marginLeft: '10px',
                }}
              >
                Call
              </Link>
            </div>
          </div>
          <div
            style={{
              backgroundColor: 'lightgrey',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 30px',
              borderRadius: '10px',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <h1 style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>User 3</h1>
            <div>
              <Link
                to={`/message/${3}`}
                style={{
                  backgroundColor: 'blue',
                  padding: '5px 15px',
                  color: 'white',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                }}
              >
                Message
              </Link>
              <Link
                to={`/call/${3}`}
                style={{
                  backgroundColor: 'green',
                  padding: '5px 15px',
                  color: 'white',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                  marginLeft: '10px',
                }}
              >
                Call
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
