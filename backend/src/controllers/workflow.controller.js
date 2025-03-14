import { sendMsgWithDelay } from "../utils.js";
import workflowModel from "../models/workflow.model.js";

export async function addWorkflow(request, response) {
    try {
        const { nodes, edges, lead, templates } = request.body;
        if (!nodes || !edges) {
            return response.status(400).json({ msg: 'Nodes and edges are required' });
        }

        const existingWorkflow = await workflowModel.findOne({ lead, nodes, edges });
        if (existingWorkflow) {
            return response.json({ msg: 'Workflow already saved' });
        }

        const newWorkflow = await workflowModel.create({ lead, nodes, edges });

        // Step 1: Build a node lookup
        const allNodes = [...nodes, ...templates];

        const nodeMap = allNodes.reduce((acc, node) => {
            acc[node.id] = node;
            return acc;
        }, {});

        // Step 2: Identify the starting point (leadNode)
        const startNode = nodes.find(node => node.type === 'leadNode');
        if (!startNode) {
            return response.status(400).json({ msg: 'No lead node found' });
        }


        // Step 3: Construct the sequence based on edges
        let currentNode = startNode;
        let totalDelay = 0;
        let delayType = []

        while (currentNode) {
            

            const nextEdge = edges.find(edge => edge.source === currentNode.id);
            if (!nextEdge) break;

            const nextNode = nodeMap[nextEdge.target];
            if (!nextNode) break;

            if (nextNode.type === 'delayNode') {
                const delayMinutes = parseInt(nextNode.data.label, 10) || 0;
                totalDelay += delayMinutes;
                delayType.push(nextNode.data.delayType);
            } else if (nextNode.type === 'templateNode') {
                const templateData = templates.find(t => t.name === nextNode.data.label);
                if (!templateData) {
                    console.error("Template not found:", nextNode.data.label);
                    return response.status(400).json({ msg: `Template ${nextNode.data.label} not found` });
                }

                await sendMsgWithDelay(lead, templateData, totalDelay,delayType.pop());

            }

            currentNode = nextNode;
        }


        await newWorkflow.save();
        return response.json({ msg: 'Workflow added and messages scheduled!' });

    } catch (error) {
        console.error("Error adding workflow:", error);
        return response.status(500).json({ msg: 'Internal Server Error' });
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
        throw new Error("Error getting workflows: " + error.message);
    }
}

export async function deleteWorkflow(request, response) {
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
        throw new Error("Error deleting workflow: " + error.message);
    }
}

export async function deleteAllWorkflows(request, response) {
    try {
        await workflowModel.deleteMany()
        return response.json({ msg: 'All workflows deleted' })
    } catch (error) {
        throw new Error("Error deleting all workflows: " + error.message);
    }
}