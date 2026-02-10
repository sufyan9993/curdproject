import express from 'express'
import { getUser, createUser, updateUser, deleteUser, getSingleUser, uploadImage, getGroupedUser } from '../controller/user.controller.js'
import { verifyToken } from '../middlewares/verifyToken.js'
import upload from '../middlewares/multer.js'


const routes = express.Router()



routes.get('/getuser', verifyToken, getUser)

routes.get('/getuser/:id', verifyToken, getSingleUser)

routes.post('/createUser', verifyToken, createUser)

routes.put('/updateUser/:id', verifyToken, updateUser)

routes.delete('/deleteUser/:id', verifyToken, deleteUser)

routes.post('/uploadImage', upload.single('profile'), uploadImage)

routes.get('/getGroupedUsers', verifyToken, getGroupedUser)



export default routes