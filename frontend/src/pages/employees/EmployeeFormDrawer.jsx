import React, { useEffect } from "react";
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axiosClient from "../../api/axiosClient";
import { useQueryClient } from "@tanstack/react-query";

export default function EmployeeFormDrawer({
  open,
  onClose,
  initialData,
  onCloseSnackbar,
}) {
  const { register, handleSubmit, reset } = useForm();
  const qc = useQueryClient();

  useEffect(() => {
    if (initialData) {
      reset({
        employeeCode: initialData.employeeCode ?? "",
        "name.firstName": initialData.name?.firstName ?? "",
        "name.lastName": initialData.name?.lastName ?? "",
        dob: initialData.dob
          ? new Date(initialData.dob).toISOString().split("T")[0]
          : "",
        email: initialData.email ?? "",
        phone: initialData.phone ?? "",
        gender: initialData.gender ?? "",
        designation: initialData.designation ?? "",
        employmentType: initialData.employmentType ?? "Permanent",
        joiningDate: initialData.joiningDate
          ? new Date(initialData.joiningDate).toISOString().split("T")[0]
          : "",
        role: initialData.role ?? "employee",
        department: initialData.department?._id ?? initialData.department ?? "",
        address: initialData.address ?? "",
        status: initialData.status ?? "Active",
        password: "",
      });
    } else {
      reset({
        employeeCode: "",
        dob: "",
        email: "",
        phone: "",
        gender: "",
        designation: "",
        employmentType: "Permanent",
        joiningDate: "",
        role: "employee",
        department: "",
        address: "",
        status: "Active",
        password: "",
      });
    }
  }, [initialData, reset]);

  const onSubmit = async (vals) => {
    try {
      if (initialData) {
        await axiosClient.put(`/employees/${initialData._id}`, vals);
        onCloseSnackbar?.("Employee updated successfully", "success");
      } else {
        await axiosClient.post("/employees", vals);
        onCloseSnackbar?.("Employee created successfully", "success");
      }
      qc.invalidateQueries({ queryKey: ["employees"] });
      onClose();
    } catch (err) {
      const msg = err?.response?.data?.message || "Something went wrong";
      onCloseSnackbar?.(msg, "error");
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 620, p: 3, mt: 8 }}>
        <Typography variant="h6" mb={2} fontWeight={"bold"}>
          {initialData ? "Edit Employee" : "Add Employee"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
              label="Employee ID"
              {...register("employeeCode", {
                required: "Employee ID is required",
              })}
              fullWidth
              required
            />

            <TextField
              label="First Name"
              {...register("name.firstName", {
                required: "First name is required",
              })}
              fullWidth
              required
            />

            <TextField
              label="Last Name"
              {...register("name.lastName", {
                required: "Last name is required",
              })}
              fullWidth
              required
            />

            <TextField
              type="date"
              label="Date of Birth"
              {...register("dob", { required: "DOB is required" })}
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ max: new Date().toISOString().split("T")[0] }}
              required
            />

            <TextField
              label="Email"
              {...register("email", { required: "Email is required" })}
              fullWidth
              required
            />
            <TextField
              label="Phone"
              {...register("phone", { required: "Phone is required" })}
              fullWidth
              required
            />

            {!initialData && (
              <TextField
                label="Password"
                type="password"
                {...register("password", { required: "Password is required" })}
                fullWidth
                required
              />
            )}

            <TextField
              select
              field
              label="Gender"
              {...register("gender", { required: "Gender is required" })}
              fullWidth
              required
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>

            <TextField
              label="Designation"
              {...register("designation", {
                required: "Designation is required",
              })}
              fullWidth
              required
            />

            <TextField
              select
              label="Employment Type"
              {...register("employmentType", {
                required: "Employment type is required",
              })}
              fullWidth
              required
            >
              <MenuItem value="Permanent">Permanent</MenuItem>
              <MenuItem value="Contract">Contract</MenuItem>
              <MenuItem value="Intern">Intern</MenuItem>
            </TextField>

            <TextField
              type="date"
              label="Joining Date"
              {...register("joiningDate", {
                required: "Joining date is required",
              })}
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ max: new Date().toISOString().split("T")[0] }}
              required
            />

            <TextField
              select
              label="Role"
              {...register("role", { required: "Role is required" })}
              fullWidth
              required
            >
              <MenuItem value="employee">Employee</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="hr">HR</MenuItem>
            </TextField>

            <TextField
              select
              label="Department"
              {...register("department", {
                required: "Department is required",
              })}
              fullWidth
              required
            >
              <MenuItem value="6934134862387c7f7906269a">Sales</MenuItem>
              <MenuItem value="IT">Information Technology</MenuItem>
              <MenuItem value="6936ad2424e6f9feafdd8636">
                Human Resources
              </MenuItem>
            </TextField>

            <TextField
              label="Address"
              {...register("address", { required: "Address is required" })}
              fullWidth
              required
            />

            <TextField
              select
              label="Status"
              {...register("status", { required: "Status is required" })}
              fullWidth
              required
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
              <MenuItem value="On Leave">On Leave</MenuItem>
              <MenuItem value="Resigned">Resigned</MenuItem>
            </TextField>

            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button sx={{ "&:focus": { outline: "none" } }} onClick={onClose}>
                Cancel
              </Button>
              <Button
                sx={{ "&:focus": { outline: "none" } }}
                type="submit"
                variant="contained"
              >
                {initialData ? "Update" : "Create"}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Drawer>
  );
}
