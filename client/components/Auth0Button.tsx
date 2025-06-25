import { useAuth0 } from '@auth0/auth0-react'

export default function Auth0Button() {
  const { loginWithRedirect, logout, user } = useAuth0()

  function handleLogin() {
    loginWithRedirect()
  }

  function handleLogout() {
    logout()
  }

  return {user : <button>Logout</button> ? <button onClick={handleLogin}>Log in</button>}
}
