import { Outlet } from "react-router-dom";
import classes from "./layout.module.scss";
import Sidebar from "../../components/Sidebar/sidebar";
import { useEffect } from "react";
import Header from "../../components/Header";
import {  useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
/**
 * The layout component for the application.
 * Renders the main content of the application.
 */
const Layout = () => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarOpen = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const initialValue = document.body.style.zoom;

    // Change zoom level on mount
    document.body.style.zoom = "100%";

    setIsSidebarOpen(!smScreen);

    return () => {
      // Restore default value
      document.body.style.zoom = initialValue;
    };
  }, []);

  const styles = {
    width: smScreen ? "100vw" : "calc(100vw - 207px)",
  };
  const isHideSidebarStyles = {
    width: "100vw",
  };

  return (
    <div className={classes.mainContainer}>
      {isSidebarOpen && <Sidebar handleSidebarOpen={handleSidebarOpen}/>}
      <div style={isSidebarOpen ? styles : isHideSidebarStyles}>
        <Header handleSidebarOpen={handleSidebarOpen} />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
