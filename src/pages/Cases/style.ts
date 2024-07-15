import { Box, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";

export const CaseNotesContainerTop = styled(Box)`
  width: 100%;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e8e8e8;
`;

export const Title = styled(Typography)`
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
  color: #0a0a0a;
`;

export const CaseNotesContainerBottom = styled(Box)`
  width: 100%;
  height: 60px;
  padding: 16px 24px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #e8e8e8;
`;

export const CaseNoteTextField = styled(TextField)`
  width: 100%;
  margin-top: 20px;
`;

export const InfoAndTypeContainer = styled(Box)`
  margin: 24px;
`;

export const ListContainer = styled(Box)`
  margin: 24px;
  height: 300px;
  max-height: 300px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
`;

export const InfoContainer = styled(Box)`
  padding: 8px;
  background: #ecf3fd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const InfoText = styled(Typography)`
  font-size: 16px;
  font-weight: 700;
  color: #0a0a0a;
  margin-left: 6px;
`;

export const ViewElementListText = styled(Typography)`
  font-size: 16px;
  font-weight: 700;
  color: #007e7e;
  cursor: pointer; /* added cursor to indicate clickable element */
`;

export const ListItemText = styled(Typography)`
  font-size: 14px;
  font-weight: 400;
  color: #3d3c3c;
`;
