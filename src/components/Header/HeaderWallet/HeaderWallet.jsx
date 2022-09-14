import React from 'react';
import { WalletButton } from '../../Buttons/WalletButton';
import { StyledHeaderWallet } from './styled';

const HeaderWallet = ({ color }) => {
	return (
		<StyledHeaderWallet color={color}>
			<WalletButton />
		</StyledHeaderWallet>
	);
};

export default HeaderWallet;
