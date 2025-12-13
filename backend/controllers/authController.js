import Employee from "../models/EmployeeModel.js";
import { signToken, verifyToken } from "../utils/token.js";
import { createSendToken } from "../utils/createSendToken.js";
import dotenv from "dotenv";
dotenv.config();

// Login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ error: "Please provide email and password" });

    const employee = await Employee.findOne({ email }).select("+password");
    if (!employee) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    else if(employee.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    createSendToken(res, employee);
  } catch (err) {
    next(err);
  }
};

// Logout
export const logout = async (req, res) => {
  res.cookie("token", "loggedout", {
    httpOnly: true,
    maxAge: 10 * 1000,
  });
  res.json({ status: "success", message: "Logged out" });
};

// Refresh token (simple)
// export const refreshToken = (req, res) => {
//   try {
//     const token =
//       req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
//     if (!token) return res.status(401).json({ error: "No token" });

//     // verify (if still valid you can issue a new token, but normally refresh-token flow uses separate refresh tokens)
//     const decoded = verifyToken(token, JWT_SECRET);
//     const newToken = signToken(
//       { id: decoded.id, role: decoded.role },
//       JWT_SECRET,
//       JWT_EXPIRES_IN
//     );
//     res.cookie("token", newToken, { httpOnly: true, maxAge: 1000 * 60 * 60 });
//     res.json({ status: "success", token: newToken });
//   } catch (err) {
//     return res.status(401).json({ error: "Invalid token" });
//   }
// };
