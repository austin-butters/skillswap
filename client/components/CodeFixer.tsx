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
      <div className="ai-container">
        {/* Input Card */}
        <div className="input-section">
          <div className="input-wrapper" style={{ width: '100%', flex: 1 }}>
            <textarea
              className="input-box"
              placeholder="Enter your code or text here..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={async (e) => {
                if (e.key === 'Enter') {
                  const token: JWT = await getAccessTokenSilently()
                  const result = await getAiResponse(input, token)
                  setResponse(result)
                }
              }}
            />
          </div>
          <div>
            <button
              className="fix-button"
              onClick={async () => {
                const token: JWT = await getAccessTokenSilently()
                const result = await getAiResponse(input, token)
                setResponse(result)
              }}
            >
              Fix Now!
            </button>
          </div>
        </div>

        {/* Response Card */}
        <div className="response-section">
          <div className="response-box">
            <p>{response}</p>
          </div>
        </div>
      </div>
    </>
  )
}
