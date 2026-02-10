import express from 'express'
import routes from './routes/user.routes.js'
import ConnectDB from './config/connectDb.js'
import { PORT } from './config/env.js'
import AuthRouter from './routes/auth.routes.js'
import postRouter from './routes/post.routes.js'

const server = express()

const port = PORT

server.use(express.json())

server.use('/user', routes)
server.use('/post', postRouter)
server.use('/auth', AuthRouter)

server.listen(port, () => {
    console.log('server started successfully at port:', port)
    ConnectDB()
})