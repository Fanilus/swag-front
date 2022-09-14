import React from 'react';
import { Direction } from './styled';

const ArrowIcon = ({ direction, size }) => {
	let rotate = 0;
	switch (direction) {
		case 'down':
			rotate = '-90deg';
			break;
		case 'up':
			rotate = '90deg';
			break;
		default:
			rotate = '0';
			break;
	}
	return (
		<Direction rotate={rotate}>
			<svg
				width={size ? size : 32}
				height={size ? size : 32}
				viewBox="0 0 32 32"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M11.5156 22L5.51562 16L11.5156 10M6.00063 16H28.0006H6.00063Z"
					stroke="black"
					strokeWidth="2"
					strokeMiterlimit="10"
				/>
			</svg>
		</Direction>
	);
};

export default ArrowIcon;
