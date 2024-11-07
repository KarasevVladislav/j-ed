import { useCallback, useMemo } from 'react';
import { ProcessedJson } from '../types/chunks';

export const useHelpers = (originalData: ProcessedJson[], processedData: ProcessedJson[], dataSetter: React.Dispatch<React.SetStateAction<ProcessedJson[]>>) => {
	const patchData = useCallback((index: number, key: string, value: unknown) => {
		const updatedChunks = [...processedData];
		updatedChunks[index][key].value = value;

		dataSetter(updatedChunks);
	}, [dataSetter, processedData]);

	const filters = useMemo(() => Array.from(new Set(originalData.flatMap(chunk => Object.keys(chunk)))), [originalData]);

	const filterData = useCallback((filterBy: string, value: string) => {
		if (!value) {
			dataSetter(originalData);
			return;
		}

		const filtredChunks = [...originalData].filter((entry) => {
			return String(entry[filterBy].value).toLowerCase().includes(value.toLowerCase());
		});

		dataSetter(filtredChunks);
	}, [dataSetter, originalData]);

	const saveToFile = useCallback(() => {
		const blob = new Blob([JSON.stringify(processedData)], { type: 'application/json' });
		const link = document.createElement('a');
		const url = URL.createObjectURL(blob);
		link.href = url;
		link.download = 'edited_data.json';
		document.body.appendChild(link);
		link.click();

		setTimeout(() => {
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);
		}, 0);
	}, [processedData]);

	return {
		patchData,
		saveToFile,
		filters,
		filterData,
	};
};
