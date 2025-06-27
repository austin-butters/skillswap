import { useAuth0 } from '@auth0/auth0-react'
import { useGetDirectMessages } from 'client/hooks/useDirectMessages'
import { useAuth0Id } from 'client/hooks/useUsers'
import { useParams } from 'react-router-dom'

export default function MessageBox() {
  const { user } = useAuth0()

  const { data: userData } = useAuth0Id(user?.sub)

  const { id } = useParams()

  const { data: messageData } = useGetDirectMessages(
    Number(userData?.id),
    Number(id),
  )

  if (!messageData || !userData || userData === undefined) {
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
                    <img
                      alt="your pfp"
                      src={user?.picture}
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
                    <p>{message.body}</p>
                    <img
                      alt="your pfp"
                      src={user?.picture}
                      style={{
                        width: '50px',
                        aspectRatio: '1 / 1',
                        objectFit: 'cover',
                        borderRadius: '5px',
                        marginRight: '10px',
                      }}
                    />
                  </div>
                )
              }
            })}
          </div>
          <input
            type="text"
            placeholder="Enter message here"
            style={{ width: '90%', padding: '10px 20px', borderRadius: '10px' }}
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
          <h1 style={{ fontWeight: 'bold', fontSize: '2rem' }}>Name</h1>
          <p>This is the bio I guess?</p>
        </div>
      </div>
    </>
  )
}
