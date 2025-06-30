import db from '../connection'

export async function saveMeeting(userId: number, meetingId: number) {
  await db('saved_meetings').insert({ user_id: userId, meeting_id: meetingId })
}

export async function getSavedMeetings(userId: number) {
  return await db('saved_meetings').where({ user_id: userId }).select()
}
