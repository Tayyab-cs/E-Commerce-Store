import dotenv from 'dotenv';

dotenv.config();

const { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_REGION } = process.env;

const credentials = {
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
};

const config = {
  region: AWS_REGION,
};

export { credentials, config };
