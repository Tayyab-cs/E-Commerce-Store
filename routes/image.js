import express from 'express';
import upload from '../middlewares/uploadImage';
import uploadImage from '../controllers/image';

const route = express.Router();

// <-----😉 -----> Image Api's <-----😉 ----->
route.post('/upload', upload.single('image'), uploadImage);

export default route;
