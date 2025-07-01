import { JWT, UserId } from '#models'
import request from 'superagent'

const rootURL = new URL('/api/v1', document.baseURI)

export async function saveMeeting(
  userId: number,
  meetingId: number,
  token: JWT,
) {
  const response = await request
    .post(`${rootURL}/savedMeetings/${userId}/${meetingId}`)
    .set('Authorization', `Bearer ${token}`)
  return response.body
}

export async function getSavedMeetings(userId: number, token: JWT) {
  const response = await request
    .get(`${rootURL}/savedMeetings/${userId}`)
    .set('Authorization', `Bearer ${token}`)
  return response.body
}

export async function removeSavedMeeting(
  userId: UserId,
  meetingId: number,
  token: JWT,
) {
  const response = await request
    .del(`${rootURL}/savedMeetings/${userId}/${meetingId}`)
    .set('Authorization', `Bearer ${token}`)
  return response.body
}
