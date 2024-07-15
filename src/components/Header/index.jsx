import React, { useState } from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Button,
  ListItemIcon,
  Divider,
  Badge,
} from "@mui/material";
import classes from "./Header.module.scss";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

import moment from "moment";

const Header = ({ handleSidebarOpen = () => {} }) => {


  const navigate = useNavigate();

 

  const handleAvatarClick = (event) => {
    setAvatarAnchorEl(event.currentTarget);
  };



  return (
    <div className={classes.headerContainer}>
          <Box display={"flex"} alignItems={"center"} gap={"10px"}>
        <MenuIcon sx={{ cursor: "pointer" }} onClick={handleSidebarOpen} />
        <span className={classes.title}>
        An initiaive by Govt. of India
        </span>
      </Box>
      <Box display={"flex"} alignItems={"center"} gap={"10px"}>
        <Avatar
          src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?size=338&ext=jpg&ga=GA1.1.1141335507.1718150400&semt=ais_user"
          sx={{
            bgcolor: "transparent",
            border: "1px solid var(--border-color)",
            color: "var(--text-color)",
            cursor: "pointer",
          }}
          onClick={handleAvatarClick}
        >
          TS
        </Avatar>
       
      </Box>
    </div>
  );
};

export default Header;
