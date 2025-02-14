import React, { useState } from "react";
import classes from "./sidebar.module.scss";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import Logo from "../../../src/assets/logobase.svg";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";

import RamenDiningIcon from "@mui/icons-material/RamenDining";

import classNames from "classnames";

import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
const listButtonStyle = {
  minWidth: "26px",
  svg: {
    width: "20px",
    height: "20px",
  },
};

const Sidebar = () => {
  const navigate = useNavigate();
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
      className={
        isSidebarOpen ? classes.sidebarContainerOpen : classes.sidebarContainer
      }
    >
      <div className={classes.logoContainer}>
        <img src={Logo} width={40} alt="" />
        <span className={classes.logoTitle}>An initiaive by Govt. of India</span>
        <div className={classes.hamburgerIcon} onClick={toggleSidebar}>
          {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
      </div>
      <div>
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
                  {getActiveListItem("home") ? (
                    <DashboardIcon />
                  ) : (
                    <DashboardIcon />
                  )}
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
                  {getActiveListItem("case") ? (
                    <RamenDiningIcon />
                  ) : (
                    <RamenDiningIcon />
                  )}
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
         
         
      
          <ListItem disablePadding className={classes.customItem}>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon sx={listButtonStyle}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Logout"}
                classes={{
                  primary: classes.listItemText,
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
