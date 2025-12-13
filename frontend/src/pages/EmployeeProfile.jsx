import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Divider,
  Grid,
  Button,
  Paper,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEmployee } from "../hooks/useEmployee";
import Loader from "../components/common/Loader";
import DashboardLayout from "../components/layout/DashboardLayout";

const EmployeeProfile = () => {
  const { id } = useParams();
  const { data } = useEmployee();
  const employees = Array.isArray(data) ? data : [];

  const employee = employees.find((emp) => emp._id === id);
  if (!employee) {
    return (
      <Typography variant="h6" mt={5} textAlign="center">
        <Loader />
      </Typography>
    );
  }

  return (
    <DashboardLayout>
      <Paper sx={{ p: 2, pt: 0 }}>
        <Box p={4}>
          <Card sx={{ maxWidth: 900, margin: "0 auto", borderRadius: 3 }}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{ width: 70, height: 70, bgcolor: "primary.main" }}
                  src={
                    employee.profileImage ||
                    "https://media.istockphoto.com/id/2202893441/photo/businesswoman-smiling-and-looking-up-while-holding-mobile-phone-in-modern-office.jpg?s=1024x1024&w=is&k=20&c=z4pqA5qoa2J32a3DUk_SAFJuw-iiqzqoN8Y61tJUxsY="
                  }
                >
                  {employee.firstName?.charAt(0)}
                  {employee.lastName?.charAt(0)}
                </Avatar>
              }
              title={
                <Typography variant="h5" fontWeight={700}>
                  {employee.name.firstName} {employee.name.lastName}
                </Typography>
              }
              subheader={employee.designation}
            />

            <Divider />

            <CardContent>
              {/* BASIC INFORMATION */}
              <Typography variant="h6" mb={2} fontWeight={700}>
                Basic Information
              </Typography>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography fontWeight={600}>Employee ID</Typography>
                  <Typography>{employee.employeeCode}</Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography fontWeight={600}>Email</Typography>
                  <Typography>{employee.email}</Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography fontWeight={600}>Phone</Typography>
                  <Typography>{employee.phone}</Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography fontWeight={600}>Department</Typography>
                  <Typography>{employee.department.code}</Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography fontWeight={600}>Designation</Typography>
                  <Typography>{employee.designation}</Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography fontWeight={600}>Date of Joining</Typography>
                  <Typography>{employee.joiningDate?.slice(0, 10)}</Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              {/* PERSONAL DETAILS */}
              <Typography variant="h6" mb={2} fontWeight={700}>
                Personal Details
              </Typography>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography fontWeight={600}>Gender</Typography>
                  <Typography>{employee.gender}</Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography fontWeight={600}>DOB</Typography>
                  <Typography>{employee.dob?.slice(0, 10)}</Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 12 }}>
                  <Typography fontWeight={600}>Address</Typography>
                  <Typography>{employee.address}</Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              {/* ACTION BUTTONS */}
              <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
                <Button variant="outlined" color="primary">
                  Edit Profile
                </Button>
                <Button variant="contained" color="error">
                  Delete Employee
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Paper>
    </DashboardLayout>
  );
};

export default EmployeeProfile;
