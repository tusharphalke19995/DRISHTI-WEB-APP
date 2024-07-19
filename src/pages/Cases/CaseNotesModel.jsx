import React, { memo, useEffect, useState } from 'react';
import { 
  Box, 
  Modal, 
  Fade, 
  Typography,
  Button, 
  TextField
} from '@mui/material';
import { Close, Info } from '@mui/icons-material';
import { 
  CaseNotesContainerTop, 
  CaseNotesContainerBottom, 
  InfoAndTypeContainer, 
  InfoContainer, 
  ViewElementListText, 
  InfoText, 
  Title 
} from './style';
import './CaseNotesModel.scss';

const modalStyle = {
  position: 'absolute',
  width: '90%',
  maxWidth: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '8px',
  outline: 'none',
  padding: '20px',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  transition: 'all 0.3s ease',
};

const CaseNotesModel = memo(({ open, noteData, handleClose, handleElementList, handleSubmit }) => {
  
  const [note, setNote] = useState("");

  useEffect(() => {
    if(noteData?.note) {
      setNote(noteData.note)
    }
  }, [noteData])

  const submitCaseNote = () => {
    let isNoteForEdit = noteData ? true : false
    handleSubmit(isNoteForEdit,  note);
    setNote(""); // Clear the input field after submission
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      aria-labelledby="case-notes-title"
      aria-describedby="case-notes-description"
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          <CaseNotesContainerTop>
            <Title id="case-notes-title">
              Case Notes
            </Title>
            <Close onClick={handleClose} style={{ cursor: 'pointer' }} />
          </CaseNotesContainerTop>
          <InfoAndTypeContainer>
            <InfoContainer>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Info style={{ color: '#0F3B8C', marginRight: 8 }} />
                <InfoText variant="subtitle1" sx={{ color: '#0A0A0A' }}>
                  Info
                </InfoText>
              </Box>
              <Typography id="case-notes-description" variant="body2" sx={{ color: '#555555' }}>
                Enter notes pertaining to this case. They will only be visible to you.
              </Typography>
            </InfoContainer>

            <TextField
              id="case-notes"
              hiddenLabel
              placeholder="Type here..."
              variant="outlined"
              multiline
              rows={8}
              fullWidth
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
          </InfoAndTypeContainer>
          <CaseNotesContainerBottom>
            <ViewElementListText 
              variant="subtitle1"
              onClick={handleElementList}
              sx={{ marginRight: 2, cursor: 'pointer', color: '#0A0A0A' }}
            >
              View Constituent Elements List
            </ViewElementListText>
            <Button 
              size="medium" 
              variant="contained"
              sx={{ textTransform: 'none' }} 
              onClick={submitCaseNote}
              disabled={!note.trim()} // Disable button if input is empty
            >
              Done
            </Button>
          </CaseNotesContainerBottom>
        </Box>
      </Fade>
    </Modal>
  );
});

export default CaseNotesModel;
