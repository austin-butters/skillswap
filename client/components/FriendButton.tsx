import {
  useAddFriend,
  useGetStatus,
  useUnaddFriend,
} from 'client/hooks/useFriends'

export default function FriendButton({
  userId,
  requestId,
}: {
  userId: number
  requestId: number
}) {
  const { data: friendStatus } = useGetStatus(userId, requestId)

  const addFriend = useAddFriend()
  const unaddFriend = useUnaddFriend()

  function handleFriendRequest() {
    addFriend.mutate({
      userId: Number(userId),
      requestId: Number(requestId),
    })
  }

  function handleUnfriendRequest() {
    unaddFriend.mutate({
      userId: Number(userId),
      requestId: Number(requestId),
    })
  }

  if (!friendStatus) {
    return <button>Loading...</button>
  }
  if (friendStatus === 'friends') {
    return <button onClick={() => handleUnfriendRequest()}>Unfriend</button>
  } else if (friendStatus === 'sent') {
    return <button onClick={() => handleUnfriendRequest()}>Cancel</button>
  } else if (friendStatus === 'received') {
    return <button onClick={() => handleFriendRequest()}>Accept</button>
  } else if (friendStatus === 'none') {
    return <button onClick={() => handleFriendRequest()}>Add</button>
  } else {
    return <button>Error...</button>
  }
}
