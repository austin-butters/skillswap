import { Link } from 'react-router-dom'

export default function Sidebar() {
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
        to="/codeFixer"
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
        to={`/inbox/${userId}`}
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
        to={`/profile/${userId}`}
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
