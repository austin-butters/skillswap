import { getAiResponse } from '../api/ai.ts'
import { useState } from 'react'

export default function CodeFixer() {
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
                  const result = await getAiResponse(input)
                  setResponse(result)
                }
              }}
            />
          </div>
          <div>
            <button
              className="fix-button"
              onClick={async () => {
                const result = await getAiResponse(input)
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
