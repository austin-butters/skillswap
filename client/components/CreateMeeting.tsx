import { useAuth0 } from '@auth0/auth0-react'
import { useCreateMeeting } from '../hooks/useMeetings'
import { useAuth0Id } from '../hooks/useUsers'
import { useNavigate } from 'react-router-dom'

export default function CreateMeeting() {
  const addMeeting = useCreateMeeting()

  const { user } = useAuth0()

  const { data: userData } = useAuth0Id(user?.sub)

  const navigate = useNavigate()

  const handleCreateMeeting = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target
    const formdata = await new FormData(form)

    const title = String(formdata.get('title'))

    const isPublic = formdata.get('public') === null ? false : true

    addMeeting.mutate({
      title: title,
      public: isPublic,
      url: `https://meet.jit.si/skillShare-${title}`,
      hostId: Number(userData.id),
    })
    navigate('/yourMeetings')
  }

  return (
    <form onSubmit={handleCreateMeeting} className="meeting-form">
      <label>
        Meeting Title:
        <input type="text" name="title" />
      </label>

      <label>
        Keep Public?
        <input type="checkbox" name="public" />
      </label>

      <button type="submit">Add!</button>
    </form>
  )
}
