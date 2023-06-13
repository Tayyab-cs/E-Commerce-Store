import express from 'express';
import upload from '../middlewares/uploadImage.js';
import uploadImage from '../controllers/image.js';

const route = express.Router();

// <-----😉 -----> Image Api's <-----😉 ----->
route.post('/upload', upload.single('image'), uploadImage);

export default route;
