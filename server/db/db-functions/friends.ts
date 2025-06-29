import db from '../connection'

export async function addFriend(userId: number, addedFriendId: number) {
  await db('friends').insert({
    user_id: userId,
    added_friend_id: addedFriendId,
  })
}
