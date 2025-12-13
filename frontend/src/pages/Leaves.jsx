import React, { useState } from "react";
import { Paper, Typography, Button, Stack, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "../api/axiosClient";
import LeaveFormDialog from "./leaves/LeaveFormDialog";
import Loader from "../components/common/Loader";

const fetchLeaves = async () => {
    const { data } = await axiosClient.get("/leaves");
    return data;
};

export default function LeavesPage() {
    const { data, isLoading } = useQuery(["leaves"], fetchLeaves);
    const [open, setOpen] = useState(false);

    if (isLoading) return <DashboardLayout><Loader /></DashboardLayout>;

    return (
        <DashboardLayout>
            <Typography variant="h5" mb={2}>Leaves</Typography>
            <Paper sx={{ p: 2 }}>
                <Stack direction="row" justifyContent="space-between" mb={2}>
                    <Button variant="contained" onClick={() => setOpen(true)}>Apply Leave</Button>
                </Stack>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>From</TableCell>
                            <TableCell>To</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(data?.leaves ?? []).map(l => (
                            <TableRow key={l._id}>
                                <TableCell>{l.employeeName ?? l.employee?.firstName}</TableCell>
                                <TableCell>{l.type}</TableCell>
                                <TableCell>{new Date(l.from).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(l.to).toLocaleDateString()}</TableCell>
                                <TableCell>{l.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <LeaveFormDialog open={open} onClose={() => setOpen(false)} />
        </DashboardLayout>
    );
}
