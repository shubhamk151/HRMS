import React from "react";
import { Box, CircularProgress } from "@mui/material";

export default function Loader() {
    return (
        <Box display="flex" alignItems="center" justifyContent="center" p={3}>
            <CircularProgress />
        </Box>
    );
}
