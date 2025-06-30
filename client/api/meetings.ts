import { meetingData } from 'server/db/db-functions/meetings'
import request from 'superagent'

const rootURL = new URL('/api/v1', document.baseURI)

export async function createMeeting(meetingData: meetingData) {
  const response = await request.post(`${rootURL}/meetings`).send(meetingData)
  return response.body
}
