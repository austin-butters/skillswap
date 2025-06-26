import { useQuery } from '@tanstack/react-query'
import { getUserByAuth0Uid } from '../api/users'

export function useAuth0Id(auth0Id: string | undefined) {
  const query = useQuery({
    queryKey: ['userAuth0', auth0Id],
    queryFn: () => getUserByAuth0Uid(auth0Id),
  })
  return query
}
