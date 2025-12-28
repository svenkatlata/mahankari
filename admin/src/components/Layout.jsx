import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Toolbar,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CollectionsIcon from "@mui/icons-material/Collections";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import GroupIcon from "@mui/icons-material/Group";
import ReviewsIcon from "@mui/icons-material/Reviews";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import logo from "../assets/logo2.png";
import AccountMenu from "./AccountMenu";

const drawerWidth = 240;

/* ---------- Drawer Styling ---------- */
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

/* ---------- AppBar Styling ---------- */
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: "#f1f1f1",
  color: "#671e4b",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

/* ---------- Drawer Component ---------- */
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Layout({ children }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Slideshow", icon: <CollectionsIcon />, path: "/slideshow" },
    { text: "Products", icon: <InventoryIcon />, path: "/products" },
    { text: "Categories", icon: <CategoryIcon />, path: "/categories" },
    { text: "Orders", icon: <ShoppingBagIcon />, path: "/orders" },
    { text: "Invoices", icon: <ReceiptIcon />, path: "/invoices" },
    { text: "Shipments", icon: <LocalShippingIcon />, path: "/shipments" },
    { text: "Reviews", icon: <ReviewsIcon />, path: "/reviews" },
    { text: "Users", icon: <GroupIcon />, path: "/users" },
    { text: "Support", icon: <SupportAgentIcon />, path: "/support" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => setOpen(true)}
            edge="start"
            sx={{ mr: 5, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <div className="flex items-center gap-2 justify-between w-full">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
              <Typography variant="h6" noWrap component="div" color="#481133">
                Mahankari
                <span className="text-sm text-gray-600 -mt-1 ml-2">
                  Threads & Tales
                </span>
                <span className="text-sm text-gray-600 -mt-1 ml-2">|</span>
                <span className="text-sm text-gray-600 -mt-1 ml-2 italic">
                  Admin Panel
                </span>
              </Typography>
            </div>
            <AccountMenu />
          </div>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        {/* Sidebar Menu */}
        <List sx={{ pt: 2 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to={item.dropdown ? undefined : item.path}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  "& .MuiListItemIcon-root": {
                    color: location.pathname === item.path ? "#4B7CF3" : "#555",
                    fontWeight: location.pathname === item.path ? 600 : 400,
                  },
                  "& .MuiListItemText-primary": {
                    color: location.pathname === item.path ? "#4B7CF3" : "#444",
                    fontWeight: location.pathname === item.path ? 600 : 400,
                  },
                  borderLeft: location.pathname === item.path ? "4px solid #4B7CF3" : "4px solid transparent",
                }}
                onClick={(e) => {
                  if (item.dropdown) {
                    e.preventDefault();
                    setOpen(true);
                    setOpenDropdown(
                      openDropdown === item.text ? null : item.text
                    );
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />

                {open && item.dropdown && (
                  <KeyboardArrowDownIcon
                    sx={{
                      transform:
                        openDropdown === item.text
                          ? "rotate(0deg)"
                          : "rotate(-90deg)",
                      transition: "transform 0.25s",
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
