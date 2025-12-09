import express from "express";
const router = express.Router();
import Auth from "../middleware/authMiddleware.js";
import { AdminAuth } from "../middleware/authMiddleware.js";  
import {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/departmentController.js";

router.post("/", createDepartment);

router.use(Auth, AdminAuth("admin", "HR"));

router.get("/", getDepartments);
router.get("/:employeeId", getDepartment);
router.put("/:employeeId", updateDepartment);
router.delete("/:employeeId", deleteDepartment);

export default router;
