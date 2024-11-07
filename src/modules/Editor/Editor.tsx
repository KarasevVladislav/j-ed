import React from 'react';
import { Json } from './components';
import { ProcessedJson } from '../../types/chunks';

type EditorProps = {
  data: ProcessedJson[];
	loading: boolean;
};

export function Editor({ data, loading }: EditorProps) {
	if (loading) {
		return <p>Loading...</p>;
	}

	if (!data.length) {
		return <p>No JSON data provided.</p>;
	}
	return (
		<>
			{data.map((json, index) => (
				<Json json={json} index={index} key={String(json.id.value) ?? index} />
			))}
		</>
	);
}
