import { Link } from 'react-router-dom'

export default function Inbox() {
  const testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '75vw',
          backgroundColor: 'gray',
          borderRadius: '20px',
          alignItems: 'center',
          padding: '20px',
          height: '75vh',
          marginTop: '12.5vh',
          overflow: 'scroll',
          scrollbarWidth: 'none',
        }}
      >
        <h1
          style={{
            fontWeight: 'bold',
            fontSize: '2.5rem',
            marginBottom: '20px',
          }}
        >
          Inbox
        </h1>
        {testArr.map((num) => {
          //Doing this so there isnt a bunch of html clogging the file so I can test scrolling
          return (
            <Link
              key={num}
              to={`/message/2`}
              style={{
                backgroundColor: 'lightgray',
                display: 'flex',
                width: '80%',
                padding: '10px 20px',
                justifyContent: 'space-between',
                borderRadius: '10px',
                alignItems: 'center',
                marginBottom: '10px',
              }}
            >
              <h1 style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>User 2</h1>
              <p>This is the most recent message...</p>
            </Link>
          )
        })}
      </div>
    </>
  )
}
