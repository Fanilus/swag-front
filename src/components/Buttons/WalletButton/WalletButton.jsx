import React, { useEffect, useState } from 'react';
import { spliceAddress } from '../../../lib/lib';
import { StyledWalletButton } from './styled';
import WalletService from '../../../services/wallet.service';
import MessageDialogService from '../../../services/message-dialog.service';
import { HeaderNavLink } from '../../Header/styled';
import LoginService from '../../../services/login.service';

const WalletButton = () => {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const walletState$ = WalletService.state$.subscribe((state) => {
      setWallet(state);
    });

    return () => {
      walletState$.unsubscribe();
    };
  }, []);

  const walletHandler = async () => {
    try {
      if (wallet.connected) {
        await WalletService.disconnect();
        LoginService.disconnect();
      }
    } catch (e) {
      MessageDialogService.showError(e.message, 'Provider error');
    }
  };

  const getAddress = () => {
    return wallet.address ? spliceAddress(wallet.address) : '';
  };

  return (
    <>
      {wallet ? (
        <>
          {wallet.connecting ? (
            <div>Connecting...</div>
          ) : (
            <StyledWalletButton onClick={() => walletHandler()}>
              {wallet.connected ? (
                <>
                  {getAddress()} <br /> {wallet.networkName}
                </>
              ) : (
                <HeaderNavLink
                  to={'/login'}
                  className="route"
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1 }}
                >
                  Login
                </HeaderNavLink>
              )}
            </StyledWalletButton>
          )}
        </>
      ) : null}
    </>
  );
};

export default WalletButton;
