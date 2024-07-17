import React, { useState } from "react";
import classes from "./sidebar.module.scss";
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";

import { 
  Dashboard,
  RamenDining,
  ArrowBack
} from '@mui/icons-material'
import { useLocation, useNavigate } from "react-router-dom";

import Logo from "../../../src/assets/logobase.svg";

import classNames from "classnames";

import { useTheme } from "@emotion/react";
const listButtonStyle = {
  minWidth: "26px",
  svg: {
    width: "20px",
    height: "20px",
  },
};

const Sidebar = (handleSidebarOpen) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { pathname } = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isRoomOpen, setIsRoomOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const getActiveListItem = (key) => {
    switch (key) {
      case "home":
        return pathname === "/";
        break;
      case "userList":
        return pathname === "/userList";
        break;
      case "case":
        return pathname === "/case";
        break;
      case "starter":
        return pathname === "/starter";
        break;
      case "dssert":
        return pathname === "/dssert";
        break;
      case "breakfast":
        return pathname === "/breakfast";
        break;
      case "deluxeroom":
        return pathname === "/deluxeroom";
      case "standardroom":
        return pathname === "/standardroom";
      default:
        return false;
        break;
    }
  };

  const handleLogout = () => {
    sessionStorage.clear(); // Clear session storage
    navigate("/");
  };

  const toggleRoomMenu = () => {
    setIsRoomOpen(!isRoomOpen);
  };

  return (
    <div
      className={classNames({
        [classes.sidebarContainer]: true,
        [classes.smSidebarStyle]: smScreen,
      })}
    >
      <div className={classes.logoContainer}>
        <img src={Logo} width={40} alt="" />
        <span className={classes.logoTitle}>An initiaive by Govt. of India</span>
        {/* <div className={classes.hamburgerIcon} onClick={toggleSidebar}>
          {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </div> */}
      </div>
      <div>
        {smScreen && (
          <Box className={classes.backIconContainer}>
            <ArrowBack onClick={handleSidebarOpen} />
          </Box>
        )}
        <List sx={{ paddingTop: "12px" }}>
          <ListItem disablePadding className={classes.customItem}>
            <ListItemButton
              onClick={() => navigate("/layout")}
              className={classNames(classes.customListItemButton, {
                [classes.customListItemButtonActive]: getActiveListItem("home"),
              })}
            >
              <ListItemIcon sx={listButtonStyle}>
                <div>
                  <Dashboard />
                </div>
              </ListItemIcon>
              <ListItemText
                primary={"Dashboard"}
                classes={{
                  primary: classNames({
                    [classes.listItemText]: true,
                    [classes.activeListItemText]: getActiveListItem("home"),
                  }),
                }}
              />
            </ListItemButton>
          </ListItem>

      
          <ListItem disablePadding className={classes.customItem}>
            <ListItemButton
              onClick={() => navigate("/layout/case")}
              className={classNames(classes.customListItemButton, {
                [classes.customListItemButtonActive]:
                  getActiveListItem("case"),
              })}
            >
              <ListItemIcon sx={listButtonStyle}>
                <div>
                  <RamenDining />
                </div>
              </ListItemIcon>
              <ListItemText
                primary={"Case"}
                classes={{
                  primary: classNames({
                    [classes.listItemText]: true,
                    [classes.activeListItemText]:
                      getActiveListItem("case"),
                  }),
                }}
              />
            </ListItemButton>
          </ListItem>
         
         
      
         
        </List>
      </div>
    </div>
  );
};

export default Sidebar;
