import styled from 'styled-components';
import { COLORS } from '../../../helpers/colors';

export const SwagToastWrapper = styled.div`
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 99999999;
`;

export const SwagToast = styled.div`
  background-color: ${COLORS.BLACK};
  border-radius: 4px;
  max-width: 480px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  margin-top: 16px;
  display: flex;
  position: relative;
  cursor: pointer;
`;

export const SwagToastText = styled.div`
  padding: 16px 24px;
  line-height: 1.4;
  color: ${COLORS.WHITE};
`;
