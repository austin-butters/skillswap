import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getDirectMessages, sendDirectMessage } from 'client/api/directMessages'

export function useGetDirectMessages(userId: number, otherId: number) {
  const query = useQuery({
    queryKey: ['directMessages', userId, otherId],
    queryFn: () => getDirectMessages(userId, otherId),
  })
  return query
}

export function useSendDirectMessage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      userId,
      receiverId,
      time,
      body,
    }: {
      userId: number
      receiverId: number
      time: string
      body: string
    }) => sendDirectMessage(userId, receiverId, time, body),
    onSuccess: (data, { userId, receiverId }) => {
      queryClient.invalidateQueries({
        queryKey: ['directMessages', userId, receiverId],
      })
    },
  })
}
