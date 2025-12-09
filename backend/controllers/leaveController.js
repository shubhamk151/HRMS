import Leave from "../models/LeaveModel.js";
import LeaveAllocation from "../models/LeaveAllocationModel.js";

export const applyLeave = async (req, res) => {
  try {
    const { employeeId, leaveType, startDate, endDate, reason } = req.body;

    if (!employeeId || !leaveType || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const leave = await Leave.create({
      employeeId,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    return res.status(201).json({
      message: "Leave applied successfully",
      leave,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getLeavesByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const leaves = await Leave.find({ employeeId }).sort({ createdAt: -1 });

    return res.status(200).json(leaves);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const approveLeave = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const approverId = req.user.id;

    const leave = await Leave.findById(leaveId);
    if (!leave) return res.status(404).json({ message: "Leave not found" });

    if (leave.status !== "Pending")
      return res.status(400).json({ message: "Leave already processed" });

    const leaveType = leave.leaveType;

    const allocation = await LeaveAllocation.findOne({
      employeeId: leave.employeeId,
      year: leave.startDate.getFullYear(),
    });

    if (!allocation)
      return res.status(400).json({ message: "No leave allocation found" });

    if (allocation.leaveBalance[leaveType].remaining < leave.totalDays)
      return res.status(400).json({ message: "Insufficient leave balance" });

    // Deduct leaves from allocation and approve leave
    allocation.leaveBalance[leaveType].used += leave.totalDays;
    allocation.leaveBalance[leaveType].remaining -= leave.totalDays;
    await allocation.save();

    leave.status = "Approved";
    leave.approvedBy = approverId;
    await leave.save();

    return res.status(200).json({ message: "Leave approved", leave });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const rejectLeave = async (req, res) => {
  try {
    const { leaveId } = req.params;

    const leave = await Leave.findById(leaveId);
    if (!leave) return res.status(404).json({ message: "Leave not found" });

    if (leave.status !== "Pending")
      return res.status(400).json({ message: "Leave already processed" });

    leave.status = "Rejected";
    leave.comments = req.body.comments || "Rejected by admin";

    await leave.save();

    return res.status(200).json({ message: "Leave rejected", leave });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
