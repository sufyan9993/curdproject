import PostModel from "../models/post.model.js"

export const createPostService = async (payload) => {
    const post = await PostModel.create(payload)
    return post
}

export const getPostsService = async (userId) => {
    const post = await PostModel.find({ user: userId }).populate('user', 'name email')
    return post
}