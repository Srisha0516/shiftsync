"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../config/env");
const transporter = nodemailer_1.default.createTransport({
    host: env_1.config.smtp.host,
    port: env_1.config.smtp.port,
    secure: env_1.config.smtp.port === 465,
    auth: {
        user: env_1.config.smtp.user,
        pass: env_1.config.smtp.pass,
    },
});
const sendEmail = async (to, subject, text, html) => {
    if (!env_1.config.smtp.user) {
        console.warn(`[SendEmail Mock] To: ${to} | Subject: ${subject}`);
        return;
    }
    try {
        await transporter.sendMail({
            from: `"ShiftSync" <${env_1.config.smtp.user}>`,
            to,
            subject,
            text,
            html
        });
    }
    catch (error) {
        console.error('Email sending failed:', error);
    }
};
exports.sendEmail = sendEmail;
