import nodemailer from "nodemailer";

async function sendEmails(options){ //We need the email address where we want to send an email to, the subject line, the email content, etc.
    // 1) Create a transporter. This is a service that will actually send the email, becasue it's not node.js that will actually send the email itself. 
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        logger: true,        
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // 2) We need to define email options 
        const mailOptions = {
            from: "German <german@gmail.com>",
            to: options.email,
            subject: options.subject,
            text: options.message,
            // html: 
        }

    // 3) Send the email
    await transporter.sendMail(mailOptions); //This always returns a promise 
}

export {sendEmails}

// Enter here ---> https://mailtrap.io/inboxes/2590364/messages/4016727448