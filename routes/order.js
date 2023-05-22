import express from "express";
const route = express.Router();

import { order } from "../controllers/order.js";

// <------------😉 ------------> Order Api's <------------😉 ------------>
route.post("/order", order);

export default route;
