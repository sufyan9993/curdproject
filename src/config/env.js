import dotenv from 'dotenv'

dotenv.config()


export const PORT = process.env.PORT
export const dbUrl = process.env.DB_URL
export const jwt_secret = process.env.JWT_SECRET
export const cloud_name = process.env.CLOUD_NAME

export const cloudinar_api_key = process.env.CLOUDINAR_API_KEY
export const cloudinary_secret_key = process.env.CLOUDINAR_SECRET_KEY