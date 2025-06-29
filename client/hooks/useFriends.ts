import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addFriend, getStatus } from 'client/api/friends'

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

export function useGetStatus(userId: number, requestId: number) {
  const query = useQuery({
    queryKey: ['friends', userId, requestId],
    queryFn: () => getStatus(userId, requestId),
  })
  return query
}
