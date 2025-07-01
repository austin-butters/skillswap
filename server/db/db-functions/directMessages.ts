import { DBDirectMessage, DirectMessage, UserId } from '#models'
import db from '../connection'

const directMessageFeildsToCamelCase: (keyof DirectMessage | string)[] = [
  'id',
  'sender_id as senderId',
  'receiver_id as receiverId',
  'time',
  'body',
]

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

export async function sendDirectMessage(
  userId: number,
  receiverId: number,
  time: string,
  body: string,
) {
  const dbFormattedDirectMessage: Partial<DBDirectMessage> = {
    sender_id: userId,
    receiver_id: receiverId,
    time: time,
    body: body,
  }
  return await db('direct_messages')
    .insert(dbFormattedDirectMessage)
    .returning('*')
}

export async function getDirectMessagesByUser(
  userId: UserId,
): Promise<DirectMessage[]> {
  return (await db('direct_messages')
    .where({ sender_id: userId })
    .orWhere({ receiver_id: userId })
    .select(...directMessageFeildsToCamelCase)) as DirectMessage[]
}
