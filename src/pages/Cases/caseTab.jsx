import React, { memo, useContext, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

// import './CaseTab.css'; // Assuming you have a separate stylesheet for custom styles
// import { CaseNotesContext } from './case';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const CaseTab = memo(function CaseTab() {
// const caseNotes = useContext(CaseNotesContext) || []; // Ensure caseNotes has a default value

  const [value, setValue] = useState(3);
  const [showCaseNoteAll, setShowCaseNoteAll] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab className="custom-tabs" label="Overview" {...a11yProps(0)} />
          <Tab className="custom-tabs" label="Case File" {...a11yProps(1)} />
          <Tab className="custom-tabs" label="Hearings" {...a11yProps(2)} />
          <Tab className="custom-tabs" label="Submissions" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="grid grid-cols-12 border-gray-200 p-4">
          <div className="col-span-12 lg:col-span-6">
            <h6 className="text-2xl font-medium">Case File</h6>
          </div>
          <div className="col-span-12 lg:col-span-6 text-right">
            <Button variant="contained" className="add-note">
              View All
            </Button>
          </div>

          {[1, 2, 3].map((item) => (
            <div key={item} className="col-span-12 lg:col-span-4 mx-4 my-5">
              <div className="card p-4 border border-gray-300 rounded-lg shadow-md bg-custom-blue">
                <div className="flex justify-between">
                  <div className="chips">
                    <p className="p-content text-lg font-semibold">Affidavit</p>
                  </div>
                  <div className="chips">
                    <ArrowOutwardIcon className="action-icon text-gray-500" />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="flex flex-col my-2">
                    <strong className="text-sm font-semibold">Proof of Response to Demand Notice</strong>
                  </div>
                  <div className="flex flex-col my-2">
                    <span className="card-key">Submitted By:</span>
                    <p className="card-value">Deewakar on behalf of Subarna</p>
                  </div>
                  <div className="flex flex-col my-2">
                    <span className="card-key">Date:</span>
                    <p className="card-value">23 March 2024</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="grid grid-cols-12 border-gray-200 p-4">
          <div className="col-span-12 lg:col-span-6">
            <h6 className="text-2xl font-medium">Case File</h6>
          </div>
          <div className="col-span-12 lg:col-span-6 text-right">
            <Button variant="contained" className="add-note">
              View All
            </Button>
          </div>

          {[1, 2].map((item) => (
            <div key={item} className="col-span-12 lg:col-span-4 mx-4 my-5">
              <div className="card p-4 border border-gray-300 rounded-lg shadow-md bg-custom-blue">
                <div className="flex justify-between">
                  <div className="chips">
                    <p className="p-content text-lg font-semibold">Affidavit</p>
                  </div>
                  <div className="chips">
                    <ArrowOutwardIcon className="action-icon text-gray-500" />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="flex flex-col my-2">
                    <strong className="text-sm font-semibold">Proof of Response to Demand Notice</strong>
                  </div>
                  <div className="flex flex-col my-2">
                    <span className="card-key">Submitted By:</span>
                    <p className="card-value">Deewakar on behalf of Subarna</p>
                  </div>
                  <div className="flex flex-col my-2">
                    <span className="card-key">Date:</span>
                    <p className="card-value">23 March 2024</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div className="grid grid-cols-12 border-gray-200 p-4">
          <div className="col-span-12 lg:col-span-6">
            <h6 className="text-2xl font-medium">Hearings To Review(6)</h6>
          </div>
          <div className="col-span-12 lg:col-span-6 text-right">
            <Button variant="contained" className="add-note">
              View All
            </Button>
          </div>

          {[1, 2, 3].map((item) => (
            <div key={item} className="col-span-12 lg:col-span-4 mx-4 my-5">
              <div className="card p-4 border border-gray-300 rounded-lg shadow-md bg-custom-blue">
                <div className="flex justify-between">
                  <div className="chips">
                    <p className="p-content text-lg font-semibold">Affidavit</p>
                  </div>
                  <div className="chips">
                    <ArrowOutwardIcon className="action-icon text-gray-500" />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="flex flex-col my-2">
                    <strong className="text-sm font-semibold">Proof of Response to Demand Notice</strong>
                  </div>
                  <div className="flex flex-col my-2">
                    <span className="card-key">Submitted By:</span>
                    <p className="card-value">Deewakar on behalf of Subarna</p>
                  </div>
                  <div className="flex flex-col my-2">
                    <span className="card-key">Date:</span>
                    <p className="card-value">23 March 2024</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <div className="grid grid-cols-12 border-gray-200 p-4">
          {/* <div className={"col-span-12 " + (caseNotes && caseNotes.length <= 3 ? "lg:col-span-12" : "lg:col-span-6")}>
            <h6 className="text-2xl font-medium">Submissions To Review ({caseNotes.length || 0})</h6>
          </div> */}
          {/* { caseNotes && caseNotes.length > 3 && 
            <div className={"col-span-12 lg:col-span-6 text-right"}>
              <Button variant="contained" className="add-note" onClick={() => setShowCaseNoteAll(!showCaseNoteAll)}>
                  { showCaseNoteAll ? "Hide" : "View All" }
              </Button>
            </div>
          } */}

          {/* {caseNotes && caseNotes.slice(0, showCaseNoteAll ? caseNotes.length : 3).map((item) => (
            <div key={item.id} className="col-span-12 lg:col-span-4 mx-4 my-5">
              <div className="card p-4 border border-gray-300 rounded-lg shadow-md bg-custom-blue">
                <div className="flex justify-between">
                  <div className="chips">
                    <p className="bg-color p-content text-lg font-semibold">Affidavit</p>
                  </div>
                  <div className="chips">
                    <ArrowOutwardIcon className="action-icon text-gray-500" />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="flex flex-col my-2">
                    <strong className="text-sm font-semibold">Proof of Response to Demand Notice</strong>
                  </div>
                  <div className="flex flex-col my-2">
                    <span className="card-key">Submitted By:</span>
                    <p className="card-value">{item.submittedBy}</p>
                  </div>
                  <div className="flex flex-col my-2">
                    <span className="card-key">Date:</span>
                    <p className="card-value">{item.createdAt.toDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))} */}
        </div>
      </CustomTabPanel>
    </Box>
  );
})

export default CaseTab;
