/// <reference lib="webworker" />

import { Json, JsonEntry, JsonEntryType } from '../types/chunks';
import { isValid } from 'date-fns';

declare let self: ServiceWorkerGlobalScope;

function checkIfEmail(email: string) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

function typeChecker(value: unknown): JsonEntryType {
	let result = JsonEntryType.INVALID;

	// Число проверяем в первую очередь, чтобы не получить ложное срабатывание на дате
	if (typeof value === 'number') {
		result = JsonEntryType.NUMBER;
	} else if (typeof value === 'string') {
		if (checkIfEmail(value)) {
			result = JsonEntryType.EMAIL;
		} else if (isValid(new Date(value))) {
			result = JsonEntryType.DATE;
		} else if (value.length > 100) {
			result = JsonEntryType.LONG_TEXT;
		} else {
			result = JsonEntryType.STRING;
		}
	} else if (typeof value === 'boolean') {
		result = JsonEntryType.BOOLEAN;
	}

	return result;
}

function parseJson(rawData: Record<string, unknown>[]): Json[] {
	return rawData.map((rawDataJson) => {
		const copy = { ...rawDataJson } as Json;
		const keys = Object.keys(rawDataJson);

		keys.forEach((key) => {
			const result = {} as JsonEntry;

			result.type = key === 'id' ? JsonEntryType.ID : typeChecker(rawDataJson[key]);
			result.value = rawDataJson[key];

			copy[key] = result;
		});

		return copy;
	});
}

self.addEventListener('message', (message) => {
	postMessage({
		payload: parseJson(message.data.payload),
		index: message.data.index,
	});
});
