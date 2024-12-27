//colors imports
import { neutralTheme, purpleTheme, bluishGrayTheme, greenTheme, redTheme } from './colors';

//fonts imports
import { family, weight, size } from './fonts';

//utils imports
import { dimensions, opacity, zIndices } from './utils';

export const theme = {
	colors: {
		neutralTheme,
		purpleTheme,
		bluishGrayTheme,
		greenTheme,
		redTheme,
	},
	font: { family, weight, size },
	utils: {
		dimensions,
		opacity,
		zIndices,
	},
};
