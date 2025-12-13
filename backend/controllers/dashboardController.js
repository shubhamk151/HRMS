import Employee from "../models/EmployeeModel.js";
import Attendance from "../models/AttendanceModel.js";
import Leave from "../models/LeaveModel.js";

// Helper to coerce safe number
const toNumber = (val, fallback = 0) => {
  const n = Number(val);
  return Number.isFinite(n) ? n : fallback;
};

// GET /api/dashboard
export const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Parallel counts
    const [totalEmployees, presentToday, leavesToday, pendingLeaves] =
      await Promise.all([
        Employee.countDocuments(),
        Attendance.countDocuments({
          date: { $gte: today, $lt: tomorrow },
          status: { $in: ["Present", "Half-Day", "Late"] },
        }),
        Leave.countDocuments({
          startDate: { $lte: tomorrow },
          endDate: { $gte: today },
        }),
        Leave.countDocuments({ status: "Pending" }),
      ]);

    // Attendance series for last 5 days (fallback static if none)
    const fiveDaysAgo = new Date(today);
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 4);

    const attendanceAgg = await Attendance.aggregate([
      {
        $match: {
          date: { $gte: fiveDaysAgo, $lt: tomorrow },
        },
      },
      {
        $group: {
          _id: {
            day: { $dateToString: { format: "%a", date: "$date" } },
            order: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          },
          present: {
            $sum: {
              $cond: [{ $eq: ["$status", "Present"] }, 1, 0],
            },
          },
          absent: {
            $sum: {
              $cond: [{ $eq: ["$status", "Absent"] }, 1, 0],
            },
          },
        },
      },
      { $sort: { "_id.order": 1 } },
      {
        $project: {
          _id: 0,
          date: "$_id.day",
          present: 1,
          absent: 1,
        },
      },
    ]);

    const attendanceSeries = attendanceAgg.length
      ? attendanceAgg
      : [
          { date: "Mon", present: 12, absent: 2 },
          { date: "Tue", present: 13, absent: 1 },
          { date: "Wed", present: 11, absent: 3 },
          { date: "Thu", present: 14, absent: 0 },
          { date: "Fri", present: 10, absent: 4 },
        ];

    // Leaves trend (last 6 months) fallback static
    const sixMonthsAgo = new Date(today);
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);

    const leavesAgg = await Leave.aggregate([
      {
        $match: {
          startDate: { $gte: sixMonthsAgo, $lt: tomorrow },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%b", date: "$startDate" } },
          leaves: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          _id: 0,
          name: "$_id",
          leaves: 1,
        },
      },
    ]);

    const leavesTrend = leavesAgg.length
      ? leavesAgg
      : [
          { name: "Jan", leaves: 3 },
          { name: "Feb", leaves: 5 },
          { name: "Mar", leaves: 2 },
          { name: "Apr", leaves: 4 },
          { name: "May", leaves: 1 },
          { name: "Jun", leaves: 3 },
        ];

    res.json({
      totalEmployees: toNumber(totalEmployees),
      presentToday: toNumber(presentToday),
      leavesToday: toNumber(leavesToday),
      pending: toNumber(pendingLeaves),
      attendanceSeries,
      leavesTrend,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
