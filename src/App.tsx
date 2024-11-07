import React, { useEffect, useMemo, useState } from 'react';

import data from './generated.json';

import Parser from './workers/parser.worker?worker';
import { Editor, Filter } from './modules';

import styles from './App.module.css';
import { AppContext } from './App-context';
import { Chunks, ProcessedJson } from './types/chunks';
import { useHelpers } from './hooks';

function App() {
	const [originalData, setOriginalData] = useState<ProcessedJson[]>([]);
	const [processedData, setData] = useState<ProcessedJson[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const {
		patchData, saveToFile, filters, filterData,
	} = useHelpers(originalData, processedData, setData);

	useEffect(() => {
		setIsLoading(true);
		const maxParsers = navigator.hardwareConcurrency;

		let currentIndex = 0;
		const jobSize = Math.ceil(data.length / maxParsers);
		const tempData: Chunks = {};

		const parserWorkers: Worker[] = new Array(maxParsers).fill(null).map(() => {
			const parserWorker = new Parser();

			parserWorker.onmessage = (event) => {
				tempData[event.data.index] = event.data.payload;

				if (Object.keys(tempData).length === jobSize) {
					const values = Object.values(tempData).flat();
					setData(values);
					setOriginalData(values);
					setIsLoading(false);
				}
			};

			return parserWorker;
		});

		while (currentIndex < jobSize) {
			parserWorkers[currentIndex % maxParsers].postMessage({
				payload: data.slice(currentIndex * maxParsers, (currentIndex + 1) * maxParsers),
				index: currentIndex,
			});
			currentIndex += 1;
		}

		return () => {
			parserWorkers.forEach((worker) => {
				worker.terminate();
			});
		};
	}, []);

	const contextValue = useMemo(() => ({
		patchData,
	}), [patchData]);

	return (
		<AppContext.Provider
			value={contextValue}
		>
			<h1>JSON Editor</h1>
			<h2>Double click for editing</h2>
			<Filter filters={filters} filterHandler={filterData} />
			<button type="button" onClick={saveToFile}>Save File</button>
			<div className={styles.root}>
				<span>&#123;</span>
				<Editor data={processedData} loading={isLoading} />
				<span>&#125;</span>
			</div>
		</AppContext.Provider>
	);
}

export default App;
