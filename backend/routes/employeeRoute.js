import express from "express";
const router = express.Router();

import Auth from "../middleware/authMiddleware.js";
import { AdminAuth } from "../middleware/authMiddleware.js";

import {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  terminateEmployee,
  assignDepartment,
  transferEmployee,
  removeEmployeeFromDepartment,
  getUpcomingBirthdays,
} from "../controllers/employeeController.js";

router.use(Auth);

router.get("/birthday", getUpcomingBirthdays);
router.get("/", getEmployees);
router.get("/:employeeId", getEmployee);

router.use(AdminAuth("admin", "HR", "employee"));

router.post("/", createEmployee);
router.put("/:employeeId", updateEmployee);
router.delete("/terminate/:employeeId", terminateEmployee);
router.post("/assign-department", assignDepartment);
router.post("/transfer", transferEmployee);
router.post("/remove-from-department", removeEmployeeFromDepartment);

export default router;
