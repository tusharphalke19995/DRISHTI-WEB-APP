import React, { useState } from 'react';
import { 
  Box, 
  Modal, 
  Fade, 
  Typography,
  Button, 
  TextField
} from '@mui/material';
import { 
  CaseNotesContainerTop, 
  CaseNotesContainerBottom, 
  InfoAndTypeContainer, 
  InfoContainer, 
  ViewElementListText, 
  InfoText, 
  Title 
} from './style';
import { Close, Info } from '@mui/icons-material';
import './CaseNotesModel.scss';

const style = {
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

const CaseNotesModel = ({ open, handleClose, handleElementList, handleSubmit }) =>  {
  const [note, setNote] = useState("");

  const submitCaseNote = () => {
    handleSubmit(note);
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
        <Box sx={style}>
          <CaseNotesContainerTop>
            <Title id="case-notes-title">
              Case Notes
            </Title>
            <Close onClick={handleClose} style={{ cursor: 'pointer' }} />
          </CaseNotesContainerTop>
          <InfoAndTypeContainer>
            <InfoContainer>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
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
            <Button size="small" variant="contained" sx={{ textTransform: 'none' }} onClick={submitCaseNote}>
              Done
            </Button>
          </CaseNotesContainerBottom>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CaseNotesModel;
