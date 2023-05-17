// 'use strict'
// import sequelize from '../../models/index.js';
// import initModels from "../../models/init-models.js";
// import formidable from 'formidable'
// import cryptoJS from 'crypto-js';
// import otpGenerator from 'otp-generator';
// import logger from '../../loaders/logger.js';

// import { sgMail, } from '../../config/config.js';
// import { errorHandling } from '../../utils/helper/errorObject.js';

// // SQL MODELS
// const model = initModels(sequelize);

// // ***************************************************************
// // Middlewares for
// // OAuth
// // Signin/Signup
// // Encryption
// // Decryption
// // ***************************************************************

// const attachBodyAndFiles = (req, res, next) => {
//     logger.info("Attach File MIDDLEWARE Triggered")
//     let form = new formidable.IncomingForm({ multiples: true })

//     form.parse(req, function (err, fields, files) {
//         if (err) {
//             return res.status(500).json({
//                 success: false,
//                 message: "General Middleware File Handling Error",
//                 err
//             })
//         }

//         req.files = files;
//         req.body = fields;
//         next()
//     })
// }

// // *************
// // Validate User
// // *************

// const validateUser = async (req, res, next) => {
//     logger.info("Validate User MIDDLEWARE Triggered");
//     try {

//         let { email } = req.user,
//             user = false;

//         let adminOrUserUrl = req.originalUrl.split('/')[2];

//         if (adminOrUserUrl === "admin") {
//             user = await model.Admin.findOne({
//                 where: { email }
//             });
//         } else {
//             user = await model.User.findOne({
//                 where: { email }
//             });
//         }

//         if (!user) throw errorHandling("Invalid token", "permission");

//         next();
//     } catch (e) {
//         logger.info("Error in Validate User middleware: ", e)
//         next(e)
//     }
// }

// // *************
// // Token Decrypt
// // *************

// const tokenDecrypt = async (req, res, next) => {
//     logger.info("Token Decrypt MIDDLEWARE Triggered");
//     try {
//         if (!req.headers.authorization || !req.headers.authorization.length) {
//             throw errorHandling("User is unauthorized", "unAuthorized");
//         }

//         let token = req.headers.authorization.slice(7);

//         token = await decryptData(token).catch((e) => { })
//         req.headers.authorization = 'Bearer ' + token;
//         next()
//     } catch (e) {
//         logger.info("Error in tokenDecrypt middleware: ", e)
//         next(e)
//     }
// }

// // *************
// // Encrypt
// // *************

// const encryptData = async (value) => {
//     logger.info("Encrypt Data MIDDLEWARE Triggered");
//     return new Promise(function (resolve, reject) {
//         try {
//             let data = cryptoJS.AES.encrypt(value, process.env.crypto).toString();
//             if (!data) errorHandling("Invalid user info", "unAuthorised");
//             resolve(data)
//         } catch (e) {
//             logger.info("Error in encryptData middleware: ", e)
//             reject(e)
//         }
//     });
// }

// // *************
// // Decrypt
// // *************

// const decryptData = async (value) => {
//     logger.info("Decrypt Data MIDDLEWARE Triggered");
//     return new Promise(function (resolve, reject) {
//         try {
//             let bytes = cryptoJS.AES.decrypt(value, process.env.crypto);
//             if (!bytes) throw errorHandling("Invalid token", "unAuthorised");
//             let originalText = bytes.toString(cryptoJS.enc.Utf8);
//             if (!originalText) errorHandling("Invalid token", "unAuthorised");

//             resolve(originalText)
//         } catch (e) {
//             logger.info("Error in decryptData middleware: ", e)
//             reject(e)
//         }
//     })
// }

// // *************
// // OTP & Email
// // *************

// const sendEmail = (toEmail) => {
//     logger.info("Send Email MIDDLEWARE Triggered");
//     return new Promise(async (resolve, reject) => {
//         try {
//             let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

//             const message = {
//                 to: toEmail,
//                 from: process.env.email, // Use the email address or domain you verified above
//                 subject: "OTP from Boon4",
//                 text: otp
//             };

//             sgMail
//                 .send(message)
//                 .then(() => {
//                     logger.info('OTP sent')
//                     return resolve(otp)
//                 }, error => {
//                     logger.info(error)
//                     if (error.response) {
//                         console.error(error.response.body)
//                         throw error.response;
//                     }
//                 }).catch(e => {
//                     throw e;
//                 });
//             return resolve(otp)
//         } catch (e) {
//             logger.info("Error in sendEmail middleware: ", e)
//             reject(e)
//         }
//     })
// }

// export default {
//     attachBodyAndFiles,
//     encryptData,
//     decryptData,
//     tokenDecrypt,
//     validateUser,
//     sendEmail,
// }
