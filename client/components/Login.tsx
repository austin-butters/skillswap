import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const { isAuthenticated, loginWithRedirect } = useAuth0()
  const navigate = useNavigate()

  if (isAuthenticated) {
    navigate('/')
  }

  loginWithRedirect({
    authorizationParams: {
      redirectUri: `${window.location.origin}/`,
    },
  })

  return null
}

export default Login
