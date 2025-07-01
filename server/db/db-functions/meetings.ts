import { AddMeetingData, MeetingData } from '#models'
import db from '../connection'

export interface meetingData {
  public: boolean
  hostId: number
  title: string
  url: string
}

export async function addMeeting(meeting: AddMeetingData): Promise<void> {
  await db('meetings').insert({
    public: meeting.public,
    host_id: meeting.hostId,
    title: meeting.title,
    url: meeting.url,
  })
}

export async function getUsersMeetings(userId: number): Promise<MeetingData[]> {
  return await db('meetings').where({ host_id: userId }).select()
}

export async function getPublicMeetings(): Promise<MeetingData[]> {
  return await db('meetings').where({ public: true }).select()
}

export async function getMeetingById(id: number): Promise<MeetingData> {
  return await db('meetings').where({ id: id }).first()
}
