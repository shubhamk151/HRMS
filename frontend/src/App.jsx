import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeesPage from "./pages/employees/Employees";
import LeavesPage from "./pages/Leaves";
import AttendancePage from "./pages/Attendance";
import ProtectedRoute from "./components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./app/store";
import ThemeProviderWithToggle from "./context/ThemeContext";
import EmployeeProfile from "./pages/EmployeeProfile";

const qc = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={qc}>
        <ThemeProviderWithToggle>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute allowedRoles={["admin", "HR"]}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employees"
                element={
                  <ProtectedRoute allowedRoles={["admin", "HR"]}>
                    <EmployeesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/leaves"
                element={
                  <ProtectedRoute allowedRoles={["admin", "HR"]}>
                    <LeavesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/attendance"
                element={
                  <ProtectedRoute allowedRoles={["admin", "HR"]}>
                    <AttendancePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employees/:id"
                element={
                  <ProtectedRoute allowedRoles={["admin", "HR"]}>
                    <EmployeeProfile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </ThemeProviderWithToggle>
      </QueryClientProvider>
    </Provider>
  );
}
