import { DirectMessage, JWT, UserId } from '#models'
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getDirectMessages,
  getDirectMessagesByUser,
  sendDirectMessage,
} from '../api/directMessages'
import { useAuth0Id } from './useUsers'

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

export function useUserDirectMessages() {
  const { user, isLoading, error, getAccessTokenSilently } = useAuth0()

  const {
    data: userData,
    isError: userIsError,
    isPending: userIsPending,
  } = useAuth0Id(user?.sub)

  const {
    data: messagesFromQuery,
    isPending: messagesIsPending,
    isError: messagesIsError,
  } = useQuery({
    queryKey: ['directMessages'],
    queryFn: async () => {
      const token: JWT = await getAccessTokenSilently()
      return await getDirectMessagesByUser(userData.id, token)
    },
    enabled: !!userData && Number.isInteger(userData?.id),
  })

  const isError: boolean = !!error || userIsError || messagesIsError
  const isPending: boolean = userIsPending || messagesIsPending || isLoading
  const messages: DirectMessage[] | undefined = messagesFromQuery

  const myId: UserId | undefined = userData?.id

  return { myId, messages, isError, isPending }
}
