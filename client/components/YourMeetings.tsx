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
    <div className="mt-20 flex space-x-8">
      <div className="h-full w-full flex-col justify-items-center bg-gray-200 p-3">
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
      <div className="w-full flex-col justify-items-center bg-gray-200 p-3">
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
                <li
                  key={`Public meeting ${i}`}
                  className="w-full flex-row items-center"
                >
                  <a href={meeting.url} target="_blank" rel="noreferrer">
                    {meeting.title}
                  </a>
                  <button
                    onClick={() => handleSave(meeting.id)}
                    className="w-30 ml-3 text-base"
                  >
                    Save
                  </button>
                </li>
              )
            })
          )}
        </ul>
      </div>
      <div className="w-full flex-col justify-items-center bg-gray-200 p-3">
        <h1>Saved meetings</h1>
        <ul>
          {savedMeetings.length === 0 ? (
            <p>No saved meetings...</p>
          ) : (
            savedMeetings.map((meeting: SavedMeetingData, i: number) => {
              return (
                <li
                  key={`Saved meeting ${i}`}
                  className="w-full flex-row items-center"
                >
                  <SavedMeeting
                    meetingId={Number(meeting.meeting_id)}
                    userId={Number(userData.id)}
                  />
                </li>
              )
            })
          )}
        </ul>
      </div>
    </div>
  )
}
