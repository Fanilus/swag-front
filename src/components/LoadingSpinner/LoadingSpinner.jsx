import React from 'react';
import { StyledSpinner } from './styled';

const LoadingSpinner = ({ size }) => {
	let width;

	switch (size) {
		case 'small':
			width = 80;
			break;
		case 'medium':
			width = 160;
			break;
		case 'big':
			width = 240;
			break;
		default:
			width = 80;
	}

	return <StyledSpinner width={width} />;
};

export default LoadingSpinner;
