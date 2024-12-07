import Issue from "../Models/issueModel.js";
import User from "../Models/userModel.js";

export const createIssue = async (req, res) => {
  try {
    const { title, description, location, type } = req.body;
    //validation
    if (!title || !description || !location || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).json({ message: "User not found" });
    const issue = new Issue({
      title,
      description,
      location,
      type,
      createdBy: req.body.userId,
      complainer: user.name,
    });
    await issue.save();
    res.status(201).json({ message: "Issue created successfully", issue });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().populate("upvotes", "downvotes");
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });
    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// exports.getIssue = async (req, res) => {
//   try {
//     const issue = await Issue.findById(req.params.id).populate(
//       "createdBy",
//       "username"
//     );
//     if (!issue) return res.status(404).json({ message: "Issue not found" });
//     res.json(issue);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.updateIssueStatus = async (req, res) => {
//   try {
//     const issue = await Issue.findById(req.params.id);
//     if (!issue) return res.status(404).json({ message: "Issue not found" });

//     issue.status = req.body.status;
//     await issue.save();
//     res.json(issue);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const upvoteIssue = async (req, res) => {
  try {
    console.log("route hitted");
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });


    issue.upvotes += 1;

    await issue.save();
    res.status(200).json({ message: "upvoted successfully", issue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const downvoteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    issue.downvotes += 1;
    await issue.save();
    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const openIssue = async (req, res) => {
  try {
    const issue = await Issue.find({ status: "open" });
    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const closedIssue = async (req, res) => {
  try {
    const issue = await Issue.find({ status: "rejected" });
    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const resolvedIssue = async (req, res) => {
  try {
    const issue = await Issue.find({ status: "resolved" });
    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const commentOnIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    issue.comments.push({
      comment: req.body.comment,
      createdBy: req.body.userId,
    });
    await issue.save();
    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const reportIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    issue.reports.push({
      report: req.body.report,
      createdBy: req.body.userId,
    });
    await issue.save();
    res.status(200).json({ message: "issue reported successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
