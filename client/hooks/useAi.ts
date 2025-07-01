import { AddCodeFixData } from '#models'
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addAiResponse } from 'client/api/ai'

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
