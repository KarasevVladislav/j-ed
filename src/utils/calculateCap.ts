export const calculateCap = (totalSize: number, index: number) => {
	const cap = Math.floor(10 - (((index + 1) * 100 - totalSize) / 10)) + 1;

	if (cap <= 0) {
		return 10;
	}

	return cap;
};
