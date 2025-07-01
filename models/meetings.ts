export interface MeetingData {
  id: number
  public: boolean
  host_id: number
  title: string
  url: string
}

export interface SavedMeeting {
  id: number
  user_id: number
  meeting_id: number
}
