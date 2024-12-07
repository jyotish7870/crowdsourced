import User from "../Models/userModel.js";
import Issue from "../Models/issueModel.js";
import generateToken from "../utils/generateToken.js";

export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ name, email, password });
    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    }
    return res.status(400).json({ message: "Invalid user data" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
      password,
    });
    if (user) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    }
    return res.status(400).json({ message: "Invalid email or password" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const allIssueByUser = async (req, res) => {
  try {
    const issues = await Issue.find({ createdBy: req.body.userId });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const dashborad = async (req, res) => {
  try {
    const issues = await Issue.find({ createdBy: req.body.userId });
    const totalIssues = issues.length;
    const resolvedIssues = issues.filter(
      (issue) => issue.status === "resolved"
    ).length;
    const rejectedIssues = issues.filter(
      (issue) => issue.status === "rejected"
    ).length;
    const openIssues = issues.filter((issue) => issue.status === "open").length;

    const issueByDate = await Issue.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
    ]);

    // const commentsByIssue = await Issue.aggregate([
    //   {
    //     $group: {
    //       _id: "$_id",
    //       count: { $sum: { $size: "$comments" } },
    //     },
    //   },
    // ]);

    const totalUpvotes = await issues.reduce((acc, issue) => {
      return acc + issue.upvotes;
    }, 0);
    const totalDownvotes = await issues.reduce((acc, issue) => {
      return acc + issue.downvotes;
    }, 0);
    const totalComments = await issues.reduce((acc, issue) => {
      return acc + issue.comments.length;
    }, 0);

    res.status(200).json({
      data: {
        totalIssues,
        resolvedIssues,
        rejectedIssues,
        openIssues,
        issueByDate,
        // commentsByIssue,
        issues,
        totalUpvotes,
        totalDownvotes,
        totalComments,
      },
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const allusers = async (req, res) => {
  try {
    const users = await User.find();
    const totaluser = users.length;
    res.json({ users, totaluser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findByIdAndDelete(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });
    res.json({ message: "Issue deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
