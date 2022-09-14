import styled from 'styled-components';
import { getBgColor } from '../../../helpers/utils';
import { COLORS } from '../../../helpers/colors';

export const StyledInfoMessage = styled.p`
	font-weight: 700;
	font-size: 30px;
	line-height: 150%;
	margin: 0;
	padding: 0;
	color: ${({ color }) => (color ? getBgColor(color) : COLORS.BLACK)};
`;
