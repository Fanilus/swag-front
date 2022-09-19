import styled from 'styled-components';
import { COLORS } from '../../helpers/colors';

export const StyledSpinner = styled.div`
	width: ${(props) => props.width + Math.ceil(props.width / 2)}px;
	height: ${(props) => props.width + Math.ceil(props.width / 2)}px;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;

	&:after {
		content: ' ';
		display: block;
		width: ${(props) => props.width}px;
		height: ${(props) => props.width}px;
		border-radius: 50%;
		border: 6px solid ${COLORS.BLACK};
		border-color: ${COLORS.BLACK} transparent ${COLORS.BLACK} transparent;
		animation: lds-dual-ring 1.2s linear infinite;
	}

	@keyframes lds-dual-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
