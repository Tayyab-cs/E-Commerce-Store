import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { SECRET_KEY } = process.env;

// <-----😉 -----> Token Helper <-----😉 ----->
const signLoginData = async (userInfo, time) => {
  let token = await jwt.sign(userInfo, SECRET_KEY, { expiresIn: time });
  return token;
};

export { signLoginData };
