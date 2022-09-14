import styled from 'styled-components';
import { COLORS } from '../../../helpers/colors';

export const MessageDialogWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 9999999;
	display: ${({ show }) => (show ? 'flex' : 'none')};
	justify-content: center;
	align-items: center;
`;

export const MessageDialogBlur = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	background: rgba(255, 255, 255, 0.7);
	backdrop-filter: blur(28px);
`;

export const MessageDialogCardWrapper = styled.div`
	z-index: 1;
	width: 900px;

	@media (max-width: 992px) {
		padding: 24px;
		width: 100%;
	}
`;

export const Card = styled.div`
	width: 100%;
	height: 100%;
	margin: auto;
	background: ${COLORS.WHITE};
	box-shadow: ${({ shadow }) =>
		shadow ? '0 16px 60px rgba(13, 116, 75, 0.46)' : 'none'};
	border-radius: 10px;
	padding: 32px;

	@media (max-width: 576px) {
		padding: 24px;
	}
`;

export const CardHeader = styled.div`
	font-weight: 700;
	font-size: 30px;
	line-height: 150%;
	color: ${COLORS.BLACK};

	@media (max-width: 576px) {
		font-size: 22px;
	}
`;

export const CardBody = styled.div`
	padding: 30px 0;
	font-weight: 400;
	font-size: 18px;
	line-height: 150%;
	color: ${COLORS.BLACK};
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 20px;

	@media (max-width: 768px) {
		font-size: 16px;
	}

	@media (max-width: 576px) {
		flex-direction: column;
	}
`;

export const DialogMessage = styled.div`
	overflow: auto;
	white-space: pre-wrap;
	word-break: break-all;
`;

export const CardFooter = styled.div`
	display: flex;
	justify-content: ${({ justify }) => (justify ? justify : 'center')};

	button {
		width: 50%;
	}

	@media (max-width: 576px) {
		button {
			width: 100%;
		}
	}
`;
