import { Box } from '@mui/material';
import styled from 'styled-components';

export const Frame = styled.iframe`
  width: 100%;
  height: 560px;
`;

export const Body = styled(Box)`
  grid-column: span 10;
  padding: 8px 0;
  display: grid;
  gap: 30px;
`;

export const FrameContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const ScreenshotsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 20px;
`;

export const Screenshot = styled.img`
  width: ${({ width }) => (width ? width : '520px')};
  &:hover {
    cursor: pointer;
  }
`;

export const ModalContent = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const FrameEmulator = styled.div`
  position: absolute;
  width: 100%;
  height: 560px;
  top: 0;
  z-index: -1;
`;

export const FrameWrapper = styled.div`
  width: 100%;
  height: 560px;
  position: relative;
`;
