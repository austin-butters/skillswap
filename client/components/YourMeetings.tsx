import { useAuth0 } from '@auth0/auth0-react'
import { useAuth0Id } from 'client/hooks/useUsers'

export default function YourMeetings() {
  const { user } = useAuth0()

  const { data: userData } = useAuth0Id(user?.sub)

  return <p>Testing...</p>
}
