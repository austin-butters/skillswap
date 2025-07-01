import { User } from '#models'
import { useAuth0 } from '@auth0/auth0-react'
import { useAuth0Id, useGetUsersSearch } from '../hooks/useUsers'
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import FriendButton from './FriendButton'

export default function SearchResults() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const { user } = useAuth0()

  const { data: userData } = useAuth0Id(user?.sub)

  const [searchParams] = useSearchParams()

  const searchTerm = searchParams.get('input')

  const { data: usersData, isLoading: usersLoading } = useGetUsersSearch(
    String(searchTerm),
  )

  if (usersLoading || !userData) {
    return <p>Loading users...</p>
  }

  return (
    <>
      <div
        style={{
          paddingRight: '10vw',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '60vw',
          marginTop: '7vh',
        }}
      >
        <div
          style={{
            backgroundColor: 'gray',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <h1
            style={{
              fontWeight: 'bold',
              fontSize: '2rem',
            }}
          >
            Search for a user:
          </h1>
          <div style={{ width: '80%' }}>
            <input
              type="text"
              style={{
                width: '70%',
                padding: '5px 20px',
                borderRadius: '5px',
                marginTop: '20px',
              }}
              onChange={(e) => {
                setSearch(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigate(`/connect?input=${search}`)
                  window.location.reload()
                }
              }}
            />
            <button
              style={{
                backgroundColor: 'white',
                marginLeft: '10px',
                fontWeight: 'bold',
                padding: '5px 20px',
                borderRadius: '5px',
              }}
              onClick={() => {
                navigate(`/connect?input=${search}`)
                window.location.reload()
              }}
            >
              Search!
            </button>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          {usersData.length === 0 ? (
            <h1>No Results...</h1>
          ) : (
            usersData.map((user: User, i: number) => {
              if (user.id === userData.id) {
                return null
              }
              return (
                <div
                  style={{
                    backgroundColor: 'lightgrey',
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px 30px',
                    borderRadius: '10px',
                    alignItems: 'center',
                    marginBottom: '20px',
                  }}
                  key={`user-${i}`}
                >
                  <h1 style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                    {user.name}
                  </h1>
                  <div>
                    <FriendButton userId={userData.id} requestId={user.id} />
                    <Link
                      to={`/message/${user.id}`}
                      style={{
                        backgroundColor: 'blue',
                        padding: '5px 15px',
                        color: 'white',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                      }}
                    >
                      Message
                    </Link>
                    <Link
                      to={`/call/${user.id}`}
                      style={{
                        backgroundColor: 'green',
                        padding: '5px 15px',
                        color: 'white',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        marginLeft: '10px',
                      }}
                    >
                      Call
                    </Link>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </>
  )
}
