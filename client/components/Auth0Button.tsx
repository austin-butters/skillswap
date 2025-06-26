import { useAuth0 } from '@auth0/auth0-react'

export default function Auth0Button() {
  const { loginWithRedirect, logout, user } = useAuth0()

  function handleLogin() {
    loginWithRedirect({
      appState: { returnTo: '/loadingUser' },
    })
  }

  function handleLogout() {
    logout()
  }

  return (
    <>
      {!user ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </>
  )
}
