import mongoose, { Schema } from 'mongoose'

const templateSchema = new Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    content: { type: String, required: true },
    placeholders: { type: [String], required: false },
}, { timestamps: true })

export default mongoose.model('Template', templateSchema)