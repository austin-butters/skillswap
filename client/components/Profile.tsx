import { useAuth0 } from '@auth0/auth0-react'
import { editUser } from 'client/api/users'
import { useAuth0Id, useEditUser, useUserById } from 'client/hooks/useUsers'
import { useParams } from 'react-router-dom'
import { getUser } from 'server/db/db-functions/users'

export default function Profile() {
  const { user } = useAuth0()
  const id = Number(useParams().id)
  const editUser = useEditUser()
  const {
    data: userData,
    isLoading: otherUserIsLoading,
    isError: otherUserIsError,
  } = useAuth0Id(user?.sub)
  const { user: OtherUserData, isLoading, isError } = useUserById(id)

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (otherUserIsLoading) {
    return <p>Loading...</p>
  }
  if (otherUserIsError) {
    return <p>Error, this person might not exist.</p>
  }
  let isUser = false
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    console.log('Submit')
    console.log(formData.get('name'))
    editUser.mutate({
      id: id,
      name: String(formData.get('name')),
      bio: String(formData.get('bio')),
      profilePicture: undefined,
    })
  }

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
      if (userData.name === null || userData.bio === null) {
        //if user has yet to register
        return (
          <>
            <div className="user-dashboard">
              <div className="user-section">
                <div className="user-greeting">
                  <h1>Welcome!</h1>
                  <p className="user-bio">
                    Let&apos;s finish up your registration.
                  </p>
                </div>
                <div className="user-details-box">
                  <h1>User details:</h1>
                  <form onSubmit={handleSubmit}>
                    <h2>
                      Name:{' '}
                      <label htmlFor="name">
                        <input type="text" name="name" required />
                      </label>
                    </h2>
                    <h2>
                      Bio:{' '}
                      <label htmlFor="bio">
                        <input type="text" name="bio" required />
                      </label>
                    </h2>

                    <button type="submit" className="update-button">
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
        )
      } else if (isLoading) {
        return <p>Loading...</p>
      } else if (OtherUserData.id === userData.id)
        return (
          <>
            <div className="user-dashboard">
              {/* User Info Section */}
              <div className="user-section">
                <div className="user-greeting">
                  <h1>
                    {isUser
                      ? `Hi ${userData.name}!`
                      : `${OtherUserData.name}'s profile.`}
                  </h1>
                  <p className="user-bio">{userData.bio}</p>
                </div>

                <div className="user-details-box">
                  <h1>User details:</h1>
                  <form onSubmit={handleSubmit}>
                    <h2>
                      Name:{' '}
                      <label htmlFor="name">
                        <input type="text" name="name" required />
                      </label>
                    </h2>
                    <h2>
                      Bio:{' '}
                      <label htmlFor="bio">
                        <input type="text" name="bio" required />
                      </label>
                    </h2>

                    <button type="submit" className="update-button">
                      Update
                    </button>
                  </form>
                </div>
              </div>

              {/* Past Solutions Section */}
              <div className="solutions-section">
                <h1>Past solutions</h1>

                <div className="solution-card">
                  <h1>Title</h1>
                  <p>
                    Description blah blah blah blah blah blah blah blah blah
                    blah blah blah blah blah blah blah
                  </p>
                </div>

                <div className="solution-card">
                  <h1>Title</h1>
                  <p>
                    Description blah blah blah blah blah blah blah blah blah
                    blah blah blah blah blah blah blah
                  </p>
                </div>
              </div>
            </div>
          </>
        )
    } else if (OtherUserData)
      return (
        <>
          <div className="user-dashboard">
            {/* User Info Section */}
            <div className="user-section">
              <div className="user-greeting">
                <h1>{`${OtherUserData.name}'s profile.`}</h1>
                <p className="user-bio">{userData.bio}</p>
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
