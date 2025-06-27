import { useQuery } from '@tanstack/react-query'
import { getDirectMessages } from 'client/api/directMessages'

export function useGetDirectMessages(userId: number, otherId: number) {
  const query = useQuery({
    queryKey: ['directMessages', userId, otherId],
    queryFn: () => getDirectMessages(userId, otherId),
  })
  return query
}
