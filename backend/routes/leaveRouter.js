import express from "express";
const router = express.Router();
import Auth from "../middleware/authMiddleware.js";
import { AdminAuth } from "../middleware/authMiddleware.js";

import {
  applyLeave,
  getLeavesByEmployee,
  approveLeave,
  rejectLeave,
} from "../controllers/leaveController.js";

router.use(Auth);

router.post("/", applyLeave);
router.get("/:employeeId", getLeavesByEmployee);

router.use(AdminAuth("admin", "HR"));

router.put("/approve/:leaveId", approveLeave);
router.put("/reject/:leaveId", rejectLeave);

export default router;
