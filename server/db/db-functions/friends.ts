import db from '../connection'

export async function addFriend(userId: number, addedFriendId: number) {
  await db('friends').insert({
    user_id: userId,
    added_friend_id: addedFriendId,
  })
}

export async function unaddFriend(userId: number, addedFriendId: number) {
  await db('friends')
    .where({ user_id: userId, added_friend_id: addedFriendId })
    .del()
}

type FriendshipStatus = 'none' | 'sent' | 'received' | 'friends'

export async function checkStatus(
  userId: number,
  addedFriendId: number,
): Promise<FriendshipStatus> {
  const sentRequest = await db('friends')
    .where({
      user_id: userId,
      added_friend_id: addedFriendId,
    })
    .first()

  const receivedRequest = await db('friends')
    .where({
      user_id: addedFriendId,
      added_friend_id: userId,
    })
    .first()

  if (sentRequest && receivedRequest) {
    return 'friends'
  } else if (sentRequest && !receivedRequest) {
    return 'sent'
  } else if (!sentRequest && receivedRequest) {
    return 'received'
  } else {
    return 'none'
  }
}
