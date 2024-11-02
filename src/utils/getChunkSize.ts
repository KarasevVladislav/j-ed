export const getChunkSize = (jsonSize: number) => {
	switch (true) {
	case jsonSize <= 10:
		return 0;
	case jsonSize <= 100:
		return 10;
	default:
		return 100;
	}
};
