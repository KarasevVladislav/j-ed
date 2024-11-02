/// <reference lib="webworker" />

import { Json, JsonEntry } from '../types/chunks';

declare let self: ServiceWorkerGlobalScope;

function parseJson(rawData: Record<string, unknown>[]): Json[] {
	return rawData.map((rawDataJson) => {
		const copy = { ...rawDataJson } as Json;
		const keys = Object.keys(rawDataJson);

		keys.forEach((key) => {
			const result = {} as JsonEntry;

			result.type = 'test';
			result.value = rawDataJson[key];

			copy[key] = result;
		});

		return copy;
	});
}

self.addEventListener('message', (message) => {
	postMessage(parseJson(message.data));
});
