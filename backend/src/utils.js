import { configDotenv } from 'dotenv'; 
configDotenv();
import { Agenda } from '@hokify/agenda';
import nodemailer from 'nodemailer'


async function sendMsg(lead, template) {
    try {
        const { email } = lead
        const { subject, content } = template
        const message = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: content
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        const info = await transporter.sendMail(message);
        console.log("Email sent:", info.messageId);
        return info
    } catch (error) {
        throw new Error("Error sending message: " + error.message);
    }
}

let agenda;

async function initializeAgenda() {
    
    if (!agenda) {
        agenda = new Agenda({ db: { address: process.env.MONGODB_URI, collection: 'agendaJobs' } });

        agenda.define('send message', async (job) => {
            const { lead, template } = job.attrs.data;
            await sendMsg(lead, template);
        });

        await agenda.start();
    }
}

async function sendMsgWithDelay(lead, template, delayHours) {
    if (!lead.email || !template.subject || !template.content) {
        throw new Error("Missing required lead or template data");
    }

    if (delayHours <0 || isNaN(delayHours)) {
        throw new Error("Invalid delayTime provided");
    }

    try {
        
        await initializeAgenda();

        const delayTime = delayHours * 60 * 60 * 1000;

        const jobTime = new Date(Date.now() + delayTime);
        
        await agenda.schedule(jobTime, 'send message', { lead, template });

        return true
    } catch (error) {
        console.error("Error scheduling message:", error.message);
        throw error;
    }
}


export { sendMsgWithDelay }