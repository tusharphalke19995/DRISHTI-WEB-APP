import React, { useCallback, useEffect, useState, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  Box,
  Modal,
  Fade,
  Button,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  Checkbox,
  styled as muiStyled
} from '@mui/material';
import { Close, Check as CheckIcon } from '@mui/icons-material';
// Assuming these styled components exist and are correctly configured:
import {
  CaseNotesContainerTop,
  CaseNotesContainerBottom,
  ListItemText,
  ListContainer,
  Title
} from './style';
// Assuming CONSTITUTION_ELEMENT_CASE_DATA exists and is correctly configured:
// import { CONSTITUTION_ELEMENT_CASE_DATA } from '../../utils/samples';
import './CaseNotesList.scss';
import { BASE_URL } from '../../constants';
import { fetchElement } from '../../redux/slice/elementSlice';

// Inline styles for the modal
const modalStyle = {
  position: 'absolute',
  width: '90%',
  maxWidth: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  bottom: 20,
  right: 20,
  display: 'grid',
  borderRadius: '8px',
  outline: 'none',
  padding: '20px',
  transition: 'all 0.3s ease',
  '@media (min-width: 600px)': {
    width: 400,
    bottom: '10%',
    right: '10%',
  },
};

// Styled component for the list with custom scrollbar
const CustomList = muiStyled(List)({
  width: '100%',
  height: '100%',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '0.4em',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
    borderRadius: '6px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555',
  },
});

const CaseNotesElementListModel = memo(({ open, title, constituteItemsChecked, handleClose, handleElementItemCheck }) => {

  const elements = useSelector((state) => state.element.elements)

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          <CaseNotesContainerTop>
            <Title id="modal-title">
              {title}
            </Title>
            <Close onClick={handleClose} style={{ cursor: 'pointer' }} />
          </CaseNotesContainerTop>
          <ListContainer>
            <CustomList>
              {elements.map((data) => (
                <ListItem key={data.id.toString()}>
                  <ListItemIcon>
                    <Checkbox
                      id={data.id.toString()}
                      checked={constituteItemsChecked.includes(data.id)}
                      checkedIcon={<CheckIcon sx={{ color: '#3D3C3C' }} />}
                      onChange={handleElementItemCheck}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body2">{data.element}</Typography>
                  </ListItemText>
                </ListItem>
              ))}
            </CustomList>
          </ListContainer>
          <CaseNotesContainerBottom>
            <Button
              size="small"
              variant="outlined"
              sx={{ textTransform: 'none' }}
              onClick={handleClose}
            >
              Back
            </Button>
          </CaseNotesContainerBottom>
        </Box>
      </Fade>
    </Modal>
  );
});

export default CaseNotesElementListModel;
