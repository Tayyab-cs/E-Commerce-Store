import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import logger from './logger.js';

dotenv.config();

const sendEmail = async (email, subj, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'outlook',
      auth: {
        user: process.env.SENDER_MAIL,
        pass: process.env.SENDER_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SENDER_MAIL,
      to: email,
      subject: subj,
      text: `Your new password: ${text}`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) return err;
      logger.info('🤗 -> Email sent Successfully...');
      return true;
    });
  } catch (error) {
    logger.error(error, '😡 -> Email not sent successfully...');
  }
};

export default sendEmail;
