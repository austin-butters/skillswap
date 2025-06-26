import { useAuth0 } from '@auth0/auth0-react'
import { useAuth0Id } from '../hooks/useUsers'

export default function LoadingAccount() {
  const { user: auth0User } = useAuth0()

  //Here you would check the database for the user using the auth0 sub i think?
  //If there isnt then post info to database using the user object
  //Finally you can do something like if (userData) {
  //  navigate(`/user/${userData.id}`)
  //}
  //I think you'll have to import navigate from react-router-dom by the way

  const { data: userData, isLoading: userLoading } = useAuth0Id(auth0User?.sub)

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
      ) : !userLoading ? (
        <h1>Grabbing user info</h1>
      ) : !userData ? (
        <h1>Creating account</h1>
      ) : (
        <h1>Done!</h1>
      )}
    </div>
  )
}
