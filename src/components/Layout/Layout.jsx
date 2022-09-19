import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from '../Header';
import { Main, BodyWrapper } from './styled';

const Layout = () => {
  return (
    <>
      <Header />
      <Main>
        <BodyWrapper>
          <Sidebar />
          <Outlet />
        </BodyWrapper>
      </Main>
    </>
  );
};

export default Layout;
