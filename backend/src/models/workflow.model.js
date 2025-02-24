import mongoose, { Schema } from "mongoose";


const workflowSchema = new Schema({
    lead: { type: Schema.Types.ObjectId, ref: 'Lead', required: true },
    template: { type: Schema.Types.ObjectId, ref: 'Template', required: true },
    delay: { type: Schema.Types.ObjectId, ref: 'Delay', required: true },
    nodes: { type: [Object], required: true },
    edges: { type: [Object], required: true },
}, { timestamps: true });

export default mongoose.model('Workflow', workflowSchema);
