import { useAuth0 } from '@auth0/auth0-react'
import { useCreateMeeting } from 'client/hooks/useMeetings'
import { useAuth0Id } from 'client/hooks/useUsers'

export default function CreateMeeting() {
  const addMeeting = useCreateMeeting()

  const { user } = useAuth0()

  const { data: userData } = useAuth0Id(user?.sub)

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
  }

  return (
    <form onSubmit={handleCreateMeeting}>
      <label>
        Meeting Title:
        <input type="text" name="title" />
      </label>

      <label>
        Keep Public?
        <input type="checkbox" name="public" />
      </label>
      <button>Add!</button>
    </form>
  )
}
