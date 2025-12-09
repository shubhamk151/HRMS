import express from "express";
const router = express.Router();

import Auth from "../middleware/authMiddleware.js";
import {
  generatePayroll,
  getPayroll,
  markPaid,
} from "../controllers/payrollController.js";

// router.use(Auth);

router.post("/", generatePayroll);
router.get("/:employeeId", getPayroll);
router.put("/mark-paid/:month", markPaid);

export default router;
