import { useGetMeetingById } from '../hooks/useMeetings'

export default function SavedMeeting({ meetingId }: { meetingId: number }) {
  const { data: meetingData } = useGetMeetingById(meetingId)

  if (!meetingData) {
    return <p>Loading..</p>
  }

  return (
    <>
      <a href={meetingData.url} target="_blank" rel="noreferrer">
        {meetingData.title}
      </a>
    </>
  )
}
