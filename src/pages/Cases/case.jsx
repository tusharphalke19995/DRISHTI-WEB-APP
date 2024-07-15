import React, { createContext, useContext, useState } from 'react';
import { 
    Box, 
    Menu, 
    MenuItem, 
    Button, 
    Divider, 
    Typography,
    Grid,
    IconButton,
} from '@mui/material';
// import { v4 as uuidv4 } from 'uuid';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArchiveIcon from '@mui/icons-material/Archive';
import EditNoteIcon from '@mui/icons-material/EditNote';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled, alpha } from '@mui/material/styles';

import CaseTab from '../Cases/caseTab';
import CaseNotesModel from './CaseNotesModel.jsx';
import CaseNotesElementListModel from './CaseNotesList';

// import AlertMessage from '../../commons/AlertMessage';

// import { AlertInfo, CaseNotesDataType } from '../../../types/data-types';
import './case.scss';

// Contexts
const AlertsContext = createContext({ alertInfo: { open: false }, setAlertInfo: () => {} });
// const CaseNotesContext = createContext([]);

// Custom Hook to use alert messages
const useAlertMessages = () => useContext(AlertsContext);

// Styled Menu
const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow: `
            0px 4px 6px -1px rgba(0,0,0,0.13),
            0px 2px 4px -1px rgba(0,0,0,0.11)
        `,
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
            },
        },
    },
}));

const Case = () => {
    const [alertInfo, setAlertInfo] = useState({
        open: false,
        severity: "success",
        message: "",
    });
    const [caseNotes, setCaseNotes] = useState([]);
    const [isCaseNoteOpen, setIsCaseNoteOpen] = useState(false);
    const [isElementListOpen, setIsElementListOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [constituteItemsChecked, setConstituteItemsChecked] = useState([]);

    const open = Boolean(anchorEl);

    const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const submitCaseNote = (notes) => {
        if (notes) {
            const newNote = {
                id: uuidv4(),
                notes,
                createdAt: new Date(),
                submittedBy: "Satish on behalf of Judge",
                constituents: constituteItemsChecked,
            };
            setCaseNotes([...caseNotes, newNote]);
            setIsCaseNoteOpen(false);
            setAlertInfo({
                message: "Case notes uploaded successfully",
                severity: "success",
                open: true,
            });
        } else {
            // setAlertInfo({
            //     message: AlertMessages.caseNotesRequired.message,
            //     severity: AlertMessages.caseNotesRequired.severity,
            //     open: true,
            // });
        }
    };

    const handleElementItemCheck = (e) => {
        const { id, checked } = e.target;
        setConstituteItemsChecked((prev) =>
            checked ? [...prev, id] : prev.filter((item) => item !== id)
        );
    };

    return (
        
        <AlertsContext.Provider value={{ alertInfo, setAlertInfo }}>
                
                <div className="mx-9">
                    <Divider />
                    <div className="flex justify-between items-center my-4">
                        <Typography variant="subtitle2">Home / Cases / P1234567</Typography>
                    </div>
                    <Divider />
                    <Grid container spacing={1} my={1}>
                        <Grid item xs={12} lg={9}>
                            <div className="flex flex-col lg:flex-row items-center">
                                <Typography variant="h5" className="font-medium">Aparna VS Subarna</Typography>
                                <span className="text-gray-600 mx-2">| NIA138</span>
                                <span className="text-gray-600 mx-2">| Summons</span>
                            </div>
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <div className="flex flex-wrap justify-end items-center space-x-2">
                                <Button
                                    onClick={() => {
                                        setIsCaseNoteOpen(true);
                                        setConstituteItemsChecked([]);
                                    }}
                                    variant="contained"
                                    startIcon={<EditNoteIcon />}
                                    className="mb-2 lg:mb-0"
                                >
                                    Add Note
                                </Button>
                                <Button
                                    id="take-action-button"
                                    aria-controls={open ? 'demo-customized-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    variant="contained"
                                    disableElevation
                                    onClick={handleMenuClick}
                                    endIcon={<KeyboardArrowDownIcon />}
                                >
                                    Take Action
                                </Button>
                                <StyledMenu
                                    id="demo-customized-menu"
                                    MenuListProps={{ 'aria-labelledby': 'demo-customized-button' }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem onClick={handleMenuClose} disableRipple>
                                        <EditIcon />
                                        Edit
                                    </MenuItem>
                                    <MenuItem onClick={handleMenuClose} disableRipple>
                                        <FileCopyIcon />
                                        Duplicate
                                    </MenuItem>
                                    <Divider sx={{ my: 0.5 }} />
                                    <MenuItem onClick={handleMenuClose} disableRipple>
                                        <ArchiveIcon />
                                        Archive
                                    </MenuItem>
                                    <MenuItem onClick={handleMenuClose} disableRipple>
                                        <MoreHorizIcon />
                                        More
                                    </MenuItem>
                                </StyledMenu>
                            </div>
                        </Grid>
                    </Grid>
                    <CaseNotesModel
                        open={isCaseNoteOpen}
                        handleClose={() => setIsCaseNoteOpen(false)}
                        handleSubmit={submitCaseNote}
                        handleElementList={() => setIsElementListOpen(true)}
                    />
                    <CaseNotesElementListModel
                        open={isElementListOpen}
                        title="Constituent Elements for NIA138 Cases"
                        handleElementItemCheck={handleElementItemCheck}
                        handleClose={() => setIsElementListOpen(false)}
                    />
                    <CaseTab />
                </div>
            {/* </CaseNotesContext.Provider> */}
        </AlertsContext.Provider>
    );
};

export default Case;
