import mongoose, { Schema } from "mongoose";

const delaySchema = new Schema({
    workflow: { type: Schema.Types.ObjectId, ref: 'Workflow' }, 
    delayTime: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('Delay', delaySchema);
