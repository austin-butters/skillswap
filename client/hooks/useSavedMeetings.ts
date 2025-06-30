import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getSavedMeetings, saveMeeting } from '../api/savedMeetings'
import { useAuth0 } from '@auth0/auth0-react'

export function useSaveMeeting() {
  const queryClient = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()
  return useMutation({
    mutationFn: async (ids: { userId: number; meetingid: number }) => {
      const token = await getAccessTokenSilently()
      saveMeeting(ids.userId, ids.meetingid, token)
    },
    onSuccess: (data, params) => {
      queryClient.invalidateQueries({
        queryKey: ['savedMeetings', params.userId],
      })
    },
  })
}

export function useGetSavedMeetings(userId: number) {
  const { getAccessTokenSilently } = useAuth0()
  const query = useQuery({
    queryKey: ['savedMeetings', userId],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return getSavedMeetings(userId, token)
    },
  })
  return query
}
