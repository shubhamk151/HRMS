import { signToken } from "../utils/token.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

export const createSendToken = (res, employee) => {
  try {
    const token = signToken(
      { id: employee._id, role: employee.role },
      JWT_SECRET,
      JWT_EXPIRES_IN
    );

    // You could also store refresh tokens in DB or redis — simple cookie here
    const cookieOptions = {
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hour
    };

    res.cookie("token", token, cookieOptions);

    res.json({
      status: "success",
      employee,
      token,
    });
  } catch (err) {
    res.status(500).json({ error: "Token generation failed" });
  }
};
