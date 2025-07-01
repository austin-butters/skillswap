import { useAuth0 } from '@auth0/auth0-react'
import { useGetPublicMeetings, useGetUsersMeetings } from '../hooks/useMeetings'
import { useAuth0Id } from '../hooks/useUsers'
import { Link } from 'react-router-dom'
import { MeetingData, SavedMeetingData } from '#models'
import { useGetSavedMeetings, useSaveMeeting } from '../hooks/useSavedMeetings'
import SavedMeeting from './SavedMeeting'

export default function YourMeetings() {
  const { user } = useAuth0()

  const { data: userData } = useAuth0Id(user?.sub)

  const { data: meetingsData } = useGetUsersMeetings(userData?.id)
  const { data: savedMeetings } = useGetSavedMeetings(userData?.id)
  const { data: publicMeetings } = useGetPublicMeetings()

  const saveMeeting = useSaveMeeting()

  function handleSave(meetingId: number) {
    saveMeeting.mutate({
      userId: Number(userData?.id),
      meetingid: meetingId,
    })
  }

  if (!meetingsData || !userData || !publicMeetings || !savedMeetings) {
    return <p>Loading meetings...</p>
  }

  return (
    <div className="flex space-x-16">
      <div>
        <h1>{userData.name}s meetings</h1>
        <ul>
          {meetingsData.length === 0 ? (
            <p>No meetings...</p>
          ) : (
            meetingsData.map((meeting: MeetingData, i: number) => {
              return (
                <li key={`Meeting ${i}`}>
                  <a href={meeting.url} target="_blank" rel="noreferrer">
                    {meeting.title}
                  </a>
                </li>
              )
            })
          )}
        </ul>
        <Link to="/meeting/create">
          <button>Create a meeting!</button>
        </Link>
      </div>
      <div>
        <h1>Reccomended public meetings</h1>
        <ul>
          {publicMeetings.length === 0 ? (
            <p>No meetings...</p>
          ) : (
            publicMeetings.map((meeting, i) => {
              if (meeting.host_id === userData.id) {
                return null
              }
              if (
                savedMeetings.some(
                  (savedMeeting: SavedMeetingData) =>
                    meeting.id === savedMeeting.meeting_id,
                )
              ) {
                return null
              }
              return (
                <li key={`Public meeting ${i}`}>
                  <a href={meeting.url} target="_blank" rel="noreferrer">
                    {meeting.title}
                  </a>
                  <button onClick={() => handleSave(meeting.id)}>
                    Save Meeting
                  </button>
                </li>
              )
            })
          )}
        </ul>
      </div>
      <div>
        <h1>Saved meetings</h1>
        {savedMeetings.length === 0 ? (
          <p>No saved meetings...</p>
        ) : (
          savedMeetings.map((meeting: SavedMeetingData, i: number) => {
            return (
              <li key={`Saved meeting ${i}`}>
                <SavedMeeting
                  meetingId={Number(meeting.meeting_id)}
                  userId={Number(userData.id)}
                />
              </li>
            )
          })
        )}
      </div>
    </div>
  )
}
