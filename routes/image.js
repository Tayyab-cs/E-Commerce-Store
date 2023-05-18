import express from "express";
const route = express.Router();
import { upload } from "../middlewares/uploadImage.js";
import { uploadImage } from "../controllers/image.js";

// <------------😉 ------------> Image Api's <------------😉 ------------>
route.post("/upload", upload.single("image"), uploadImage);

export default route;
