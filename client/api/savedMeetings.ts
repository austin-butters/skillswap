import request from 'superagent'

const rootURL = new URL('/api/v1', document.baseURI)

export async function saveMeeting(userId: number, meetingId: number) {
  const response = await request.post(
    `${rootURL}/savedMeetings/${userId}/${meetingId}`,
  )
  return response.body
}
