import React, { memo, useState } from 'react';
import { Tabs, Tab, Box, Button, Card, CardContent, Typography, Grid, Chip, IconButton } from '@mui/material';
import { SkipPrevious as SkipPreviousIcon, SkipNext as SkipNextIcon, PlayArrow as PlayArrowIcon } from '@mui/icons-material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import './castab.scss';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box className="tab-content">{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const CaseTab = memo(function CaseTab() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="case-tabs-wrapper">
      <Box className="tabs-header">
        <Tabs
          value={value} 
          onChange={handleChange} 
          aria-label="case tabs" 
          variant="scrollable" 
          scrollButtons="auto"
        >
          <Tab className="custom-tabs" label="Overview" {...a11yProps(0)} />
          <Tab className="custom-tabs" label="Case File" {...a11yProps(1)} />
          <Tab className="custom-tabs" label="Hearings" {...a11yProps(2)} />
          <Tab className="custom-tabs" label="Submissions" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TabContent title="Overview" items={[1, 2, 3]} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TabContent title="Case File" items={[1, 2]} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <TabContent title="Hearings To Review(6)" items={[1, 2, 3]} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <TabContent title="Submissions To Review" items={[1, 2, 3, 4]} />
      </CustomTabPanel>
    </Box>
  );
});

const TabContent = ({ title, items }) => (
  <Box sx={{ padding: 2 }}>
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Typography variant="h6" sx={{ fontWeight: 'medium' }}>{title}</Typography>
      </Grid>
      

      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item}>
          <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 0 auto', justifyContent: 'space-between' }}>
            
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              
                <Box sx={{ ml: 1, flex: 1 }}>
                  <Chip label="Affidavit" className="chip" />
                  <IconButton sx={{  float:'right' }}>
                  <ArrowOutwardIcon />
                </IconButton>
                  <Typography variant="subtitle1" color="text.secondary">
                    Proof of Response to Demand Notice
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Submitted By:</strong> Diwakar on behalf of Aparna
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Date:</strong> 23 March 2024
                  </Typography>
                </Box>
              </CardContent>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default CaseTab;
