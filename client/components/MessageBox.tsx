import { useAuth0 } from '@auth0/auth0-react'
import {
  useGetDirectMessages,
  useSendDirectMessage,
} from 'client/hooks/useDirectMessages'
import { useAuth0Id, useUserById } from 'client/hooks/useUsers'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import FriendButton from './FriendButton'

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

  const sendDirectMessage = useSendDirectMessage()

  function handleSendMessage() {
    sendDirectMessage.mutate({
      userId: Number(userData.id),
      receiverId: Number(id),
      time: 'idk lol',
      body: String(message),
    })
  }

  if (!messageData || !userData || userData === undefined || !otherUserData) {
    return <p>Loading...</p>
  }

  return (
    <>
      <div style={{ display: 'flex', marginTop: '10vh' }}>
        <div
          style={{
            backgroundColor: 'gray',
            width: '50vw',
            padding: '30px',
            borderRadius: '20px',
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '90%',
              overflowY: 'scroll',
              scrollbarWidth: 'none',
              scrollBehavior: 'smooth',
              width: '100%',
              justifyContent: 'end',
            }}
          >
            {messageData.map((message, i) => {
              if (message.sender_id === userData.id) {
                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignSelf: 'end',
                      marginBottom: '10px',
                      alignItems: 'center',
                    }}
                  >
                    <p>{message.body}</p>
                    <img
                      alt="your pfp"
                      src={userData.profilePicture}
                      style={{
                        width: '50px',
                        aspectRatio: '1 / 1',
                        objectFit: 'cover',
                        borderRadius: '5px',
                        marginLeft: '10px',
                      }}
                    />
                  </div>
                )
              } else {
                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignSelf: 'start',
                      marginBottom: '10px',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      alt="your pfp"
                      src={otherUserData.profilePicture}
                      style={{
                        width: '50px',
                        aspectRatio: '1 / 1',
                        objectFit: 'cover',
                        borderRadius: '5px',
                        marginRight: '10px',
                      }}
                    />
                    <p>{message.body}</p>
                  </div>
                )
              }
            })}
          </div>
          <input
            type="text"
            placeholder="Enter message here"
            style={{ width: '90%', padding: '10px 20px', borderRadius: '10px' }}
            onChange={(e) => {
              setMessage(e.target.value)
            }}
            onKeyDown={async (e) => {
              if (e.key === 'Enter') {
                handleSendMessage()
              }
            }}
          />
        </div>
        <div
          style={{
            backgroundColor: 'gray',
            width: '25vw',
            marginLeft: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <h1 style={{ fontWeight: 'bold', fontSize: '2rem' }}>
            {otherUserData.name}
          </h1>
          {!otherUserData.bio ? (
            <p>This user doesnt have a bio...</p>
          ) : (
            <p>{otherUserData.bio}</p>
          )}
          <FriendButton userId={userData.id} requestId={otherUserData.id} />
        </div>
      </div>
    </>
  )
}
