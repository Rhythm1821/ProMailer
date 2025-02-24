import mongoose, { Schema } from "mongoose";

const delaySchema = new Schema({
    workflow: { type: Schema.Types.ObjectId, ref: 'Workflow' },
    delayType:  { type: String, enum: ['Days', 'Hours', 'Minutes'], required: true },   
    delayTime: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('Delay', delaySchema);
