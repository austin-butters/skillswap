import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  addUser,
  getAllUsers,
  getUserByAuth0Uid,
  getUserById,
  getUsersFromSearch,
} from '../api/users'
import { UnassignedUser, UserId } from '#models'

export function useAuth0Id(auth0Id: string | undefined) {
  const query = useQuery({
    queryKey: ['userAuth0', auth0Id],
    queryFn: () => getUserByAuth0Uid(auth0Id),
    enabled: !!auth0Id,
  })
  return query
}

export function useAddUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (user: UnassignedUser) => addUser(user),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['userAuth0', variables.auth0Uid],
      })
    },
  })
}

export function useGetUsersSearch(searchInput: string) {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      if (searchInput === 'null') {
        return getAllUsers()
      } else {
        return getUsersFromSearch(searchInput)
      }
    },
  })
  return query
}

export function useUserById(userId: UserId) {
  const { data: user, ...properties } = useQuery({
    queryKey: ['otherUsers'],
    queryFn: () => getUserById(userId),
  })
  return { user, ...properties }
}
