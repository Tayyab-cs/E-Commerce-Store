import dotenv from 'dotenv';
// eslint-disable-next-line import/no-extraneous-dependencies
import twilio from 'twilio';

dotenv.config();

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_NUMBER } = process.env;
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendSms = (body, to) => {
  client.messages.create({
    body,
    from: TWILIO_NUMBER,
    to,
  });
};

export default sendSms;
