import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createMeeting,
  getPublicMeetings,
  getUserMeetings,
} from '../api/meetings'
import { meetingData } from '../../server/db/db-functions/meetings'

export function useCreateMeeting() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (meetingData: meetingData) => createMeeting(meetingData),
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
  const query = useQuery({
    queryKey: ['meetings', userId],
    queryFn: () => getUserMeetings(userId),
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
