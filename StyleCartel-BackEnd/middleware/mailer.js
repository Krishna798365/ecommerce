// utils/mailer.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // Your Gmail
    pass: process.env.EMAIL_PASSWORD, // App password, not your real Gmail password
  },
});

const sendLoginEmail = async (userEmail, userName) => {
  const mailOptions = {
    from: `"StyleCartel" <${process.env.EMAIL}>`,
    to: userEmail,
    subject: `Welcome back, ${userName}!`,
    text: `Hi ${userName},\n\nYou just logged into StyleCartel.\n\nIf this wasn't you, please contact us.`,
  };


  return transporter.sendMail(mailOptions);
};
const sendLoginEmail1 = async (userEmail, userName) => {
  const mailOptions = {
    from: `"StyleCartel" <${process.env.EMAIL}>`,
    to: userEmail,
    subject: `Welcome To, StyleCartel!`,
    text: `Hi ${userName},\n\nYou just logged into StyleCartel For The First Time.\n\nIf this wasn't you, please contact us.`,
  };
  

  return transporter.sendMail(mailOptions);
};
export  {sendLoginEmail , sendLoginEmail1 };
