import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addUser, getUserByAuth0Uid, getUserById } from '../api/users'
import { UnassignedUser, UserId } from '#models'

export function useAuth0Id(auth0Id: string | undefined) {
  const query = useQuery({
    queryKey: ['userAuth0'],
    queryFn: () => getUserByAuth0Uid(auth0Id),
  })
  return query
}

export function useAddUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (user: UnassignedUser) => addUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAuth0'] })
    },
  })
}

export function useUserById(userId: UserId) {
  const { data: user, ...properties } = useQuery({
    queryKey: ['otherUsers'],
    queryFn: () => getUserById(userId),
  })
  return { user, ...properties }
}
