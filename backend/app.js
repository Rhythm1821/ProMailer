import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import mongoose from 'mongoose'
import { addLead, getAllLeads } from './src/controllers/list.controller.js'
import { addTemplate, getAllTemplates } from './src/controllers/template.controller.js'
import { addWorkflow, getWorkflows } from './src/controllers/workflow.controller.js'
import { initializeAgenda } from './src/utils.js'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI + '/' + process.env.DB_NAME)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
    }
}

const app = express()
app.use(express.json());
app.use(cors())
connectDB()
initializeAgenda().then(() => console.log('Agenda initialized'))

app.get('/api/test', (req, res) => {
    res.send({msg: 'Hello World!'})
})

app.get('/api/leads', getAllLeads)
app.post('/api/leads', addLead)

app.get('/api/templates', getAllTemplates)
app.post('/api/templates', addTemplate)

app.post('/api/workflows', addWorkflow)
app.get('/api/workflows', getWorkflows)

app.listen(3000, () => {
    console.log('Server running on port 3000')
})