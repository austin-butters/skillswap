import { useAuth0 } from '@auth0/auth0-react'

export default function Auth0Button() {
  const { loginWithRedirect, logout } = useAuth0()

  function handleLogin() {
    loginWithRedirect()
  }

  function handleLogout() {
    logout()
  }

  return <button onClick={handleLogin}>Log In</button>
}
