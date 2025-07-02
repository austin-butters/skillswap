import { useAuth0 } from '@auth0/auth0-react'
import {
  useGetDirectMessages,
  useSendDirectMessage,
} from '../hooks/useDirectMessages'
import { useAuth0Id, useUserById } from '../hooks/useUsers'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import FriendButton from './FriendButton'
import { useGetUsersMeetings } from '../hooks/useMeetings'
import { MeetingData } from '#models'

export default function MessageBox() {
  const [message, setMessage] = useState('')

  const { user } = useAuth0()

  const { data: userData } = useAuth0Id(user?.sub)

  const { id } = useParams()

  const { user: otherUserData } = useUserById(Number(id))

  const { data: messageData } = useGetDirectMessages(
    Number(userData?.id),
    Number(id),
  )

  const { data: meetingData } = useGetUsersMeetings(userData?.id)

  const sendDirectMessage = useSendDirectMessage()

  function handleSendMessage() {
    sendDirectMessage.mutate({
      userId: Number(userData.id),
      receiverId: Number(id),
      time: new Date().toISOString(),
      body: String(message),
    })
  }

  function sendMeetingMessage(mettingUrl: string) {
    sendDirectMessage.mutate({
      userId: Number(userData.id),
      receiverId: Number(id),
      time: new Date().toISOString(),
      body: `Come join my meeting! ${mettingUrl}`,
    })
  }

  if (
    !messageData ||
    !userData ||
    userData === undefined ||
    !otherUserData ||
    !meetingData
  ) {
    return <p>Loading...</p>
  }

  return (
    <>
      <div className="cc">
        {/* Chat Window */}
        <div className="chat-window">
          <div className="chat-messages">
            {messageData.map((message, i) => {
              const isUser = message.sender_id === userData.id
              return (
                <div
                  key={i}
                  className={`chat-message ${isUser ? 'sent' : 'received'}`}
                >
                  {!isUser && (
                    <img
                      alt="profile"
                      src={otherUserData.profilePicture}
                      className="chat-avatar"
                    />
                  )}
                  <p className="chat-text">{message.body}</p>
                  {isUser && (
                    <img
                      alt="profile"
                      src={userData.profilePicture}
                      className="chat-avatar"
                    />
                  )}
                </div>
              )
            })}
          </div>
          <input
            type="text"
            placeholder="Enter message here"
            className="chat-input"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage()
              }
            }}
          />
        </div>

        {/* Sidebar */}
        <div className="chat-sidebar">
          <h1 className="sidebar-name">{otherUserData.name}</h1>
          <p className="sidebar-bio">
            {otherUserData.bio || 'This user doesn’t have a bio...'}
          </p>
          <FriendButton userId={userData.id} requestId={otherUserData.id} />
          <h2 className="meeting-heading">Invite to meeting</h2>
          <ul className="meeting-list">
            {meetingData.map((message: MeetingData, i: number) => (
              <button
                key={`Meeting ${i}`}
                className="meeting-button"
                onClick={() => sendMeetingMessage(message.url)}
              >
                {message.title}
              </button>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
