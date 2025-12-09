import express from "express";
const router = express.Router();
import Auth from "../middleware/authMiddleware.js";
import { AdminAuth } from "../middleware/authMiddleware.js";

import {
  createLeaveAllocation,
  getLeaveAllocation,
  updateLeaveAllocation,
  resetLeaveAllocation,
} from "../controllers/leaveAllocationController.js";

router.use(Auth, AdminAuth("admin", "HR"));

router.post("/allocate", createLeaveAllocation);
router.get("/balance/:employeeId", getLeaveAllocation);
router.put("/update/:allocationId", updateLeaveAllocation);
router.post("/reset", resetLeaveAllocation);

export default router;
