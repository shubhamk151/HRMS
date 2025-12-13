import React from "react";
import { Paper, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Stack } from "@mui/material";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "../api/axiosClient";
import Loader from "../components/common/Loader";
import { useQueryClient } from "@tanstack/react-query";

const fetchAttendance = async () => {
    const { data } = await axiosClient.get("/attendance/today"); // adjust endpoint if needed
    return data;
};

export default function AttendancePage() {
    const { data, isLoading } = useQuery(["attendanceToday"], fetchAttendance);
    const qc = useQueryClient();

    if (isLoading) return <DashboardLayout><Loader /></DashboardLayout>;

    const handleMark = async (empId) => {
        await axiosClient.post("/attendance", { empId });
        qc.invalidateQueries(["attendanceToday"]);
    };

    return (
        <DashboardLayout>
            <Typography variant="h5" mb={2}>Attendance - Today</Typography>
            <Paper sx={{ p: 2 }}>
                <Stack direction="row" justifyContent="flex-end" mb={2}>
                    <Button variant="contained" onClick={() => qc.invalidateQueries(["attendanceToday"])}>Refresh</Button>
                </Stack>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee</TableCell>
                            <TableCell>In Time</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(data?.attendances ?? []).map(a => (
                            <TableRow key={a._id}>
                                <TableCell>{a.employeeName ?? a.employee?.firstName}</TableCell>
                                <TableCell>{a.inTime ? new Date(a.inTime).toLocaleTimeString() : "-"}</TableCell>
                                <TableCell>{a.status ?? (a.inTime ? "Present" : "Absent")}</TableCell>
                                <TableCell>
                                    {!a.inTime && <Button size="small" onClick={() => handleMark(a.employeeId || a.employee?._id)}>Mark Present</Button>}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </DashboardLayout>
    );
}
