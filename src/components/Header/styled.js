import Toolbar from '@mui/material/Toolbar';
import styled from 'styled-components';
import { COLORS } from '../../helpers/colors';
import { getActiveRouteColor } from '../../helpers/utils';

import { NavLink } from 'react-router-dom';

export const HeaderNavLink = styled(NavLink)`
  color: ${COLORS.WHITE};
  text-decoration: none;
`;

export const HeaderToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

export const HeaderRoutes = styled.nav`
  padding: 28px;
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  flex-direction: row;
  justify-content: flex-start;
  gap: 40px;

  .route {
    font-weight: 400;
    font-size: 22px;
    line-height: 24px;
    color: ${COLORS.WHITE};
    text-decoration: none;

    &.route-active {
      color: ${({ color }) => getActiveRouteColor(color)};
    }

    &:hover {
      color: ${COLORS.WHITE};
    }
  }

  @media (max-width: 1536px) {
    .route {
      font-size: 18px;
      line-height: 22px;
    }
  }

  @media (max-width: 1366px) {
    .route {
      font-size: 16px;
      line-height: 20px;
    }
  }

  @media (max-width: 1200px) {
    gap: 15px;
  }

  @media (max-width: 992px) {
    display: none;
  }
`;
