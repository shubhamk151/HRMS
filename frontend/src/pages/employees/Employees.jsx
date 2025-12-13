import React, { useState } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TablePagination,
  Stack,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Loader from "../../components/common/Loader";
import { useEmployee } from "../../hooks/useEmployee";
import EmployeeFormDrawer from "./EmployeeFormDrawer";
import axiosClient from "../../api/axiosClient";
import { useQueryClient } from "@tanstack/react-query";
import Snackbar from "../../components/common/Snackbar";

export default function EmployeesPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [edit, setEdit] = useState(null);
  const [open, setOpen] = useState(false);

  const qc = useQueryClient();
  const { data, isLoading } = useEmployee();
  const employees = Array.isArray(data) ? data : [];
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const handleDelete = async (id) => {
    if (!confirm("Delete employee?")) return;
    try {
      await axiosClient.delete(`/employees/terminate/${id}`);
      setSnackbar({
        open: true,
        message: "Employee deleted successfully",
        type: "success",
      });
      qc.invalidateQueries({ queryKey: ["employees"] });
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Delete failed";
      setSnackbar({ open: true, message: msg, type: "error" });
    }
  };

  return (
    <DashboardLayout>
      <Paper sx={{ p: 2, pt: 0 }}>
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Button
            sx={{ mt: 2, "&:focus": { outline: "none" } }}
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEdit(null);
              setOpen(true);
            }}
          >
            Add Employee
          </Button>
        </Stack>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Emp ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees
                  .map((emp) => (
                    <TableRow key={emp._id}>
                      <TableCell>
                        <a
                          href={`/employees/${emp._id}`}
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            transition: "color 0.3s",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget.style.color = "#00ffd5ff"),
                              (e.currentTarget.style.textDecoration =
                                "underline");
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget.style.color = "inherit"),
                              (e.currentTarget.style.textDecoration = "none");
                          }}
                        >
                          {emp.empId ?? emp.employeeCode}
                        </a>
                      </TableCell>
                      <TableCell>
                        {(emp.name?.firstName ?? "").trim()}{" "}
                        {(emp.name?.lastName ?? "").trim()}
                      </TableCell>
                      <TableCell>{emp.email}</TableCell>
                      <TableCell>{emp.department?.code ?? "N/A"}</TableCell>
                      <TableCell>{emp.role}</TableCell>
                      <TableCell
                        sx={{
                          color: emp.status === "Active" ? "#00ffd5ff" : "red",
                        }}
                      >
                        {emp.status}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          sx={{ "&:focus": { outline: "none" } }}
                          onClick={() => {
                            setEdit(emp);
                            setOpen(true);
                          }}
                        >
                          <EditIcon
                            sx={{
                              color: "blue",
                              opacity: 0.7,
                              "&:hover": { opacity: 1 },
                            }}
                          />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(emp._id)}
                          sx={{
                            "&:hover": { opacity: 1, color: "red" },
                            "&:focus": { outline: "none" },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                  .reverse()}
              </TableBody>
            </Table>

            <TablePagination
              component="div"
              count={Array.isArray(employees) ? employees.length : 0}
              page={page - 1}
              onPageChange={(e, p) => setPage(p + 1)}
              rowsPerPage={limit}
              onRowsPerPageChange={(e) => {
                setLimit(parseInt(e.target.value, 10));
                setPage(1);
              }}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </>
        )}
      </Paper>

      <EmployeeFormDrawer
        open={open}
        onClose={() => setOpen(false)}
        initialData={edit}
        onCloseSnackbar={(message, type) =>
          setSnackbar({ open: true, message, type })
        }
      />
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        type={snackbar.type}
        onCloseSnackbar={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
    </DashboardLayout>
  );
}
