import express from "express";
import {
  getAllIssues,
  createIssue,
  openIssue,
  closedIssue,
  resolvedIssue,
  commentOnIssue,
  upvoteIssue,
  downvoteIssue,
  reportIssue,
  getIssue,
} from "../controllers/issueController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createIssue", authMiddleware, createIssue);
router.get("/allIssues", getAllIssues);
router.get("/getIssue/:id", getIssue);
router.get("/openIssues", openIssue);
router.get("/closedIssues", closedIssue);
router.get("/resolvedIssues", resolvedIssue);
router.post("/reportIssue/:id", authMiddleware, reportIssue);
router.post("/commentIssue/:id", authMiddleware, commentOnIssue);
router.post("/upvoteIssue/:id", authMiddleware, upvoteIssue);
router.post("/downvoteIssue/:id", authMiddleware, downvoteIssue);
export default router;
