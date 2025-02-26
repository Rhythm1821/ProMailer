import mongoose, { Schema } from "mongoose";

const leadSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // phone: { type: String, required: true, unique: true },
    // company: { type: String, required: true },
    // status: {
    //     type: String,
    //     enum: ['Pending', 'Contacted', 'Unresponsive', 'Converted'],
    //     default: 'Pending'
    // }
}, { timestamps: true })

export default mongoose.model('Lead', leadSchema)