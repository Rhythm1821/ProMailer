import leadModel from "../models/lead.model.js"

export async function getAllLeads(request, response) {
    try {
        const allLeads = await leadModel.find()
        return response.json({ allLeads })
    } catch (error) {
        return response.status(500).json("Error getting leads: " + error.message);
    }
}

export async function addLead(request, response) {

    try {
        const { name, email, phone, company, status } = request.body

        if (!name || !email || !phone || !company) {
            return response.status(400).json({ msg: 'All fields are required' })
        }
        const newLead = await leadModel.create({
            name,
            email,
            phone,
            company,
            status: status || 'Pending'
        })

        await newLead.save()

        return response.json({ msg: 'lead added!!', newLead })
    } catch (error) {
        return response.status(500).json("Error adding lead: " + error.message);
    }
}