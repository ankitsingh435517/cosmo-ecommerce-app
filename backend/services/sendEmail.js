import nodemailer from 'nodemailer';
import {SMTP_HOST, SMTP_PORT, SMTP_EMAIL, SMTP_PASSWORD,
    SMTP_FROM_NAME, SMTP_FROM_EMAIL } from '../config';

const sendEmail = async options =>{
     const transporter = nodemailer.createTransport({
         host: SMTP_HOST,
         port: SMTP_PORT,
         auth: {
             user: SMTP_EMAIL,
             pass: SMTP_PASSWORD 
         }
     });

     await transporter.sendMail({
         from: `${SMTP_FROM_NAME} <${SMTP_FROM_EMAIL}>`,
         to: options.email,
         subject: options.subject,
         text:"cosmo recovery Mail, If you have not requested for this email, then ignore it",
         html:`
         <h2>You requested for password recovery</h2>
         <h5>go to this link, <a href="${options.resetUrl}">click</a> on it to reset your password</h5>
         `
     })
}

export default sendEmail;