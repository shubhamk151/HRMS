import Payroll from "../models/PayrollModel.js";

export const generatePayroll = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Payroll data is required" });
    }

    const payroll = await Payroll.create(req.body);
    res.json(payroll);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getPayroll = async (req, res) => {
  try {
    const payrolls = await Payroll.find({ employeeId: req.params.employeeId });
    res.json(payrolls);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const markPaid = async (req, res) => {
  try {
    const updatedPayroll = await Payroll.updateMany(
      { month: req.params.month },
      { paymentStatus: "Paid", paymentDate: new Date() },
      { new: true }
    );

    res.json(updatedPayroll);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
