import jwt from 'jsonwebtoken'
import { findOneUser } from '../service/user.service.js'

export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(400).json({ message: 'invalid token' })
    }
    const data = jwt.verify(token, 'slkdfsldkfjsl2eoisdfsdfk')

    const user = await findOneUser(data.email)

    if (!user) {
        return res.status(400).json({ message: 'unauthorized user' })
    }
    
    req.user = user
    next()

}   