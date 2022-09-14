import styled from 'styled-components';
import { COLORS } from '../../../../helpers/colors';

export const FilterWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

export const FilterLabel = styled.div`
	font-size: 22px;
	line-height: 25px;
	color: ${COLORS.BLACK};
	margin-bottom: 8px;

	@media (max-width: 1366px) {
		font-size: 16px;
		line-height: 19px;
		margin-bottom: 7px;
	}
	@media (max-width: 576px) {
		margin-bottom: 4px;
	}
`;

export const FilterItem = styled.div`
	font-size: 22px;
	line-height: 25px;
	color: ${COLORS.DARK_GRAY};
	margin-bottom: 8px;

	&.active {
		color: ${COLORS.BLACK};

		&:hover {
			color: ${COLORS.BLACK};
		}
	}

	&:hover {
		cursor: pointer;
		color: ${COLORS.INPUT_FOCUS};
	}

	&:last-child {
		margin-bottom: unset;
		margin-right: unset;
	}

	@media (max-width: 1366px) {
		font-size: 16px;
		line-height: 19px;
		margin-bottom: 4px;
	}
	@media (max-width: 992px) {
		display: flex;
		justify-content: flex-start;
		flex-direction: row-reverse;
	}
	@media (max-width: 576px) {
		margin-bottom: 4px;
	}
`;
