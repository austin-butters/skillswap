import request from 'superagent'

const rootURL = new URL('/api/v1', document.baseURI)

export async function saveMeeting(userId: number, meetingId: number) {
  const response = await request.post(
    `${rootURL}/savedMeetings/${userId}/${meetingId}`,
  )
  return response.body
}

export async function getSavedMeetings(userId: number) {
  const response = await request.get(`${rootURL}/savedMeetings/${userId}`)
  return response.body
}
