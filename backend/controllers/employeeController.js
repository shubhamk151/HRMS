import Employee from "../models/EmployeeModel.js";
import Department from "../models/DepartmentModel.js";
import { createSendToken } from "../utils/createSendToken.js";
import PastEmployee from "../models/PastEmployee.js";

export const createEmployee = async (req, res) => {
  try {
    const existingEmployee = await Employee.findOne({ email: req.body.email });
    if (existingEmployee) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const employee = await Employee.create(req.body);
    await employee.save();
    createSendToken(res, employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate("department");
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.employeeId).populate(
      "department"
    );
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(
      req.params.employeeId,
      req.body,
      {
        new: true,
      }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const terminateEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(
      req.params.employeeId
    );
    const pastEmployeeData = PastEmployee.create({
      ...deletedEmployee.toObject(),
    });
    await pastEmployeeData.save();
    res.json({ message: "Employee terminated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const assignDepartment = async (req, res) => {
  try {
    const { employeeId, departmentId } = req.body;

    await Employee.findByIdAndUpdate(employeeId, { department: departmentId });

    await Department.findByIdAndUpdate(departmentId, {
      $addToSet: { employees: employeeId },
    });

    res.json({ message: "Department assigned" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const transferEmployee = async (req, res) => {
  const { employeeId, newDeptId } = req.body;

  const emp = await Employee.findById(employeeId);
  const oldDept = emp.department;

  emp.department = newDeptId;
  await emp.save();

  if (oldDept) {
    await Department.findByIdAndUpdate(oldDept, {
      $pull: { employees: employeeId },
    });
  }

  await Department.findByIdAndUpdate(newDeptId, {
    $addToSet: { employees: employeeId },
  });

  res.json({ message: "Transferred" });
};

export const removeEmployeeFromDepartment = async (req, res) => {
  try {
    const { employeeId } = req.body;

    const emp = await Employee.findById(employeeId);

    await Department.findByIdAndUpdate(emp.department, {
      $pull: { employees: employeeId },
    });

    emp.department = null;
    await emp.save();

    res.json({ message: "Removed from department" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUpcomingBirthdays = async (req, res) => {
  try {
    const employees = await Employee.find();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const results = employees
      .map((emp) => {
        if (!emp.dob) return null;
        const dob = new Date(emp.dob);
        if (isNaN(dob.getTime())) return null;
        const thisYear = today.getFullYear();

        let next = new Date(thisYear, dob.getMonth(), dob.getDate());

        if (next < today)
          next = new Date(thisYear + 1, dob.getMonth(), dob.getDate());
        const diffMs = next - today;
        const diffDays = Math.round(diffMs / MS_PER_DAY);
        return {
          _id: emp._id,
          name: emp.firstName
            ? `${emp.firstName} ${emp.lastName || ""}`.trim()
            : emp.name || "",
          dob: emp.dob,
          nextBirthday: next,
          diffDays,
        };
      })
      .filter((e) => e.diffDays >= 0 && e.diffDays <= 30)
      .sort((a, b) => a.diffDays - b.diffDays);

    res.json({ count: results.length, employees: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
