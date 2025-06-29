import { useAuth0 } from '@auth0/auth0-react'
import { useAddUser, useAuth0Id } from '../hooks/useUsers'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoadingAccount() {
  const { user: auth0User, isAuthenticated, isLoading } = useAuth0()
  const [userAdded, setUserAdded] = useState(false)
  const navigate = useNavigate()

  const { data: userData, isLoading: userLoading } = useAuth0Id(auth0User?.sub)
  const addUser = useAddUser()

  useEffect(() => {
    if (
      isAuthenticated &&
      auth0User &&
      !isLoading &&
      !userData &&
      !userLoading &&
      !userAdded
    ) {
      addUser.mutate(
        {
          auth0Uid: String(auth0User.sub),
          email: String(auth0User.email),
          name: String(auth0User.name),
          bio: null,
          profilePicture: auth0User.picture,
        },
        {
          onSuccess: (data) => {
            console.log('User created successfully:', data)
            setUserAdded(true)
          },
          onError: (error) => {
            console.error('Failed to create user:', error)
          },
        },
      )
    }
  }, [auth0User, isAuthenticated, isLoading, userAdded, userData, userLoading])

  useEffect(() => {
    if (userAdded || userData) {
      navigate(`/profile/${userData.id}`)
    }
  }, [userAdded, userData])

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '-20vw',
      }}
    >
      <span className="loading-indicator" />
      {!auth0User ? (
        <h1>Connecting...</h1>
      ) : userLoading ? (
        <h1>Loading your account...</h1>
      ) : !userAdded ? (
        <h1>Creating your profile...</h1>
      ) : (
        <h1>Redirecting...</h1>
      )}
    </div>
  )
}
