import mongoose from "mongoose"
import 'dotenv/config'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI + '/' + process.env.DB_NAME).then(() => {
            console.log('Connected to DB')
        })
    } catch (error) {
        console.log("MongoDB connection error",error.message)
        process.exit(1)
    }
}

export default connectDB