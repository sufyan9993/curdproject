import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    image_url: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})


const PostModel = mongoose.model('post', postSchema)

export default PostModel