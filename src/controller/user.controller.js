import uploadSingleImage from "../../utils/uploadImage.js"
import { createUserService, deleteUserByIdService, getAllUsers, getGroupedUsersService, getUserbyIdService, updateUserByIdService } from "../service/user.service.js"


export const getUser = async (req, res) => {
    console.log('inside the get api ')
    const { page, limit, search, sort, sortOrder } = req.query
    console.log(search)

    const user = await getAllUsers(page, limit, search, sort, sortOrder)
    return res.json({ success: true, data: user })
}

export const getSingleUser = async (req, res) => {
    console.log('inside the get api ')
    const user = await getUserbyIdService(req.params.id)
    console.log(user)
    return res.json({ success: true, data: user })
}

export const createUser = async (req, res) => {
    const { name, age, address, email, password } = req.body
    if (!name || !age || !address) {
        return res.status(400).json({ message: 'name, age, address required' })
    }
    const data = await createUserService(name, age, address, email, password)

    return res.json({ success: true, user: data })
}

export const updateUser = async (req, res) => {
    const userId = req.params.id

    const data = await updateUserByIdService(userId, req.body)
    return res.json({ success: true, user: data })
}


export const deleteUser = async (req, res) => {
    const userId = req.params.id

    const data = await deleteUserByIdService(userId)
    return res.json({ success: true, user: data })
}



export const uploadImage = async (req, res) => {

    const data = await uploadSingleImage(req.file)

    return res.json({ success: true, url: data.secure_url })
}

export const getGroupedUser = async (req, res) => {
    const result = await getGroupedUsersService(req.query.page,req.query.limit)
    return res.json({ success: true, data: result })
}