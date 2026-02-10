import { jwt_secret } from "../config/env.js"
import { createUserService, findOneUser } from "../service/user.service.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { STATUS_CODES } from "../../utils/constant.js"
import ApiResponse from "../../utils/response.js"

export const LoginUser = async (req, res) => {
    const { email, password } = req.body

    const user = await findOneUser(email)
    if (!user) {
        return ApiResponse.error(req, res, STATUS_CODES.NOT_FOUND, 'User Not Found')
    }

    const isPassMatch = await bcrypt.compare(password, user.password);
    console.log(isPassMatch)
    if (isPassMatch == false) {
        return ApiResponse.error(req, res, STATUS_CODES.BAD_REQUEST, 'Password Not match')
    }

    const token = jwt.sign({ id: user.id, email: user.email }, jwt_secret)



    return ApiResponse.success(req, res, STATUS_CODES.SUCCESS, 'Login successfully', token)

}



export const signup = async (req, res) => {
    const { name, age, address, email, password } = req.body
    const user = await createUserService(name, age, address, email, password)

    const token = jwt.sign({ id: user._id, email: user.email }, jwt_secret)

    return ApiResponse.success(req, res, STATUS_CODES.CREATED, 'SignUp successfully', token)

}