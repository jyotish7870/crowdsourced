import Message from "../Models/messgeModel.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json({ messages: messages });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
