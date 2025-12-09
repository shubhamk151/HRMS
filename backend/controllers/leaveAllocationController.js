import LeaveAllocation from "../models/LeaveAllocationModel.js";

// CREATE LEAVE ALLOCATION
export const createLeaveAllocation = async (req, res) => {
  try {
    const { employeeId, year, totalLeaves } = req.body;

    if (!employeeId || !year) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Prevent duplicate allocations
    const exists = await LeaveAllocation.findOne({ employeeId, year });
    if (exists)
      return res.status(400).json({ message: "Allocation already exists" });

    const allocation = await LeaveAllocation.create({
      employeeId,
      year,
      totalLeaves,
      usedLeaves: 0,
      remainingLeaves: totalLeaves,
    });

    return res.status(201).json({
      message: "Leave allocation created",
      allocation,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// GET ALLOCATION FOR EMPLOYEE
export const getLeaveAllocation = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const allocation = await LeaveAllocation.find({
      employeeId,
    });

    return res.status(200).json(allocation);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// UPDATE ALLOCATION (ADMIN/HR)
export const updateLeaveAllocation = async (req, res) => {
  try {
    const { allocationId } = req.params;
    const { totalLeaves } = req.body;

    const allocation = await LeaveAllocation.findById(allocationId);

    if (!allocation)
      return res.status(404).json({ message: "Allocation not found" });

    allocation.totalLeaves = totalLeaves;
    allocation.remainingLeaves = totalLeaves - allocation.usedLeaves;

    await allocation.save();

    return res.status(200).json({
      message: "Allocation updated",
      allocation,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// RESET ALLOCATION (EVERY NEW YEAR)
export const resetLeaveAllocation = async (req, res) => {
  try {
    const { employeeId, newYear, totalLeaves } = req.body;

    const allocation = await LeaveAllocation.create({
      employeeId,
      year: newYear,
      totalLeaves,
      usedLeaves: 0,
      remainingLeaves: totalLeaves,
    });

    return res.status(201).json({
      message: "Leave allocation reset for new year",
      allocation,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
