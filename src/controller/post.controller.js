import uploadSingleImage from "../../utils/uploadImage.js"
import { createPostService, getPostsService } from "../service/post.service.js"


export const createPostController = async (req, res) => {
    const imageData = await uploadSingleImage(req.file, "postImages")

    const payload = {
        title: req.body.title,
        image_url: imageData.secure_url,
        user: req.user._id
    }
    const data = await createPostService(payload)
    res.json({ success: true, data: data })
}


export const getPostController = async (req, res) => {

    const data = await getPostsService(req.user._id)
    res.json({ success: true, data })
}