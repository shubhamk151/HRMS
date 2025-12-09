import express from "express";
const router = express.Router();
import Auth from "../middleware/authMiddleware.js";
import { AdminAuth } from "../middleware/authMiddleware.js";  

import {
  checkIn,
  checkOut,
  getMyAttendance,
  getAllAttendance,
} from "../controllers/attendanceController.js";

router.use(Auth);

router.post("/check-in", checkIn);
router.post("/check-out", checkOut);
router.get("/all", getAllAttendance); // for admin
router.get("/:employeeId", getMyAttendance); //for employee

export default router;
