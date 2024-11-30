import { sendMsgWithDelay } from "../utils.js";
import workflowModel from "../models/workflow.model.js";

export async function addWorkflow(request, response) {
    try {
        const { nodes, edges, lead, template, delay } = request.body        

        if (!nodes || !edges) {
            return response.status(400).json({ msg: 'All fields are required' })
        }
        const existingWorkflow = await workflowModel.findOne({ lead, template, delay, nodes, edges })
        if (existingWorkflow) {
            return response.json({ msg: 'Workflow saved already' })
        }
        const newWorkflow = await workflowModel.create({
            lead,
            template,
            delay,
            nodes,
            edges
        })
        const isScheduled = await sendMsgWithDelay(lead, template, delay)
        if (isScheduled) {
            await newWorkflow.save()
            return response.json({ msg: 'workflow added. Template is scheduled!!' })
        }

        return response.json({ msg: 'Something went wrong' })
    } catch (error) {
        throw new Error("Error adding workflow: " + error.message);
    }
    
}

export async function getWorkflows(request, response) {
    try {
        const allWorkflows = await workflowModel.find()

        if (allWorkflows.length === 0) {
            return response.json({ msg: 'No workflows found' })
        }
        return response.json({ allWorkflows })
    } catch (error) {
        return response.status(500).json("Error getting workflows: " + error.message);
    }
}