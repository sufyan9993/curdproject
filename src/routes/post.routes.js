

import express from 'express'
import { createPostController, deletePost, getPostController } from '../controller/post.controller.js'
import { verifyToken } from '../middlewares/verifyToken.js'
import upload from '../middlewares/multer.js'

const postRouter = express.Router()

postRouter.post('/create-post', verifyToken, upload.single('image'), createPostController)
postRouter.delete('/delete-post/:id', verifyToken, deletePost)

postRouter.get('/get-posts', verifyToken, getPostController)

export default postRouter