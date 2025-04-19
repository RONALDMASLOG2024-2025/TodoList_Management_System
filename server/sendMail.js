const nodemailer = require('nodemailer');
require('dotenv').config();

const motivationalQuotes = [
  "Believe you can and you're halfway there. 💪",
  "Success is the sum of small efforts repeated daily. 🚀",
  "Your future is created by what you do today, not tomorrow. ✨",
  "Don't watch the clock; do what it does. Keep going. ⏳",
  "Push yourself, because no one else is going to do it for you. 🔥",
  "Great things never come from comfort zones. 🌟",
  "Every step you take is a step closer to your goal. 🛤️",
  "Discipline is choosing between what you want now and what you want most. 🧠",
];

const getRandomQuote = () => {
  const index = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[index];
};

const sendReminderEmail = async (toEmail, taskTitle, taskTime) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const motivation = getRandomQuote();

  const mailOptions = {
    from: `"DoodleDo 🦤" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `⏰ Hey, don’t forget: ${taskTitle} coming up!`,
    text: `Hi there! Just a quick reminder: you have "${taskTitle}" scheduled at ${taskTime}.\n\n${motivation}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 16px;">
        <h2>🔔 Task Reminder from DoodleDo</h2>
        <p>Hi there!</p>
        <p>This is your friendly reminder that <strong>"${taskTitle}"</strong> is scheduled at <strong>${taskTime}</strong>.</p>
        <p style="margin-top: 24px; font-style: italic; color: #555;">"${motivation}"</p>
        <hr/>
        <p style="font-size: 0.9em; color: #888;">You've got this! – DoodleDo Team 🦤</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${toEmail}`);
  } catch (error) {
    console.error('❌ Email send error:', error);
  }
};

module.exports = sendReminderEmail;
