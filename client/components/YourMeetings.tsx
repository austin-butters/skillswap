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
    <div
      className="mt-20 flex space-x-2"
      style={{ marginRight: '5vw', marginLeft: '5vw' }}
    >
      {/* User's Meetings */}
      <div className="meeting-card">
        <h1>{userData.name}s meetings</h1>
        <ul>
          {meetingsData.length === 0 ? (
            <p>No meetings...</p>
          ) : (
            meetingsData.map((meeting: MeetingData, i: number) => (
              <li key={`Meeting ${i}`}>
                <a href={meeting.url} target="_blank" rel="noreferrer">
                  {meeting.title}
                </a>
              </li>
            ))
          )}
        </ul>
        <Link to="/meeting/create">
          <button>Create a meeting!</button>
        </Link>
      </div>

      {/* Recommended Public Meetings */}
      <div className="meeting-card">
        <h1>Recommended public meetings</h1>
        <ul>
          {publicMeetings.length === 0 ? (
            <p>No meetings...</p>
          ) : (
            publicMeetings.map((meeting, i) => {
              // Exclude meetings hosted by the user or already saved
              if (meeting.host_id === userData.id) return null
              if (
                savedMeetings.some(
                  (savedMeeting: SavedMeetingData) =>
                    meeting.id === savedMeeting.meeting_id,
                )
              )
                return null
              return (
                <li key={`Public meeting ${i}`} style={{ display: 'flex' }}>
                  <a href={meeting.url} target="_blank" rel="noreferrer">
                    {meeting.title}
                  </a>
                  <button
                    onClick={() => handleSave(meeting.id)}
                    className="w-30 ml-3 text-base"
                    style={{ marginTop: '0' }}
                  >
                    Save
                  </button>
                </li>
              )
            })
          )}
        </ul>
      </div>

      {/* Saved Meetings */}
      <div className="meeting-card">
        <h1>Saved meetings</h1>
        <ul>
          {savedMeetings.length === 0 ? (
            <p>No saved meetings...</p>
          ) : (
            savedMeetings.map((meeting: SavedMeetingData, i: number) => (
              <li key={`Saved meeting ${i}`}>
                <SavedMeeting
                  meetingId={Number(meeting.meeting_id)}
                  userId={Number(userData.id)}
                />
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}
