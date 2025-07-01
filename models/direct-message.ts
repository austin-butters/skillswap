import { UserId } from '#models'

export type MessageId = number
export type Timestamp = string

export interface UnassignedDirectMessage {
  senderId: UserId
  receiverId: UserId
  time: Timestamp
  body: string
}

export interface DirectMessage extends UnassignedDirectMessage {
  id: MessageId
}

export interface DBDirectMessage {
  readonly id: MessageId
  readonly sender_id: UserId
  readonly receiver_id: UserId
  readonly time: Timestamp
  readonly body: string
}
