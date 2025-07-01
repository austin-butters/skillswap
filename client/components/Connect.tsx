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
      <div className="search-container">
        <div className="search-box">
          <h1 className="search-title">Search for a user:</h1>
          <div className="search-input-container">
            <input
              type="text"
              className="search-input"
              onChange={(e) => {
                setSearch(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigate(`/search?input=${search}`)
                  window.location.reload()
                }
              }}
            />
            <button
              className="search-button"
              onClick={() => {
                navigate(`/search?input=${search}`)
                window.location.reload()
              }}
            >
              Search!
            </button>
          </div>
        </div>

        <div className="results-container">
          {usersData.length === 0 ? (
            <h1>No Results...</h1>
          ) : (
            usersData.map((user: User, i: number) => {
              if (user.id === userData.id) return null
              return (
                <div className="user-card" key={`user-${i}`}>
                  <h1 className="user-name">{user.name}</h1>
                  <div className="user-actions">
                    <FriendButton userId={userData.id} requestId={user.id} />
                    <Link to={`/message/${user.id}`} className="message-button">
                      Message
                    </Link>
                    <Link to={`/call/${user.id}`} className="call-button">
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
