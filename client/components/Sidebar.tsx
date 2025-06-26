import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import '../styles/main.css'
import Auth0Button from './Auth0Button'
export default function Sidebar() {
  const { isAuthenticated } = useAuth0()
  const loginPageLinkPath: string = '/login'

  const userId = 1
  return (
    <div>
      <div className="sidebar">
        <ul className="sidebar-menu">
          <h2 className="sidebar-header">Skill Swap</h2>
          <Auth0Button />
          <li>
            <div className="sidebar-button">
              <Link to="/">Home</Link>
            </div>
          </li>
          <li>
            <div className="sidebar-button">
              <Link to={isAuthenticated ? '/connect' : loginPageLinkPath}>
                Connect
              </Link>
            </div>
          </li>
          <li>
            <div className="sidebar-button">
              <Link to={isAuthenticated ? '/codeFixer' : loginPageLinkPath}>
                CodeFixer
              </Link>
            </div>
          </li>
          <li>
            <div className="sidebar-button">
              <Link
                to={isAuthenticated ? `/inbox/${userId}` : loginPageLinkPath}
              >
                Inbox
              </Link>
            </div>
          </li>
          <li>
            <div className="sidebar-button">
              <Link
                to={isAuthenticated ? `/profile/${userId}` : loginPageLinkPath}
              >
                Profile
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
