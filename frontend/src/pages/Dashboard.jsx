import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "../api/axiosClient";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import Loader from "../components/common/Loader";
import CakeIcon from "@mui/icons-material/Cake";

const fetchStats = async () => {
  const { data } = await axiosClient.get("/dashboard");
  return data;
};

const fetchBirthdays = async () => {
  const { data } = await axiosClient.get("/employees/birthday");
  return data;
};

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: fetchStats,
    staleTime: 1000 * 60,
  });
  const { data: birthdayData, isLoading: loadingBirthdays } = useQuery({
    queryKey: ["upcomingBirthdays"],
    queryFn: fetchBirthdays,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading)
    return (
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    );

  const attendanceSeries = Array.isArray(data?.attendanceSeries)
    ? data.attendanceSeries
    : [
        { date: "Mon", present: 120, absent: 10 },
        { date: "Tue", present: 122, absent: 8 },
        { date: "Wed", present: 115, absent: 15 },
        { date: "Thu", present: 130, absent: 4 },
        { date: "Fri", present: 125, absent: 9 },
        { date: "Sat", present: 110, absent: 20 },
      ];

  const leavesTrend = Array.isArray(data?.leavesTrend)
    ? data.leavesTrend
    : [
        { name: "Jan", leaves: 3 },
        { name: "Feb", leaves: 5 },
        { name: "Mar", leaves: 2 },
        { name: "Apr", leaves: 4 },
        { name: "May", leaves: 6 },
        { name: "Jun", leaves: 1 },
      ];

  const stats = {
    totalEmployees: Number(data?.totalEmployees ?? 0),
    presentToday: Number(data?.presentToday ?? 0),
    leavesToday: Number(data?.leavesToday ?? 0),
    pending: Number(data?.pending ?? 0),
  };

  return (
    <DashboardLayout>
      <Grid
        container
        spacing={3}
        sx={{ minWidth: 0, minHeight: 0, width: "100%" }}
      >
        <Grid size={{ xs: 12, md: 3 }} sx={{ minWidth: 0, minHeight: 0 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">Employees</Typography>
            <Typography variant="h5">{stats.totalEmployees}</Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }} sx={{ minWidth: 0, minHeight: 0 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">Present Today</Typography>
            <Typography variant="h5">{stats.presentToday}</Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }} sx={{ minWidth: 0, minHeight: 0 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">Leaves Today</Typography>
            <Typography variant="h5">{stats.leavesToday}</Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }} sx={{ minWidth: 0, minHeight: 0 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">Pending Approvals</Typography>
            <Typography variant="h5">{stats.pending}</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} sx={{ minWidth: 0, minHeight: 0 }}>
          <Paper
            sx={{
              p: 2,
              height: 360,
              minWidth: 0,
              minHeight: 0,
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="subtitle1" mb={2}>
              Attendance Overview
            </Typography>
            <Box sx={{ flex: 1, minWidth: 0, minHeight: 1, width: "100%" }}>
              <ResponsiveContainer minWidth="100%" minHeight="100%">
                <AreaChart data={attendanceSeries}>
                  <defs>
                    <linearGradient
                      id="colorPresent"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="present"
                    stroke="#8884d8"
                    fill="url(#colorPresent)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }} sx={{ minWidth: 0, minHeight: 0 }}>
          <Paper
            sx={{
              p: 2,
              height: 360,
              minWidth: 0,
              minHeight: 0,
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="subtitle1" mb={2}>
              Leaves Trend
            </Typography>
            <Box sx={{ flex: 1, minWidth: 0, minHeight: 1, width: "100%" }}>
              <ResponsiveContainer
                width="100%"
                height="100%"
                style={{ minWidth: 1, minHeight: 1 }}
              >
                <BarChart data={leavesTrend}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="leaves" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }} sx={{ minWidth: 0, minHeight: 0 }}>
          <Paper
            sx={{
              p: 2,
              height: 360,
              overflow: "auto",
              minWidth: 0,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <CakeIcon color="primary" />
              <Typography variant="subtitle1">Upcoming Birthdays</Typography>
            </Box>
            {loadingBirthdays ? (
              <Loader />
            ) : birthdayData?.employees?.length > 0 ? (
              <List dense sx={{ flex: 1, minWidth: 0, minHeight: 0 }}>
                {console.log(birthdayData)}
                {birthdayData.employees.map((emp) => {
                  const empName =
                    emp.name.firstName && emp.name.lastName
                      ? `${emp.name.firstName} ${emp.name.lastName}`
                      : "Unknown";
                  const birthDate = emp.dob
                    ? new Date(emp.dob).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "N/A";
                  return (
                    <ListItem key={emp._id} sx={{ px: 0 }}>
                      <ListItemText primary={empName} secondary={birthDate} />
                      <Chip
                        label={
                          emp.diffDays === 0 ? "Today!" : `${emp.diffDays}d`
                        }
                        color={emp.diffDays === 0 ? "error" : "default"}
                        size="small"
                      />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No upcoming birthdays in the next 30 days
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
