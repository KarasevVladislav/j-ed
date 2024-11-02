import React, { useEffect, useState } from 'react';

import data from './generated.json';

import Parser from './workers/parser.worker?worker';
import { Editor } from './modules';

import styles from './App.module.css';
import { AppContext } from './App-context';

function App() {
	const [processedData, setData] = useState({
		chunks: {},
	});

	useEffect(() => {
		const parserWorker = new Parser();

		let currentIndex = 0;

		while (currentIndex < Math.ceil(data.length / 10)) {
			parserWorker.postMessage({
				payload: data.slice(currentIndex * 10, (currentIndex + 1) * 10),
				index: currentIndex,
			});
			currentIndex += 1;
		}

		parserWorker.onmessage = (event) => {
			setData(prevState => ({
				chunks: {
					...prevState.chunks,
					[event.data.index]: event.data.payload,
				},
			}));
		};

		return () => {
			parserWorker.terminate();
		};
	}, []);

	console.log('Processed data:', processedData);

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
