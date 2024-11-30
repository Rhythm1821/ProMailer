import mongoose, { Schema } from "mongoose";

const listSchema = new Schema({
    name: { type: String, required: true },
    leads: [{ type: Schema.Types.ObjectId, ref: 'Lead' }],
}, { timestamps: true });

export default mongoose.model('List', listSchema);
