import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  addUser,
  getAllUsers,
  getUserByAuth0Uid,
  getUsersFromSearch,
} from '../api/users'
import { UnassignedUser } from '#models'
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

export function useGetUsersSearch(searchInput: string) {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: () => {
      if (searchInput === 'null') {
        return getAllUsers()
      } else {
        return getUsersFromSearch(searchInput)
      }
    },
  })
  return query
}
