import jwt from "jsonwebtoken";
import Employee from "../models/EmployeeModel.js";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const Auth = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(token, JWT_SECRET);

    const employee = await Employee.findById(decoded.id).select("-password");
    if (!employee) {
      return res.status(401).json({ error: "Employee not found" });
    }
    req.user = employee;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};
export const AdminAuth = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "Not authenticated" });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};

export default Auth;
