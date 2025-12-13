import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axiosClient from "../../api/axiosClient";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

export default function LeaveFormDialog({ open, onClose }) {
    const { control, handleSubmit } = useForm({
        defaultValues: { type: "casual", from: dayjs().format("YYYY-MM-DD"), to: dayjs().format("YYYY-MM-DD"), reason: "" }
    });
    const qc = useQueryClient();

    const onSubmit = async (vals) => {
        await axiosClient.post("/leaves", vals);
        qc.invalidateQueries(["leaves"]);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Apply Leave</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Stack spacing={2}>
                        <Controller name="type" control={control} render={({ field }) => <TextField {...field} label="Leave Type" />} />
                        <Controller name="from" control={control} render={({ field }) => <TextField {...field} label="From" type="date" InputLabelProps={{ shrink: true }} />} />
                        <Controller name="to" control={control} render={({ field }) => <TextField {...field} label="To" type="date" InputLabelProps={{ shrink: true }} />} />
                        <Controller name="reason" control={control} render={({ field }) => <TextField {...field} label="Reason" multiline rows={3} />} />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained">Apply</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
