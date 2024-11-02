import React, {
	memo, MouseEventHandler, useCallback, useEffect, useState,
} from 'react';

import style from './ChunkIndex.module.css';
import { Button } from '../../../../shared';
import { Json } from '../Json';

type ChunkIndexProps = {
  index: number;
  chunkSize?: number; // Adjust as needed
}

function ChunkIndexComponent({ index, chunkSize = 100 }: ChunkIndexProps) {
	const [open, setOpen] = useState(false);

	const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback((ev) => {
		ev.stopPropagation();

		setOpen(!open);
	}, [open]);

	useEffect(() => {
		console.log('render', index, chunkSize);
	});

	return (
		<div className={style.root}>
			<div className={style.header}>
				<Button open={open} onClick={handleClick} />
				<div>{`[${chunkSize * index} ... ${chunkSize * index + chunkSize}]`}</div>
			</div>
			<div>
				{
					open && (
						chunkSize > 10 ? (
							<ChunkIndex index={index} chunkSize={10} />
						) : (
							<Json />
						)
					)
				}
			</div>
		</div>
	);
}

export const ChunkIndex = memo(ChunkIndexComponent);
