import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createMeeting,
  getMeetingById,
  getPublicMeetings,
  getUserMeetings,
} from '../api/meetings'
import { meetingData } from '../../server/db/db-functions/meetings'
import { useAuth0 } from '@auth0/auth0-react'

export function useCreateMeeting() {
  const queryClient = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()
  return useMutation({
    mutationFn: async (meetingData: meetingData) => {
      const token = await getAccessTokenSilently()
      createMeeting(meetingData, token)
    },
    onSuccess: (data, params) => {
      queryClient.invalidateQueries({
        queryKey: ['meetings', params.hostId],
      })
      queryClient.invalidateQueries({
        queryKey: ['publicMeetings'],
      })
    },
  })
}

export function useGetUsersMeetings(userId: number) {
  const { getAccessTokenSilently } = useAuth0()
  const query = useQuery({
    queryKey: ['meetings', userId],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return getUserMeetings(userId, token)
    },
    enabled: !!userId,
  })
  return query
}

export function useGetPublicMeetings() {
  const query = useQuery({
    queryKey: ['publicMeetings'],
    queryFn: () => getPublicMeetings(),
  })
  return query
}

export function useGetMeetingById(meetingId: number) {
  const { getAccessTokenSilently } = useAuth0()
  const query = useQuery({
    queryKey: ['meeting', meetingId],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return getMeetingById(meetingId, token)
    },
  })
  return query
}
