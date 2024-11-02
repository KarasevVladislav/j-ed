import React, { useCallback, useState } from 'react';
import { Button } from '../../../../shared';

import styles from './Json.module.css';

export function Json() {
	const [open, setOpen] = useState(false);
	const [editorMode, setEditorMode] = useState(false);

	const handleClick = useCallback(() => {
		setOpen(!open);
	}, [open]);

	return (
		<div className={styles.root}>
			<Button open={open} onClick={handleClick} />
			{
				open ? (
					<div>Test</div>
				) : (
					<div>
						<span>&#123;</span>
						...
						<span>&#125;</span>
					</div>
				)
			}
		</div>
	);
}
