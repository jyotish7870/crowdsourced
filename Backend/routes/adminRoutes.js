import express from "express";
import { getMessages } from "../controllers/adminController.js";
import Message from "../Models/messgeModel.js";

const router = express.Router();

router.get("/messages", getMessages);
router.delete("/messages/all", async (req, res) => {
  try {
    await Message.deleteMany();
    res.json({ message: "All messages deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
