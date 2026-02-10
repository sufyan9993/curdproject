import UserModel from "../models/user.model.js"
import bcrypt from 'bcrypt'

export const getAllUsers = async (page, limit, search, sort, sortOrder) => {
    try {
        const skip = (page - 1) * limit

        const filter = {}
        if (search) {
            filter.name = new RegExp(search, 'i')
        }

        const sortBy = {
            [sort]: +sortOrder
        }

        const data = await UserModel.find(filter)
            .sort(sortBy)
            .skip(skip).limit(limit)
        const count = await UserModel.countDocuments(filter)
        // console.log(data)

        const paginated = {
            list: data,
            metaData: {
                totalCount: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                limit: limit
            }
        }
        return paginated
    } catch (err) {
        console.log(err.message)
    }
}



export const createUserService = async (name, age, address, email, password) => {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const data = await UserModel.create({
        name: name,
        age: age,
        address: address,
        email: email,
        password: hashedPassword
    })
    return data
}


export const updateUserByIdService = async (id, body) => {
    const data = await UserModel.findByIdAndUpdate(id, body, { new: true })
    return data
}

export const deleteUserByIdService = async (id) => {
    const data = await UserModel.findByIdAndDelete(id)
    return data
}
export const getUserbyIdService = async (id) => {
    const data = await UserModel.findById(id).populate()
    return data
}


export const findOneUser = async (email) => {
    const user = await UserModel.findOne({ email: email })
    return user
}

export const getGroupedUsersService = async (page, limit) => {

    //$gt $gte $lt $lte
    const skip = (page - 1) * limit


    const users = await UserModel.aggregate([
        { $match: { age: { $gte: 18 } } },
        {
            $sort: {
                totalUsers: -1,
                age: 1
            }
        },
        {
            $lookup: {
                from: "posts",
                localField: "_id",
                foreignField: "user",
                as: 'postsArray'
            }
        },
        {
            $addFields: {
                postCount: { $size: "$postsArray" }
            }
        },
        {
            $project: {
                name: 1,
                age: 1,
                email: 1,
                post: "$postCount"
            }
        },
        {
            $skip: skip
        },
        {
            $limit: Number(limit)
        }
    ])

    console.log(users)
    return users
}