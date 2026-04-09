import nodemailer from 'nodemailer';
import { config } from '../config/env';

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.port === 465,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
});

export const sendEmail = async (to: string, subject: string, text: string, html?: string) => {
  if (!config.smtp.user) {
    console.warn(`[SendEmail Mock] To: ${to} | Subject: ${subject}`);
    return;
  }
  
  try {
    await transporter.sendMail({
      from: `"ShiftSync" <${config.smtp.user}>`,
      to,
      subject,
      text,
      html
    });
  } catch (error) {
    console.error('Email sending failed:', error);
  }
};
