import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  addUser,
  editUser,
  getAllUsers,
  getUserByAuth0Uid,
  getUserById,
  getUsersFromSearch,
} from '../api/users'
import { UnassignedUser, UserId } from '#models'
import { useAuth0 } from '@auth0/auth0-react'
// import request from 'superagent'
// const rootURL = new URL(`/api/v1`, document.baseURI)

export function useAllUsers() {
  const { data: allUsers, ...remainingProperties } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => await getAllUsers(),
  })

  return { allUsers, ...remainingProperties }
}

export function useAuth0Id(auth0Id: string | undefined) {
  const query = useQuery({
    queryKey: ['userAuth0', auth0Id],
    queryFn: () => getUserByAuth0Uid(auth0Id),
    enabled: !!auth0Id,
  })
  return query
}

export function useAddUser() {
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (user: UnassignedUser) => {
      const token = await getAccessTokenSilently()
      addUser(user, token)
    },
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

export function useUserById(userId: UserId) {
  const { data: user, ...properties } = useQuery({
    queryKey: ['otherUsers'],
    queryFn: () => getUserById(userId),
    enabled: Number.isInteger(userId),
  })
  return { user, ...properties }
}

export function useEditUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (userData: {
      id: number
      name: string | undefined
      bio: string | undefined
      profilePicture: string | undefined
    }) => {
      editUser(
        userData.id,
        userData.name,
        userData.bio,
        userData.profilePicture,
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      })
      queryClient.invalidateQueries({
        queryKey: ['users'],
      })
    },
  })
}
