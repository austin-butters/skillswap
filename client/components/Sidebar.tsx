import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  const { isAuthenticated } = useAuth0()
  const loginPageLinkPath: string = '/login'

  const userId = 1
  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        height: '100%',
        width: '15vw',
        backgroundColor: 'gray',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Link
        to="/"
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.7rem',
          marginTop: '5px',
          marginBottom: '5px',
        }}
      >
        Home
      </Link>
      <Link
        to="/connect"
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.7rem',
          marginTop: '5px',
          marginBottom: '5px',
        }}
      >
        Connect
      </Link>
      <Link
        to={isAuthenticated ? '/codeFixer' : loginPageLinkPath}
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.7rem',
          marginTop: '5px',
          marginBottom: '5px',
        }}
      >
        Code Fixer
      </Link>
      <Link
        to={isAuthenticated ? `/inbox/${userId}` : loginPageLinkPath}
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.7rem',
          marginTop: '5px',
          marginBottom: '5px',
        }}
      >
        Inbox
      </Link>
      <Link
        to={isAuthenticated ? `/profile/${userId}` : loginPageLinkPath}
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.7rem',
          marginTop: '5px',
          marginBottom: '5px',
        }}
      >
        Profile
      </Link>
    </div>
  )
}
