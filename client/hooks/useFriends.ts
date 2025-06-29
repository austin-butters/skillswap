import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addFriend } from 'client/api/friends'

export function useAddFriend() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: { userId: number; requestId: number }) => {
      addFriend(data.userId, data.requestId)
    },
    onSuccess: (data, { userId, requestId }) =>
      queryClient.invalidateQueries({
        queryKey: ['friends', userId, requestId],
      }),
  })
}
