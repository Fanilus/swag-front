import styled from 'styled-components';
import { getActiveRouteColor, getRouteColor } from '../../../helpers/utils';

export const StyledBackLink = styled.a`
	font-weight: 400;
	font-size: 22px;
	line-height: 24px;
	text-decoration: none;
	display: ${({ visible }) => (visible ? 'block' : 'none')};
	color: ${({ color }) => getRouteColor(color)};

	&:hover {
		color: ${({ color }) => getActiveRouteColor(color)};
		cursor: pointer;
	}

	@media (max-width: 1536px) {
		font-size: 18px;
		line-height: 22px;
	}

	@media (max-width: 1366px) {
		font-size: 16px;
		line-height: 20px;
	}
`;
