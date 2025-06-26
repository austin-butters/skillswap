import { Link } from 'react-router-dom'
import '../styles/main.css'
export default function Sidebar() {
  const userId = 1
  return (
    <div>
      <div className="sidebar">
        <ul className="sidebar-menu">
          <h2 className="sidebar-header">Skill Swap</h2>
          <li>
            <div className="sidebar-button">
              <Link to="/">Home</Link>
            </div>
          </li>
          <li>
            <div className="sidebar-button">
              <Link to="/connect">Connect</Link>
            </div>
          </li>
          <li>
            <div className="sidebar-button">
              <Link to="/codeFixer">CodeFixer</Link>
            </div>
          </li>
          <li>
            <div className="sidebar-button">
              <Link to={`/inbox/${userId}`}>Inbox</Link>
            </div>
          </li>
          <li>
            <div className="sidebar-button">
              <Link to={`/profile/${userId}`}>Profile</Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
