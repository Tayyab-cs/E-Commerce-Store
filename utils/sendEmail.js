import nodemailer from "nodemailer";
import logger from "./logger.js";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "outlook",
      auth: {
        user: process.env.SENDER_MAIL,
        pass: process.env.SENDER_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SENDER_MAIL,
      to: email,
      subject: subject,
      text: `Your new password: ${text}`,
    };

    await transporter.sendMail(mailOptions, function (err, data) {
      if (err) return console.log(`ERROR: ${err}`);
      logger.info(`🤗 -> Email sent Successfully...`);
    });
  } catch (error) {
    logger.error(error, "😡 -> Email not sent successfully...");
  }
};

export default sendEmail;
