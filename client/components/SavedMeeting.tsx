import { useRemoveSavedMeeting } from '../hooks/useSavedMeetings'
import { useGetMeetingById } from '../hooks/useMeetings'
import { UserId } from '#models'

export default function SavedMeeting({
  meetingId,
  userId,
}: {
  meetingId: number
  userId: UserId
}) {
  const { data: meetingData } = useGetMeetingById(meetingId)

  const removeSavedMeeting = useRemoveSavedMeeting()

  function handleRemoveSave(meetingId: number) {
    console.log(`Removing meeting ${meetingId}, for user ${userId}`)
    removeSavedMeeting.mutate({
      userId: userId,
      meetingId: meetingId,
    })
  }

  if (!meetingData) {
    return <p>Loading..</p>
  }

  return (
    <>
      <a
        href={meetingData.url}
        target="_blank"
        rel="noreferrer"
        className="w-3/6"
      >
        {meetingData.title}
      </a>
      <button
        onClick={() => handleRemoveSave(meetingData.id)}
        className="w-30 text-base"
      >
        Unsave
      </button>
    </>
  )
}
