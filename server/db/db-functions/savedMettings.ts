import { SavedMeeting, UserId } from '#models'
import db from '../connection'

export async function saveMeeting(
  userId: number,
  meetingId: number,
): Promise<void> {
  const existingSave = await db('saved_meetings')
    .where({
      user_id: userId,
      meeting_id: meetingId,
    })
    .first()
  if (existingSave === undefined) {
    return
  }
  await db('saved_meetings').insert({ user_id: userId, meeting_id: meetingId })
}

export async function getSavedMeetings(
  userId: number,
): Promise<SavedMeeting[]> {
  return await db('saved_meetings').where({ user_id: userId }).select()
}

export async function removeSavedMeeting(userId: UserId, meetingId: number) {
  await db('saved_meetings')
    .where({ user_id: userId, meeting_id: meetingId })
    .del()
}
