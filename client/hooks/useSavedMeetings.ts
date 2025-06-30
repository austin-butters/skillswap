import { useMutation, useQueryClient } from '@tanstack/react-query'
import { saveMeeting } from '../api/savedMeetings'

export function useSaveMeeting() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (ids: { userId: number; meetingid: number }) =>
      saveMeeting(ids.userId, ids.meetingid),
    onSuccess: (data, params) => {
      queryClient.invalidateQueries({
        queryKey: ['savedMeetings', params.userId],
      })
    },
  })
}
