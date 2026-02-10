import mongoose from "mongoose"
import { dbUrl } from "./env.js"

const ConnectDB = async () => {
    try {
        await mongoose.connect(dbUrl)
        console.log('database connect!')

    } catch (err) {
        console.log(err.message)
    }
}
export default ConnectDB 