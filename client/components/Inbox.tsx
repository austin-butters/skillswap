import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function Inbox() {
  const testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <>
      <Sidebar />

      <div className="header">
        <h1>Inbox</h1>
      </div>

      <div className="inbox-box">
        {testArr.map((num) => (
          <div className="inbox-message" key={num}>
            <Link to={`/message/2`}>
              <h1>User 2</h1>
              <p>This is the most recent message...</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
