import { GetCodeFixData, JWT } from '#models'
import { useAuth0 } from '@auth0/auth0-react'
import { getAiResponse } from '../api/ai'
import { useAddAiResponse, useGetUsersCodeFixes } from '../hooks/useAi'
import { useAuth0Id } from '../hooks/useUsers'
import { useState } from 'react'

export default function CodeFixer() {
  const { getAccessTokenSilently, user } = useAuth0()
  const [questionTitle, setQuestionTitle] = useState('')
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const { data: userData } = useAuth0Id(user?.sub)

  const { data: pastFixes } = useGetUsersCodeFixes(userData?.id)
  const addAiResponse = useAddAiResponse()

  if (!userData || !pastFixes) {
    return <p>Loading...</p>
  }

  return (
    <>
      <div className="ai-container">
        {/* Input Card */}
        <div className="input-section">
          <input
            type="text"
            placeholder="Ask your question here..."
            onChange={(e) => setQuestionTitle(e.target.value)}
            className="ai-title-container"
          />
          <div className="input-wrapper" style={{ width: '100%', flex: 1 }}>
            <textarea
              className="input-box"
              placeholder="Paste code here..."
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div>
            <button
              className="fix-button"
              onClick={async () => {
                const token: JWT = await getAccessTokenSilently()
                setResponse('Thinking...')
                const result = await getAiResponse(questionTitle, input, token)
                setResponse(result)
                addAiResponse.mutate({
                  userId: userData.id,
                  title: questionTitle,
                  input: input,
                  output: result,
                })
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
        {/* Previous fixes */}
        <div>
          {pastFixes.length === 0 ? (
            <p>Ask a question to see your past responses!</p>
          ) : (
            pastFixes.map((data: GetCodeFixData) => {
              return (
                <div key={`Past response ${data.id}`}>
                  <h1>{data.title}</h1>
                  <p>{data.input}</p>
                  <h1>Ai response:</h1>
                  <p>{data.output}</p>
                </div>
              )
            })
          )}
        </div>
      </div>
    </>
  )
}
