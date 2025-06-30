import { useAuth0 } from '@auth0/auth0-react'
import { useGetUsersMeetings } from 'client/hooks/useMeetings'
import { useAuth0Id } from 'client/hooks/useUsers'
import { Link } from 'react-router-dom'
import { meetingData } from 'server/db/db-functions/meetings'

export default function YourMeetings() {
  const { user } = useAuth0()

  const { data: userData } = useAuth0Id(user?.sub)

  const { data: meetingsData } = useGetUsersMeetings(userData?.id)

  if (!meetingsData || !userData) {
    return <p>Loading meetings...</p>
  }

  return (
    <>
      <h1>{userData.name}s meetings</h1>
      <ul>
        {meetingsData.map((meeting: meetingData, i: number) => {
          return (
            <li key={`Meeting ${i}`}>
              <a href={meeting.url} target="_blank" rel="noreferrer">
                {meeting.title}
              </a>
            </li>
          )
        })}
      </ul>
      <Link to="/meeting/create">
        <button>Create a meeting!</button>
      </Link>
    </>
  )
}
