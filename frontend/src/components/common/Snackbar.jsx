import { useEffect } from "react";
import MuiSnackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function Snackbar({
  open,
  message,
  type = "success",
  duration = 3000,
  onCloseSnackbar,
}) {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      onCloseSnackbar && onCloseSnackbar();
    }, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onCloseSnackbar]);

  return (
    <MuiSnackbar
      open={Boolean(open)}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      onClose={(_, reason) => {
        if (reason === "clickaway") return;
        onCloseSnackbar && onCloseSnackbar();
      }}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        severity={type}
        sx={{ width: "100%" }}
      >
        {message}
      </MuiAlert>
    </MuiSnackbar>
  );
}
