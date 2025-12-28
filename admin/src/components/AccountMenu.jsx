import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useAuth } from "../context/AuthContext";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { user, logout, loading } = useAuth();
  if (loading) return null;

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Box sx={{ ml: 2, width: 32, color: "action.active" }}>
          <Badge
            color="secondary"
            variant="dot"
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 2,
              },
            }}
          >
            <NotificationsIcon />
          </Badge>
        </Box>

        <Box sx={{ ml: 2, width: 32, color: "action.active" }}>
          <Badge
            color="secondary"
            variant="dot"
            sx={{
              "& .MuiBadge-badge": {
                top: 2,
              },
            }}
          >
            <MailIcon />
          </Badge>
        </Box>

        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              src={user?.avatar}
              sx={{ width: 32, height: 32, bgcolor: "action.active" }}
            >
              {user?.name?.charAt(0).toUpperCase() || "A"}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              minWidth: 200,
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",

            px: 2,
            py: 1.5,
          }}
        >
          <Avatar
              src={user?.avatar}
              sx={{ width: 40, height: 40, bgcolor: "action.active" }}
            >
              {user?.name?.charAt(0).toUpperCase() || "A"}
            </Avatar>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: "0.95rem" }}>
              {user?.name || "John Doe"}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.8rem",
                color: "text.secondary",
                lineHeight: 1.1,
              }}
            >
              {user?.email || "johndoe@example.com"}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 1 }} />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Log out
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
