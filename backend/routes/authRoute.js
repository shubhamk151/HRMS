import express from "express";
const router = express.Router();
import { login, logout } from "../controllers/authController.js";

// Login route
router.post("/login", login);

// Logout route
router.get("/logout", logout);

export default router;
