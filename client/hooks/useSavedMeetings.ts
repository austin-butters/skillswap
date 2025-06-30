import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getSavedMeetings, saveMeeting } from '../api/savedMeetings'

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

export function useGetSavedMeetings(userId: number) {
  const query = useQuery({
    queryKey: ['savedMeetings', userId],
    queryFn: () => getSavedMeetings(userId),
  })
  return query
}
