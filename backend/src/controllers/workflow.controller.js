import { sendMsgWithDelay } from "../utils.js";
import workflowModel from "../models/workflow.model.js";

export async function addWorkflow(request, response) {
    try {
        const { nodes, edges, lead, template, delay, delayType } = request.body        

        if (!nodes || !edges) {
            return response.status(400).json({ msg: 'No workflow found' })
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

export async function deleteWorkflow(request,response) {
    try {
        const { id } = request.params
        if (!id) {
            await deleteAllWorkflows(request, response)
            return response.json({ msg: 'All workflows deleted' })
        }
        const workflow = await workflowModel.findById(id)
        if (!workflow) {
            return response.status(404).json({ msg: 'Workflow not found' })
        }
        await workflow.delete()
        return response.json({ msg: 'Workflow deleted' })
    } catch (error) {
        return response.status(500).json("Error deleting workflow: " + error.message);
    }
}

export async function deleteAllWorkflows(request, response) {
    try {
        await workflowModel.deleteMany()
        return response.json({ msg: 'All workflows deleted' })
    } catch (error) {
        return response.status(500).json("Error deleting all workflows: " + error.message);
    }
}