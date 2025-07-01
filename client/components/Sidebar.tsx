import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import '../styles/main.css'
import Auth0Button from './Auth0Button'
import { useAuth0Id } from 'client/hooks/useUsers'
export default function Sidebar() {
  const { isAuthenticated, user } = useAuth0()
  const loginPageLinkPath: string = '/login'

  const { data: userData } = useAuth0Id(user?.sub)

  if (!userData && isAuthenticated) {
    return (
      <div>
        <div className="sidebar"></div>
      </div>
    )
  }

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
          {!isAuthenticated ? null : (
            <>
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
                  <Link to={isAuthenticated ? `/inbox` : loginPageLinkPath}>
                    Inbox
                  </Link>
                </div>
              </li>
              <li>
                <div className="sidebar-button">
                  <Link
                    to={
                      isAuthenticated
                        ? `/profile/${userData.id}`
                        : loginPageLinkPath
                    }
                  >
                    Profile
                  </Link>
                </div>
                <div className="sidebar-button">
                  <Link
                    to={isAuthenticated ? '/yourMeetings' : loginPageLinkPath}
                  >
                    Meetings
                  </Link>
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
