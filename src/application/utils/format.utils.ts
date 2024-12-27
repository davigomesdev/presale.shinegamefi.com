export const formatDate = (strDate: string): string => {
	const date = new Date(strDate);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
};

export const formatTimestampToDate = (timestamp: number): string => {
	const timestampInMilliseconds = timestamp * 1000;
	const date = new Date(timestampInMilliseconds);

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	const formattedDate = `${year}-${month}-${day}`;

	return formattedDate;
};

export const formatTruncateDecimal = (number: number, decimalPlaces: number): number => {
  const factor = Math.pow(10, decimalPlaces);
  return Math.trunc(number * factor) / factor;
};