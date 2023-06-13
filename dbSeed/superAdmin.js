import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import db from '../database/connect.js';

dotenv.config();

const { SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD } = process.env;

const superAdmin = async () => {
  const hashedPassword = await bcrypt.hash(SUPER_ADMIN_PASSWORD, 10);
  await db.admin.create({
    firstName: 'super',
    lastName: 'admin',
    email: SUPER_ADMIN_EMAIL,
    password: hashedPassword,
    role: 'superAdmin',
  });
};

export default superAdmin;
