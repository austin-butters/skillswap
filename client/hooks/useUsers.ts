import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addUser, getUserByAuth0Uid } from '../api/users'
import { UnassignedUser } from '#models'

export function useAuth0Id(auth0Id: string | undefined) {
  const query = useQuery({
    queryKey: ['userAuth0', auth0Id],
    queryFn: () => getUserByAuth0Uid(auth0Id),
  })
  return query
}

export function useAddUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (user: UnassignedUser) => addUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
