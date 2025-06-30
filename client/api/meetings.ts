import { meetingData } from '../../server/db/db-functions/meetings'
import request from 'superagent'

const rootURL = new URL('/api/v1', document.baseURI)

export async function createMeeting(meetingData: meetingData) {
  const response = await request.post(`${rootURL}/meetings`).send(meetingData)
  return response.body
}

export async function getUserMeetings(userId: number) {
  const response = await request.get(`${rootURL}/meetings/${userId}`)
  return response.body
}

export async function getPublicMeetings() {
  const response = await request.get(`${rootURL}/meetings/public/all`)
  return response.body
}
