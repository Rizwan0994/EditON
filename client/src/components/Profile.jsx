import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import React, { useState } from "react";
import {
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Box,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";

export const Profile = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (action) => {
    if (action === "logout") {
      props.onClick();
    } else if (action === "Edit Profile") {
      navigate("/editprofile");
    }
    setAnchorEl(null);
  };

  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton onClick={handleOpenMenu} size="small" sx={{ ml: 2 }}>
          <Avatar sx={{ width: 45, height: 45 }}>
            {props.auth.user.name.split(" ").map((word) => word.charAt(0))}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}>
        <MenuItem onClick={handleCloseMenu}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleCloseMenu("Edit Profile")}>
          <ListItemIcon>
            <ModeEditIcon />
          </ListItemIcon>
          <ListItemText>Edit Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleCloseMenu("logout")}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};
