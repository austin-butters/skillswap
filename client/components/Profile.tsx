import { useAuth0 } from '@auth0/auth0-react'
import { useAuth0Id } from 'client/hooks/useUsers'
import { useParams } from 'react-router-dom'

export default function Profile() {
  const { user } = useAuth0()
  const { data: userData, isLoading, isError } = useAuth0Id(user?.sub)
  const id = Number(useParams().id)
  if (isLoading) {
    return <p>Loading...</p>
  }
  let isUser = false
  if (!userData) {
    //users cannot view profiles unless logged in, could be changed later if this is not prefered.
    return (
      <>
        <p>
          No user found, you&apos;re probably loading but if you have time to
          read all this before the page loads you might not be logged in. Also
          going to hide the CHICKEN JOCKEY here.
        </p>
      </>
    )
  } else {
    if (id === userData.id) {
      isUser = true
    }
    return (
      <>
        <div className="user-dashboard">
          {/* User Info Section */}
          <div className="user-section">
            <div className="user-greeting">
              <h1>
                {isUser
                  ? `Hi ${userData.name}!`
                  : `${userData.name}'s profile.`}
              </h1>
              <p className="user-bio">{userData.bio}</p>
            </div>

            <div className="user-details-box">
              <h1>User details:</h1>
              <h2>
                Name: <input type="text" />
              </h2>
              <h2>
                Bio: <input type="text" />
              </h2>
              <button className="update-button">Update</button>
            </div>
          </div>

          {/* Past Solutions Section */}
          <div className="solutions-section">
            <h1>Past solutions</h1>

            <div className="solution-card">
              <h1>Title</h1>
              <p>
                Description blah blah blah blah blah blah blah blah blah blah
                blah blah blah blah blah blah
              </p>
            </div>

            <div className="solution-card">
              <h1>Title</h1>
              <p>
                Description blah blah blah blah blah blah blah blah blah blah
                blah blah blah blah blah blah
              </p>
            </div>
          </div>
        </div>
      </>
    )
  }
}
