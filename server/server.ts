import express from 'express'
import * as Path from 'node:path'
import userRoutes from './routes/users'
import questionRoutes from './routes/questions.ts'

const server = express()

server.use(express.json())

server.use('/api/v1/users', userRoutes)
server.use('/api/v1/questions', questionRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
