import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Paper,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import Cookies from "js-cookie";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useEmployee } from "../../hooks/useEmployee";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Navbar({ onMenuClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: employeesData } = useEmployee();
  const rawUser = Cookies.get("user");
  const user = rawUser ? JSON.parse(rawUser) : null;
  const employees = React.useMemo(
    () => (Array.isArray(employeesData) ? employeesData : []),
    [employeesData]
  );

  const [search, setSearch] = React.useState("");
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  const [anchor, setAnchor] = React.useState(null);
  const open = Boolean(anchor);
  const handleOpen = (e) => setAnchor(e.currentTarget);
  const handleClose = () => setAnchor(null);

  const suggestions = React.useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return [];
    return employees
      .filter((emp) => {
        const fullName = `${emp.name?.firstName ?? ""} ${
          emp.name?.lastName ?? ""
        }`
          .trim()
          .toLowerCase();
        return fullName.startsWith(term);
      })
      .slice(0, 5);
  }, [search, employees]);

  const handleSelectEmployee = (empId) => {
    if (!empId) return;
    navigate(`/employees/${empId}`);
    setSearch("");
    setShowSuggestions(false);
    handleClose();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const term = search.trim().toLowerCase();
    if (!term) return;

    const match = suggestions[0];

    if (match?._id) {
      handleSelectEmployee(match._id);
    } else {
      alert("Employee not found");
    }
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={onMenuClick}
          sx={{ mr: 2, "&:focus": { outline: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          HRMS
        </Typography>

        <form onSubmit={handleSearch} style={{ marginRight: 32 }}>
          <Search
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search employee"
              inputProps={{ "aria-label": "search" }}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowSuggestions(true);
              }}
            />
            {showSuggestions && suggestions.length > 0 && (
              <Paper
                elevation={3}
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  mt: 1,
                  zIndex: 1301,
                }}
              >
                <List dense>
                  {suggestions.map((emp) => (
                    <ListItemButton
                      key={emp._id}
                      onMouseDown={() => handleSelectEmployee(emp._id)}
                    >
                      <ListItemText
                        primary={`${emp.name?.firstName ?? ""} ${
                          emp.name?.lastName ?? ""
                        }`.trim()}
                        secondary={emp.employeeCode || emp.empId || ""}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Paper>
            )}
          </Search>
        </form>

        <IconButton
          sx={{ "&:focus": { outline: "none" } }}
          onClick={handleOpen}
          color="inherit"
        >
          <Avatar sx={{ bgcolor: "#802af1ff" }}>
            {user?.name?.firstName?.[0]?.toUpperCase() ||
              user?.name?.[0]?.toUpperCase() ||
              "U"}
          </Avatar>
        </IconButton>

        <Menu anchorEl={anchor} open={open} onClose={handleClose}>
          <MenuItem sx={{ width: 200, p: 1 }} onClick={handleClose} fullWidth>
            <AccountCircleIcon sx={{ mr: 1 }} /> Profile
          </MenuItem>
          <MenuItem
            sx={{ width: 200, p: 1 }}
            onClick={() => {
              dispatch(logout());
              handleClose();
            }}
          >
            <LogoutIcon sx={{ mr: 1 }} /> Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
