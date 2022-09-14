import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { Layout } from './components/Layout';
import { MessageDialog } from './components/Containers/MessageDialog';
import { ToastProvider } from './components/Containers/Toast';

import { LoginPage } from './pages/LoginPage';
import { MainPage } from './pages/MainPage';
import { VotingPage } from './pages/VotingPage';
// import LoginService from './services/login.service';

function App() {
  // const [token, setToken] = useState(
  //   LoginService.state.accessToken || window.localStorage.getItem('accessToken')
  // );

  // useEffect(() => {
  //   const loginState$ = LoginService.state$.subscribe((state) => {
  //     setToken(state.accessToken);
  //   });

  //   return () => {
  //     loginState$.unsubscribe();
  //   };
  // }, []);

  return (
    <>
      <ToastProvider>
        <MessageDialog />

        <Routes>
          {/* {token ? ( */}
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Layout />}>
              <Route path="" element={<MainPage />} />
              <Route path="/voting" element={<VotingPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </>
          {/* ) : ( */}
          {/*   <>
          {/*     <Route path="/login" element={<LoginPage />} /> */}
          {/*     <Route path="/" element={<Navigate to="/login" replace />}> */}
          {/*       <Route path="*" element={<Navigate to="/login" replace />} /> */}
          {/*     </Route> */}
          {/*   </> */}
          {/* )} */}
        </Routes>
      </ToastProvider>
    </>
  );
}

export default App;
