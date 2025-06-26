import { useAuth0 } from '@auth0/auth0-react'
import { useAuth0Id } from '../hooks/useUsers'
import { useEffect, useState } from 'react'

export default function LoadingAccount() {
  const { user: auth0User, isAuthenticated, isLoading } = useAuth0()

  const [userAdded, setUserAdded] = useState(false)

  //Here you would check the database for the user using the auth0 sub i think?
  //If there isnt then post info to database using the user object
  //Finally you can do something like if (userData) {
  //  navigate(`/user/${userData.id}`)
  //}
  //I think you'll have to import navigate from react-router-dom by the way

  const { data: userData, isLoading: userLoading } = useAuth0Id(auth0User?.sub)

  if (userData) {
    setUserAdded(true)
  }

  useEffect(() => {
    if (
      isAuthenticated &&
      auth0User &&
      !isLoading &&
      !userData &&
      !userLoading &&
      !userAdded
    ) {
      console.log('Adding user')
      setUserAdded(true)
    }
  }, [auth0User, isAuthenticated, isLoading, userAdded, userData, userLoading])

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
        <h1>Connecting</h1>
      ) : userLoading ? (
        <h1>Grabbing user info</h1>
      ) : !userAdded ? (
        <h1>Creating account</h1>
      ) : (
        <h1>Done!</h1>
      )}
    </div>
  )
}
