import { Box } from '@mui/material';
import styled from 'styled-components';

export const Body = styled(Box)`
  grid-column: span 10;
  padding: 8px 0;
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(3, 1fr);
`;

export const Screenshot = styled.img`
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`;
