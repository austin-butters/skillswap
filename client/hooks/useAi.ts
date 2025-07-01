import { AddCodeFixData, UserId } from '#models'
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addAiResponse, getUsersCodeFixes } from 'client/api/ai'

export function useAddAiResponse() {
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (responseData: AddCodeFixData) => {
      const token = await getAccessTokenSilently()
      await addAiResponse(responseData, token)
    },
    onSuccess: (data, params) => {
      queryClient.invalidateQueries({
        queryKey: ['aiResponses', params.userId],
      })
    },
  })
}

export async function useGetUsersCodeFixes(userId: UserId) {
  const { getAccessTokenSilently } = useAuth0()
  const query = useQuery({
    queryKey: ['aiResponses', userId],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      getUsersCodeFixes(userId, token)
    },
  })
  return query
}
