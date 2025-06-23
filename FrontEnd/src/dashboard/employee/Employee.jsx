import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";
import EmployeeLink from "./EmployeeLink";
import axios from "axios";
import Check from "./Check";

const drawerWidth = 240;

// Styled Main content area
const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  backgroundColor: "#121212",
  color: "#fff",
  minHeight: "100vh",
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

// Styled AppBar
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: "#111827",
  color: "#fff",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// Drawer header
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Employee = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const fullnameEmployee = async () => {
      try {
        const res = await axios.get("/api/v1/getEmployee");
        setName(res.data.verifyToken.fullname);
        console.log(name);
      } catch (error) {
        console.log(error);
      }
    };
    fullnameEmployee();
  }, []);

  const handelLogOut = async () => {
    try {
      await axios.get("/api/v1/logOut");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Check />
      <CssBaseline />
      <AppBar position="fixed" open={open}>
      <Toolbar sx={{ display: "flex", alignItems: "center", px: 2 }}>
  {/* Left: Drawer Toggle + Welcome */}
  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
    <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={handleDrawerOpen}
      edge="start"
      sx={{ ...(open && { display: "none" }) }}
    >
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" noWrap>
      Welcome, {name}
    </Typography>
  </Box>

  {/* Center: App Title */}
  <Box sx={{ flexGrow: 1, textAlign: "center" }}>
    <Typography
      variant="h6"
      sx={{
        fontWeight: "bold",
        fontSize: "1.6rem",
        color: "#38bdf8",
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      Employee MS
    </Typography>
  </Box>

  {/* Right: Logout Button */}
  <Button
    variant="contained"
    onClick={handelLogOut}
    sx={{ fontWeight: 600 }}
  >
    Logout
  </Button>
</Toolbar>

      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#121212",
            color: "#fff",
            borderRight: "1px solid lightGreen",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ color: "#fff" }}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ backgroundColor: "lightGreen" }} />

        {/* Drawer Navigation Items */}
        <EmployeeLink />
      </Drawer>

      <Main sx={{ backgroundColor: "#111827" }} open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
};

export default Employee;
