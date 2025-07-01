import { JWT, MeetingData } from '#models'
import { meetingData } from '../../server/db/db-functions/meetings'
import request from 'superagent'

const rootURL = new URL('/api/v1', document.baseURI)

export async function createMeeting(
  meetingData: meetingData,
  token: JWT,
): Promise<void> {
  const response = await request
    .post(`${rootURL}/meetings`)
    .set('Authorization', `Bearer ${token}`)
    .send(meetingData)
  return response.body
}

export async function getUserMeetings(
  userId: number,
  token: JWT,
): Promise<MeetingData[]> {
  const response = await request
    .get(`${rootURL}/meetings/user/${userId}`)
    .set('Authorization', `Bearer ${token}`)
  return response.body
}

export async function getPublicMeetings(): Promise<MeetingData[]> {
  const response = await request.get(`${rootURL}/meetings/public/all`)
  return response.body
}

export async function getMeetingById(
  meetingId: number,
  token: JWT,
): Promise<MeetingData> {
  const response = await request
    .get(`${rootURL}/meetings/meeting/${meetingId}`)
    .set('Authorization', `Bearer ${token}`)
  return response.body
}
