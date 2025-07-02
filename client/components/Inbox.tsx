import { Link } from 'react-router-dom'
// Maybe need to fix import file path here?
import { useUserDirectMessages } from '../hooks/useDirectMessages'
import { DirectMessage, User, UserId } from '#models'
import { useAllUsers } from '../hooks/useUsers'
import { DEFAULT_PROFILE_PICTURE } from '#server-constants'

export default function Inbox() {
  // GRAB ALL MESSAGES RELEVANT TO USER
  const {
    myId,
    messages: allMessages,
    isError: isErrorMessages,
    isPending: isPendingMessages,
  } = useUserDirectMessages()

  // GRAB ALL USERS
  const {
    allUsers,
    isPending: isPendingUsers,
    isError: isErrorUsers,
  } = useAllUsers()

  console.log({ allUsers, allMessages })

  const isPending: boolean = isPendingMessages || isPendingUsers
  const isError: boolean = isErrorMessages || isErrorUsers
  const contentFound: boolean =
    Array.isArray(allMessages) &&
    Array.isArray(allUsers) &&
    !!allMessages &&
    !!allUsers

  if (isError) return <p>Error loading messages.</p>
  if (isPending) return <p>Loading messages...</p>
  if (!contentFound) return <p>You have no messages.</p>

  // COMPILE MESSAGES INTO ARRAY OF USABLE OBJECTS
  const messageArray: DirectMessage[] =
    !allMessages || !contentFound ? [] : (allMessages as DirectMessage[])
  const userArray: User[] = !allUsers ? [] : (allUsers as User[])

  console.log({ myId })

  interface InboxObJ {
    otherUser: User
    recentMessageBody: string
  }

  const inbox: InboxObJ[] = []
  for (const currentMessage of messageArray.reverse()) {
    const otherUserId: UserId =
      currentMessage.senderId === myId
        ? currentMessage.receiverId
        : currentMessage.senderId

    const otherUser: User | undefined = userArray.find(
      (user) => user.id === otherUserId,
    )
    if (!otherUser) continue
    if (inbox.find((obj) => obj.otherUser.id === otherUserId) !== undefined) {
      continue
    }

    inbox.push({ otherUser, recentMessageBody: currentMessage.body })
  }

  console.log({ inbox })

  return (
    <>
      <div className="header">
        <h1>Inbox</h1>
      </div>
      <div className="inbox-box">
        {inbox.map((message, i) => {
          return (
            <div className="inbox-message" key={i}>
              <Link to={`/profile/${message.otherUser.id}`}>
                <img
                  src={
                    message.otherUser.profilePicture ?? DEFAULT_PROFILE_PICTURE
                  }
                  alt={`${message.otherUser.name}'s profile`}
                />
              </Link>
              <Link to={`/message/${message.otherUser.id}`}>
                <h1>{message.otherUser.name}</h1>
                <p>{message.recentMessageBody}</p>
              </Link>
            </div>
          )
        })}
      </div>
    </>
  )
}
