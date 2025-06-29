import { JWT } from '#models'
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getDirectMessages, sendDirectMessage } from 'client/api/directMessages'

export function useGetDirectMessages(userId: number, otherId: number) {
  const { getAccessTokenSilently } = useAuth0()
  const query = useQuery({
    queryKey: ['directMessages', userId, otherId],
    queryFn: async () => {
      const token: JWT = await getAccessTokenSilently()
      return getDirectMessages(userId, otherId, token)
    },
  })
  return query
}

export function useSendDirectMessage() {
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      userId,
      receiverId,
      time,
      body,
    }: {
      userId: number
      receiverId: number
      time: string
      body: string
    }) => {
      const token = await getAccessTokenSilently()
      return await sendDirectMessage(userId, receiverId, time, body, token)
    },
    onSuccess: (data, { userId, receiverId }) => {
      queryClient.invalidateQueries({
        queryKey: ['directMessages', userId, receiverId],
      })
    },
  })
}
