import Department from "../models/DepartmentModel.js";

export const createDepartment = async (req, res) => {
  const dept = await Department.create(req.body);
  res.json(dept);
};

export const getDepartments = async (req, res) => {
  res.json(await Department.find());
};

export const getDepartment = async (req, res) => {
  res.json(await Department.findById(req.params.employeeId).populate("employees"));
};

export const updateDepartment = async (req, res) => {
  res.json(
    await Department.findByIdAndUpdate(req.params.employeeId, req.body, { new: true })
  );
};

export const deleteDepartment = async (req, res) => {
  await Department.findByIdAndDelete(req.params.employeeId);
  res.json({ message: "Department deleted" });
};
