import request from 'superagent'

const rootURL = new URL('/api/v1', document.baseURI)

export async function getAiResponse(userInput: string) {
  const response = await request.get(`${rootURL}/ai?prompt=${userInput}`)
  return `${response.body[0].content.parts[0].text}`
}
