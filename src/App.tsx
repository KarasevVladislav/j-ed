import React, { useEffect, useMemo, useState } from 'react';

import data from './generated.json';

import Parser from './workers/parser.worker?worker';
import { Editor } from './modules';

import styles from './App.module.css';
import { AppContext } from './App-context';

type Chunk = {
	index: number;
  data: Record<string, unknown>[];
}

function App() {
	const [processedData, setData] = useState({
		chunks: {},
	});

	useEffect(() => {
		const parserWorker = new Parser();

		let currentIndex = 0;

		while (currentIndex < Math.ceil(data.length / 10)) {
			parserWorker.postMessage(data.slice(currentIndex * 10, (currentIndex + 1) * 10));
			currentIndex += 1;
		}

		parserWorker.onmessage = (event) => {
			console.log('received', currentIndex, event.data);
			// setData({
			// 	...processedData,
			// 	[currentIndex]: event.data,
			// });
		};

		return () => {
			parserWorker.terminate();
		};
	}, []);

	console.log('pd', processedData);

	return (
		<AppContext.Provider value={processedData}>
			<div className={styles.root}>
				<span>&#123;</span>
				<Editor jsonSize={data.length} />
				<span>&#125;</span>
			</div>
		</AppContext.Provider>
	);
}

export default App;
