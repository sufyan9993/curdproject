import express from 'express'
import { LoginUser, signup } from '../controller/auth.controller.js'


const AuthRouter = express.Router()


AuthRouter.post('/login', LoginUser)
AuthRouter.post('/signup', signup)

export default AuthRouter