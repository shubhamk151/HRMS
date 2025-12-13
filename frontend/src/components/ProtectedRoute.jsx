import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = Cookies.get("token");
  const userRole = Cookies.get("role");

  // If no token → go to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles is provided → check role
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
