import Query from "../Models/queryModel.js";

export const query = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const query = await Query.create({ name, email, message });
    query.save();
    return res.status(201).json(query);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
