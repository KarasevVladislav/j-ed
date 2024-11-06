import '@vitest/web-worker';
import ParserWorker from './parser.worker?worker';
import { expect, test } from 'vitest';
import { JsonEntryType } from '../types/chunks';

const TEST_JSON = {
	id: '672b9e19cc1f2b6ceedaf0f6',
	index: 0,
	isActive: false,
	balance: '$2,977.92',
	email: 'nadiamarshall@ecosys.com',
	about: `Elit cupidatat exercitation labore officia excepteur sit
  anim do. Laboris deserunt incididunt nostrud commodo ullamco eu ea 
  adipisicing commodo anim consectetur proident ullamco reprehenderit. 
  Dolore minim deserunt et esse laborum esse qui id aliqua sunt aute proident officia. 
  Aute qui consequat ullamco ex sunt. Ea quis ad non laboris eu.\r\n`,
	registered: '2020-01-19',
};

const RESULT_JSON = {
	id: {
		type: JsonEntryType.ID,
		value: '672b9e19cc1f2b6ceedaf0f6',
	},
	index: {
		type: JsonEntryType.NUMBER,
		value: 0,
	},
	isActive: {
		type: JsonEntryType.BOOLEAN,
		value: false,
	},
	balance: {
		type: JsonEntryType.STRING,
		value: '$2,977.92',
	},
	email: {
		type: JsonEntryType.EMAIL,
		value: 'nadiamarshall@ecosys.com',
	},
	about: {
		type: JsonEntryType.LONG_TEXT,
		value: `Elit cupidatat exercitation labore officia excepteur sit
  anim do. Laboris deserunt incididunt nostrud commodo ullamco eu ea 
  adipisicing commodo anim consectetur proident ullamco reprehenderit. 
  Dolore minim deserunt et esse laborum esse qui id aliqua sunt aute proident officia. 
  Aute qui consequat ullamco ex sunt. Ea quis ad non laboris eu.\r\n`,
	},
	registered: {
		type: JsonEntryType.DATE,
		value: '2020-01-19',
	},
};

const worker = new ParserWorker();

test('Parse JSON data', () => {
	worker.postMessage({
		payload: [TEST_JSON],
		index: 0,
	});

	worker.onmessage = (e) => {
		expect(e.data).toEqual(RESULT_JSON);
	};
});
