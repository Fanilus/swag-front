import styled from 'styled-components';
import { COLORS } from '../../../helpers/colors';
import { getBgColor, getTextColorBasedOnBgColor } from '../../../helpers/utils';

export const Button = styled.button`
	background: ${({ color }) => getBgColor(color)};
	border: none;
	border-radius: 40px;
	padding: 19px;
	font-size: 16px;
	line-height: 19px;
	text-align: center;
	color: ${({ color }) => getTextColorBasedOnBgColor(color)};
	width: 100%;

	&:focus {
		box-shadow: none !important;
		color: ${({ color }) => getTextColorBasedOnBgColor(color)};
		background: ${({ color }) => getBgColor(color)};
	}

	&:hover {
		cursor: pointer;
	}

	&:hover,
	&:active {
		box-shadow: none !important;
		color: ${COLORS.WHITE};
		background: ${COLORS.DARK_GRAY};
	}

	&:disabled {
		box-shadow: none !important;
		color: ${COLORS.WHITE};
		background: #d7d7d7;
	}

	&.active {
		background: ${COLORS.GREEN};
		color: ${COLORS.WHITE};
	}
`;
