import express from 'express'
import * as Path from 'node:path'
import userRoutes from './routes/users'
import questionRoutes from './routes/questions.ts'
import aiRoutes from './routes/ai.ts'
import directMessagesRoutes from './routes/directMessages.ts'
import answerRoutes from './routes/answers.ts'
import friendRoutes from './routes/friends.ts'

const server = express()

server.use(express.json())

server.use('/api/v1/users', userRoutes)
server.use('/api/v1/questions', questionRoutes)
server.use('/api/v1/ai', aiRoutes)
server.use('/api/v1/directMessages', directMessagesRoutes)
server.use('/api/v1/answers', answerRoutes)
server.use('/api/v1/friends', friendRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
