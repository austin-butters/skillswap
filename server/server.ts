import express from 'express'
import * as Path from 'node:path'
import userRoutes from './routes/users'
import questionRoutes from './routes/questions.ts'
import aiRoutes from './routes/ai.ts'
import directMessagesRoutes from './routes/directMessages.ts'
import answerRoutes from './routes/answers.ts'
import friendRoutes from './routes/friends.ts'
import meetingRoutes from './routes/meetings.ts'
import savedMeetingsRoutes from './routes/savedMeetings.ts'
// import checkJwt, { JwtRequest } from './auth0.ts'

const server = express()

server.use(express.json())

// server.use((req, _, next) => {
//   const authorization = req.headers.authorization
//   console.log('Incoming request authorization headers: ', { authorization })
//   next()
// })

// server.use(checkJwt)

// server.use((req: JwtRequest, _, next) => {
//   console.log('Decoded JWT sub: ', req.auth?.sub)
//   next()
// })

server.use('/api/v1/users', userRoutes)
server.use('/api/v1/questions', questionRoutes)
server.use('/api/v1/ai', aiRoutes)
server.use('/api/v1/directMessages', directMessagesRoutes)
server.use('/api/v1/answers', answerRoutes)
server.use('/api/v1/friends', friendRoutes)
server.use('/api/v1/meetings', meetingRoutes)
server.use('/api/v1/savedMeetings', savedMeetingsRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
