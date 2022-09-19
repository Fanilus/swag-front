import React from 'react';
import { HeaderRoutes, HeaderToolbar, HeaderNavLink } from './styled';
import { routes } from './routes';
import { HeaderWallet } from './HeaderWallet';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }} id={'app_bar'}>
      <AppBar position="static">
        <HeaderToolbar>
          <HeaderRoutes visible={true}>
            {routes.map((route, idx) => (
              <HeaderNavLink
                key={idx}
                to={route.link}
                className="route"
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                {route.name}
              </HeaderNavLink>
            ))}
          </HeaderRoutes>
          <HeaderWallet />
        </HeaderToolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
