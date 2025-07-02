import { useAuth0 } from '@auth0/auth0-react'
import { useQuestionByUserId } from '../hooks/useQuestions'
import { useAuth0Id, useEditUser, useUserById } from '../hooks/useUsers'
import { useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

export default function Profile() {
  const queryClient = useQueryClient()
  let editDropdown = false
  const { user } = useAuth0()
  const id = Number(useParams().id)
  const editUser = useEditUser()
  const {
    data: userData,
    isLoading: otherUserIsLoading,
    isError: otherUserIsError,
  } = useAuth0Id(user?.sub)
  const { user: OtherUserData, isLoading, isError } = useUserById(id)
  const {
    question,
    isLoading: questionsLoading,
    isError: questionsError,
  } = useQuestionByUserId(id)
  if (isLoading || questionsLoading) {
    return <p>Loading...</p>
  }
  console.log(question)
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
    queryClient.invalidateQueries({
      queryKey: ['userAuth0', user?.sub ?? 'unauthenticated'],
    })
    queryClient.invalidateQueries({
      queryKey: ['questions'],
    })
  }

  function dropdownPress() {
    if (editDropdown) {
      return (editDropdown = false)
    } else {
      return (editDropdown = true)
    }
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
      } else if (!OtherUserData) {
        // No user
        return <p>No profile for user.</p>
      } else if (OtherUserData.id === userData.id)
        //Own profile
        return (
          <>
            <div className="user-dashboard">
              {/* User Info Section */}
              <div className="user-section">
                <div className="user-greeting">
                  <h1>{`Hi ${userData.name}!`}</h1>
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

                    <button
                      type="submit"
                      className="update-button"
                      style={{ color: '#5a67d8' }}
                    >
                      Update
                    </button>
                  </form>
                </div>
              </div>

              {/* Past Solutions Section */}
              <div className="solutions-section">
                <h1>Past posts</h1>
                {!question
                  ? null
                  : question.map((questionData) => (
                      <div key={questionData.id} className="solution-card">
                        <h1>{questionData.title}</h1>
                        <p>{questionData.body}</p>
                      </div>
                    ))}
              </div>
            </div>
          </>
        )
    } else if (OtherUserData)
      //other people
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
              <h1>Past posts</h1>
              {!question
                ? null
                : question.map((questionData) => (
                    <div key={questionData.id} className="solution-card">
                      <h1>{questionData.title}</h1>
                      <p>{questionData.body}</p>
                    </div>
                  ))}
            </div>
          </div>
        </>
      )
  }
}
