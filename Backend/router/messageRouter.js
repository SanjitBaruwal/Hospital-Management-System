import express from "express";
import {
  getAllMessages,
  sendMessage,
} from "../controller/messageController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";

//create a new router
const router = new express.Router();
//define router
router.post("/send", sendMessage);
router.get("/get_all_messages", isAdminAuthenticated, getAllMessages);

// register this router at app.js

export default router;
