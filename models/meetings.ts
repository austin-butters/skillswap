export interface MeetingData {
  id: number
  public: boolean
  host_id: number
  title: string
  url: string
}

export interface SavedMeetingData {
  id: number
  user_id: number
  meeting_id: number
}

export interface AddMeetingData {
  public: boolean
  hostId: number
  title: string
  url: string
}
