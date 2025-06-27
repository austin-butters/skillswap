import db from '../connection'

export async function getDirectMessages(userId: number, otherId: number) {
  return await db('direct_messages')
    .where(function () {
      this.where({ sender_id: userId, receiver_id: otherId }).orWhere({
        sender_id: otherId,
        receiver_id: userId,
      })
    })
    .orderBy('time', 'asc')
    .select('*')
}
