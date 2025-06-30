import { useMutation } from '@tanstack/react-query'
import { createMeeting } from 'client/api/meetings'
import { meetingData } from 'server/db/db-functions/meetings'

export function useCreateMeeting() {
  return useMutation({
    mutationFn: (meetingData: meetingData) => createMeeting(meetingData),
  })
}
