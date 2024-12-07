import express from "express";
import {
  userRegister,
  userLogin,
  allIssueByUser,
  allusers,
  deleteIssue,
  dashborad,
} from "../controllers/userController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { query } from "../controllers/queryController.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/allusers", authMiddleware, allusers);
router.get("/userdashboard", authMiddleware, dashborad);
router.get("/allIssues", authMiddleware, allIssueByUser);
router.post("/query", query);
router.delete("/deleteIssue/:id", authMiddleware, deleteIssue);

export default router;
