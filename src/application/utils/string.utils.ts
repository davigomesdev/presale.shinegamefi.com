export const limitTextLength = (text: string, maxLength: number): string => {
	if (text.length > maxLength) {
		return `${text.substring(0, maxLength)} ...`;
	}
	return text;
};

export const limitDecimalPlaces = (number: number, maxDecimalPlaces = 7): string => {
	const numStr = number.toString();

	const decimalIndex = numStr.indexOf('.');

	if (decimalIndex === -1 || numStr.length - decimalIndex - 1 <= maxDecimalPlaces) {
		return numStr;
	}

	return numStr.slice(0, decimalIndex + maxDecimalPlaces + 1);
};
