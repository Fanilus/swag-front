import { COLORS } from './colors';

export const getColor = (color) => {
	switch (color) {
		case 'black':
			return COLORS.BLACK;
		case 'green':
			return COLORS.GREEN;
		case 'gray':
			return COLORS.GRAY;
		case 'dark-gray':
			return COLORS.DARK_GRAY;
		case 'white':
			return COLORS.WHITE;
		case 'red':
			return COLORS.RED;
		default:
			return COLORS.GREEN;
	}
};

export const getBgColor = (color) => {
	switch (color) {
		case 'black':
			return COLORS.BLACK;
		case 'green':
			return COLORS.GREEN;
		case 'gray':
			return COLORS.GRAY;
		case 'white':
			return COLORS.WHITE;
		case 'red':
			return COLORS.RED;
		default:
			return COLORS.GREEN;
	}
};

export const getTextColorBasedOnBgColor = (color) => {
	switch (color) {
		case 'black':
			return COLORS.WHITE;
		case 'green':
			return COLORS.WHITE;
		case 'gray':
			return COLORS.BLACK;
		case 'white':
			return COLORS.BLACK;
		case 'red':
			return COLORS.WHITE;
		default:
			return COLORS.BLACK;
	}
};

export const getColorBasedOnBgColor = (color) => {
	switch (color) {
		case 'black':
			return COLORS.WHITE;
		case 'green':
			return COLORS.WHITE;
		case 'gray':
			return COLORS.BLACK;
		case 'white':
			return COLORS.BLACK;
		default:
			return COLORS.BLACK;
	}
};

export const getRouteColor = (color) => {
	switch (color) {
		case 'green':
			return COLORS.DARK_GREEN;
		case 'gray':
		case 'white':
			return COLORS.DARK_GRAY;
		default:
			return COLORS.DARK_GREEN;
	}
};

export const getActiveRouteColor = (color) => {
	switch (color) {
		case 'gray':
		case 'white':
			return COLORS.BLACK;
		default:
			return COLORS.WHITE;
	}
};
