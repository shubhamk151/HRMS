import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

import employeeRoutes from "./routes/employeeRoute.js";
import departmentRoutes from "./routes/departmentRoute.js";
import attendanceRoutes from "./routes/attendanceRoute.js";
import leaveRoutes from "./routes/leaveRouter.js";
import leaveAllocationRoutes from "./routes/leaveAllocationRoute.js";
import payrollRoutes from "./routes/payrollRoute.js";
import noticeBord from "./routes/noticeBordRoute.js";

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGODB_URI;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use("/api/employees", employeeRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/leave-allocations", leaveAllocationRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/notice-bord", noticeBord);

app.get("/", (req, res) => {
  res.send("Backend is working");
});

app.listen(PORT, () => {
  console.log(`Server is working on port ${PORT}`);
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));
});
