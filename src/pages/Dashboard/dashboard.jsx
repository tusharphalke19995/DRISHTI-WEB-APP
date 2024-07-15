import React, { useEffect, useState } from "react";
import classes from "./dashboard.module.scss";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import { Padding } from "@mui/icons-material";

const Dashboard = () => {


  return (
    <Container maxWidth="xl" className={classes.dashboardContainer}>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Dashboard
      </Typography>
      
      <Typography variant="h3" style={{textAlign:'center',margin:'20px'}}>
        Coming Soon
      </Typography>
    </Container>
  );
};

export default Dashboard;
