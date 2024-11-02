import React, { useEffect } from 'react';
import { getChunkSize } from '../../utils';
import { ChunkIndex } from './components';

type EdditorProps = {
  jsonSize: number;
}

export function Editor({ jsonSize }: EdditorProps) {
	const chunkSize = getChunkSize(jsonSize);

	return (
		<>
			{new Array(Math.ceil(jsonSize / chunkSize)).fill(null).map((_, index) => (
				// eslint-disable-next-line react/no-array-index-key
				<ChunkIndex index={index} key={index} />
			))}
		</>
	);
}
