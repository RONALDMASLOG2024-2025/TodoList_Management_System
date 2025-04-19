const nodemailer = require('nodemailer');
require('dotenv').config();

const sendReminderEmail = async (toEmail, taskTitle, taskTime) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"DoodleDo 🦤" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `⏰ Reminder: ${taskTitle}`,
    text: `Hey! Don't forget your task: "${taskTitle}" at ${taskTime}.`,
    html: `<strong>Hey! Don't forget your task: "${taskTitle}" at ${taskTime}.</strong>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${toEmail}`);
  } catch (error) {
    console.error('❌ Email send error:', error);
  }
};

module.exports = sendReminderEmail;
