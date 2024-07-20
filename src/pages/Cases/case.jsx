import React, { createContext, memo, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
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

import './case.scss';
import { useCallback } from 'react';
import { addNote, fetchNotes, updateNote } from '../../redux/slice/noteSlice.js';
import { subscribe, unsubscribe } from './event.js';
import { fetchElement } from '../../redux/slice/elementSlice.js';

// Contexts
const AlertsContext = createContext({ alertInfo: { open: false }, setAlertInfo: () => {} });

// Custom Hook to use alert messages
const useAlertMessages = () => useContext(AlertsContext);
// Styled Menu Component
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

const Case = memo(({caseId = "82c292bc22804f13995dfab40c60c9be" }) => {
    const dispatch = useDispatch();

    const [alertInfo, setAlertInfo] = useState({
        open: false,
        severity: "success",
        message: "",
    });

    const [noteData, setNoteData] = useState(null)
    const [isCaseNoteOpen, setIsCaseNoteOpen] = useState(false);
    const [isElementListOpen, setIsElementListOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [constituteItemsChecked, setConstituteItemsChecked] = useState([]);

    const open = Boolean(anchorEl);

    const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    useEffect(() => {
        dispatch(fetchNotes(caseId))
        dispatch(fetchElement(caseId))
    }, [dispatch, caseId])


    useEffect(() => {
        subscribe("noteForEdit", handleCardItemClick)

        return(() => {
            unsubscribe("noteForEdit", handleCardItemClick)
        })
    }, [])

    const submitCaseNote = (isNoteForEdit, newNote) => {
        if (newNote) {
            const newNoteData = {
                note: newNote,
                caseId: caseId,
                submittedBy: "04ef1d73f1824cd4b1609f3f8255e136",
                constituteElements: constituteItemsChecked,
            };

            let editNoteId = isNoteForEdit && noteData.id

            console.log("submitCaseNote", newNoteData)

            isNoteForEdit 
                ? dispatch(updateNote({noteId: editNoteId, edditedNote: newNoteData}))
                : dispatch(addNote(newNoteData))

            setIsCaseNoteOpen(false)
            setConstituteItemsChecked([])
            setNoteData(null)    
        } else {
            setAlertInfo({
                message: "Case notes are required.",
                severity: "error",
                open: true,
            });
        }
    };

    const handleElementItemCheck = useCallback((e) => {
        const { id, checked } = e.target;

        console.log("handleElementItemCheck", id, checked, constituteItemsChecked)

        setConstituteItemsChecked((prev) =>
            checked ? [...prev, id] : prev.filter((item) => item !== id)
        );
    }, [constituteItemsChecked]);

    const handleCardItemClick = (e) => {
        const { noteData, isNoteForEdit } = e.detail

        console.log("handleCardItemClick", noteData)

        if(isNoteForEdit && noteData) {
            setNoteData(noteData)
            setConstituteItemsChecked(noteData.constituteElements || [])
            setIsCaseNoteOpen(true)
        }
    }

    return (
        <AlertsContext.Provider value={{ alertInfo, setAlertInfo }}>
            <Box className="custom-container">
                <Box className="header-box">
                    <Typography variant="subtitle2">Home / Cases / P1234567</Typography>
                </Box>
                <Divider />
                <Grid container spacing={2} my={1}>
                    <Grid item xs={12} lg={9}>
                        <Box className="case-title-box">
                            <Typography variant="h5" className="case-title">Aparna VS Subarna</Typography>
                            <Typography variant="body2" className="case-id">| NIA138</Typography>
                            <Typography variant="body2" className="case-status">| Summons</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <Box className="action-buttons-box">
                            <Button
                                onClick={() => {
                                    setIsCaseNoteOpen(true);
                                    setConstituteItemsChecked([]);
                                }}
                                variant="contained"
                                startIcon={<EditNoteIcon />}
                                className="action-button"
                            >
                                Add Note
                            </Button>
                            <Button
                                onClick={handleMenuClick}
                                variant="contained"
                                endIcon={<KeyboardArrowDownIcon />}
                                className="action-button"
                            >
                                Take Action
                            </Button>
                            
                            <StyledMenu
                                id="customized-menu"
                                MenuListProps={{ 'aria-labelledby': 'customized-button' }}
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
                        </Box>
                    </Grid>
                </Grid>
                <CaseNotesModel
                    open={isCaseNoteOpen}
                    noteData={noteData}
                    handleClose={() => setIsCaseNoteOpen(false)}
                    handleSubmit={submitCaseNote}
                    handleElementList={() => setIsElementListOpen(true)}
                />
                <CaseNotesElementListModel
                    open={isElementListOpen}
                    constituteItemsChecked={constituteItemsChecked}
                    title={"Constituent Elements for NIA138 Cases"}
                    handleElementItemCheck={handleElementItemCheck}
                    handleClose={() => setIsElementListOpen(false)}
                />
                <CaseTab />
            </Box>
        </AlertsContext.Provider>
    );
});

export default Case;
