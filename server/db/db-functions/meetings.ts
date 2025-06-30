import db from '../connection'

export interface meetingData {
  public: boolean
  hostId: number
  title: string
  url: string
}

export async function addMeeting(meeting: meetingData) {
  await db('meetings').insert({
    public: meeting.public,
    host_id: meeting.hostId,
    title: meeting.title,
    url: meeting.url,
  })
}
