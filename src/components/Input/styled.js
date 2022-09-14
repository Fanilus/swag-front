import styled from 'styled-components';
import { FormHelperText } from '@mui/material';
import { COLORS } from '../../helpers/colors';

export const InputError = styled(FormHelperText)`
  color: ${COLORS.DANGER} !important;
`;
