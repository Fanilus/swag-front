import Button from '@mui/material/Button';
import styled from 'styled-components';
import { COLORS } from '../../../helpers/colors';

export const StyledWalletButton = styled(Button)`
  display: flex !important;
  flex-direction: row !important;
  justify-content: flex-start !important;
  align-items: center !important;
  color: ${COLORS.WHITE} !important;
  font-size: 22px !important;
  line-height: 24px !important;
`;
