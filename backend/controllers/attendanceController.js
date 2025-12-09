import Attendance from "../models/AttendanceModel.js";
import moment from "moment";

export const checkIn = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const today = moment().format("YYYY-MM-DD");
    const now = moment().format("HH:mm:ss");

    const existing = await Attendance.findOne({
      employeeId,
      date: today,
    });
    if (existing && existing.checkIn) {
      return res.status(400).json({ message: "Already checked in today" });
    }

    let status = "Present";
    if (now > "10:00") status = "Late";

    const attendance = await Attendance.findOneAndUpdate(
      { employeeId, date: today },
      {
        employeeId,
        date: today,
        checkIn: now,
        status,
      },
      { upsert: true, new: true }
    );

    res.json({ message: "Checked in successfully", attendance });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const checkOut = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const today = moment().format("YYYY-MM-DD");
    const now = moment().format("HH:mm:ss");

    const attendance = await Attendance.findOne({ employeeId, date: today });
    if (!attendance || !attendance.checkIn) {
      return res
        .status(400)
        .json({ message: "Check-in required before check-out" });
    }

    const start = moment(attendance.checkIn, "HH:mm:ss");
    const end = moment(now, "HH:mm:ss");
    const workinkHours = moment.duration(end.diff(start)).asHours();

    let status = attendance.status;
    if (workingHours < 4) status = "Half-Day";
    attendance.checkOut = now;

    res.json({ message: "Checked out successfully", attendance });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getMyAttendance = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const data = (await Attendance.find({ employeeId })).sort({ date: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getAllAttendance = async (req, res) => {
  try {
    const data = await Attendance.find()
      .populate("employeeId", "name")
      .sort({ date: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
