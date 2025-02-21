import templateModel from "../models/template.model.js";

export async function getAllTemplates(request, response) {
    try {
        const allTemplates = await templateModel.find()
        return response.json({ allTemplates })
    } catch (error) {
        throw new Error("Error getting templates: " + error.message);
        
    }
}

export async function addTemplate(request, response) {
    try {
        const { name, subject, content, placeholders } = request.body

        if (!name || !subject || !content) {
            return response.status(400).json({ msg: 'All fields are required. Name, subject and content.' })
        }

        const newTemplate = await templateModel.create({
            name,
            subject,
            content,
            placeholders
        })
        await newTemplate.save()
        return response.json({ msg: 'template added!!', newTemplate })
    } catch (error) {
        throw new Error("Error adding template: " + error.message);
    }
}