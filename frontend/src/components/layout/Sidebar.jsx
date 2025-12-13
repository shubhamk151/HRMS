import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  ListItem,
  Switch,
  Divider,
  ListSubheader,
  Tooltip,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { NavLink } from "react-router-dom";
import { useThemeMode } from "../../context/ThemeContext";
const drawerWidth = 240;
const collapsedWidth = 64;

export default function Sidebar({ collapsed = false }) {
  const { mode, toggleMode } = useThemeMode();
  const items = [
    { to: "/", label: "Dashboard", icon: <DashboardIcon /> },
    { to: "/employees", label: "Employees", icon: <PeopleIcon /> },
    { to: "/attendance", label: "Attendance", icon: <CheckCircleIcon /> },
    { to: "/leaves", label: "Leaves", icon: <EventNoteIcon /> },
    { to: "/payroll", label: "Payroll", icon: <ReceiptLongIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,
        transition: "width 0.3s",
        [`& .MuiDrawer-paper`]: {
          width: collapsed ? collapsedWidth : drawerWidth,
          boxSizing: "border-box",
          transition: "width 0.3s",
          overflowX: "hidden",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {items.map((item) => (
            <Tooltip
              title={collapsed ? item.label : ""}
              key={item.to}
              placement="right"
            >
              <ListItemButton
                key={item.to}
                component={NavLink}
                to={item.to}
                sx={{
                  "&.active": { backgroundColor: "rgba(0,0,0,0.08)" },
                  justifyContent: collapsed ? "center" : "flex-start",
                  px: collapsed ? 0 : 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: collapsed ? "auto" : 56,
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!collapsed && <ListItemText primary={item.label} />}
              </ListItemButton>
            </Tooltip>
          ))}
        </List>
        <Divider />
        <List
          subheader={
            !collapsed && (
              <ListSubheader component="div">Settings</ListSubheader>
            )
          }
        >
          <ListItem
            sx={{
              justifyContent: collapsed ? "center" : "flex-start",
              px: collapsed ? 0 : 2,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: collapsed ? "auto" : 56,
                justifyContent: "center",
              }}
            >
              <DarkModeIcon />
            </ListItemIcon>
            {!collapsed && (
              <>
                <ListItemText
                  primary="Dark mode"
                  secondary={mode === "dark" ? "On" : "Off"}
                />
                <Switch
                  edge="end"
                  checked={mode === "dark"}
                  onChange={toggleMode}
                />
              </>
            )}
            {collapsed && (
              <Switch
                checked={mode === "dark"}
                onChange={toggleMode}
                sx={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
              />
            )}
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
