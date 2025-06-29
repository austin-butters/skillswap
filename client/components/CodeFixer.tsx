import { JWT } from '#models'
import { useAuth0 } from '@auth0/auth0-react'
import { getAiResponse } from 'client/api/ai'
import { useState } from 'react'

export default function CodeFixer() {
  const { getAccessTokenSilently } = useAuth0()
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: '10vw',
        }}
      >
        <div
          style={{
            backgroundColor: 'gray',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '30vw',
            height: '60vh',
            padding: '2vw',
            borderRadius: '10px',
          }}
        >
          <input
            type="text"
            style={{
              width: '100%',
              height: '75%',
              backgroundColor: 'lightgray',
              borderRadius: '10px',
            }}
            onChange={(e) => {
              setInput(e.target.value)
            }}
            onKeyDown={async (e) => {
              if (e.key === 'Enter') {
                const token: JWT = await getAccessTokenSilently()
                const response = await getAiResponse(input, token)
                setResponse(response)
              }
            }}
          />
          <button
            style={{
              backgroundColor: 'white',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              padding: '5px 20px',
              borderRadius: '10px',
            }}
            onClick={async () => {
              const token: JWT = await getAccessTokenSilently()
              const response = await getAiResponse(input, token)
              setResponse(response)
            }}
          >
            Fix Now!
          </button>
        </div>
        <div
          style={{
            backgroundColor: 'gray',
            width: '30vw',
            height: '60vh',
            padding: '2vw',
            borderRadius: '10px',
            color: 'white',
          }}
        >
          <p>{response}</p>
        </div>
      </div>
    </>
  )
}
