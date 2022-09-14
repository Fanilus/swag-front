import styled from 'styled-components';
import { Container, FormControl } from '@mui/material';

export const LoginPageWrapper = styled(Container)`
  height: 100vh !important;
  display: flex !important;
  align-items: center !important;
`;

export const LoginForm = styled.form`
  width: 100%;
`;

export const LoginFormControl = styled(FormControl)`
  margin-bottom: 15px !important;
`;
