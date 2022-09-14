import styled from 'styled-components';
import { COLORS } from '../../../helpers/colors';
import { getActiveRouteColor } from '../../../helpers/utils';

export const StyledHeaderWallet = styled.div`
  grid-column: span 2;

  div {
    padding: 14px 28px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    font-weight: 400;
    font-size: 22px;
    line-height: 24px;
    text-align: right;
    color: ${COLORS.WHITE};
    height: 100%;
    white-space: nowrap;

    &:hover {
      cursor: pointer;
      color: ${({ color }) => getActiveRouteColor(color)};
    }
  }

  @media (max-width: 1536px) {
    div {
      font-size: 18px;
      line-height: 22px;
    }
  }

  @media (max-width: 1366px) {
    div {
      font-size: 16px;
      line-height: 20px;
    }
  }

  @media (max-width: 992px) {
    display: none;
  }
`;
