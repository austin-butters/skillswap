import { Link } from 'react-router-dom'

export default function Inbox() {
  const testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <>
      <Sidebar />
      <div className="header">
        <h1>Inbox</h1>
      </div>
      <div className="inbox-box">
        {testArr.map((num) => {
          //Doing this so there isnt a bunch of html clogging the file so I can test scrolling
          return (
            <>
              <div className="inbox-message">
                <Link key={num} to={`/message/2`}>
                  <h1 style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                    User 2
                  </h1>
                  <p>This is the most recent message...</p>
                </Link>
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}
