import { Outlet } from "react-router-dom";
import classes from "./layout.module.scss";
import Sidebar from "../../components/Sidebar/sidebar";
import { useEffect } from "react";

/**
 * The layout component for the application.
 * Renders the main content of the application.
 */
const Layout = () => {
  useEffect(() => {
    const initialValue = document.body.style.zoom;

    // Change zoom level on mount
    document.body.style.zoom = "100%";

    return () => {
      // Restore default value
      document.body.style.zoom = initialValue;
    };
  }, []);

  return (
    <div className={classes.mainContainer}>
      <Sidebar />
      <div style={{ width: "calc(100vw - 201px)" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
