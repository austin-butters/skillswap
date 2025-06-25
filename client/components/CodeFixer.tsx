import Sidebar from './Sidebar'

export default function CodeFixer() {
  return (
    <>
      <Sidebar />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: '10vw',
        }}
      >
        <div
          style={{
            backgroundColor: 'gray',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '30vw',
            height: '60vh',
            padding: '2vw',
            borderRadius: '10px',
          }}
        >
          <input
            type="text"
            style={{
              width: '100%',
              height: '75%',
              backgroundColor: 'lightgray',
              borderRadius: '10px',
            }}
          />
          <button
            style={{
              backgroundColor: 'white',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              padding: '5px 20px',
              borderRadius: '10px',
            }}
          >
            Fix Now!
          </button>
        </div>
        <div
          style={{
            backgroundColor: 'gray',
            width: '30vw',
            height: '60vh',
            padding: '2vw',
            borderRadius: '10px',
            color: 'white',
          }}
        >
          <p>This is a response I guess?</p>
        </div>
      </div>
    </>
  )
}
