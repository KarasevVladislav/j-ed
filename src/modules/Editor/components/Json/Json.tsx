import React, { useCallback, useState } from 'react';
import { Button } from '../../../../shared';

import styles from './Json.module.css';
import { KeyTyper } from '../KeyTyper';

import { JsonEntryType, JsonType } from '../../../../types/chunks';
import { ValueTyper } from '../ValueTyper/ValueTyper';

type JsonProps = {
  json: JsonType;
	index: number;
};

export function JsonComponent({ json, index }: JsonProps) {
	const [open, setOpen] = useState(false);

	const handleClick = useCallback(() => {
		setOpen(!open);
	}, [open]);

	const keys = Object.keys(json);

	return (
		<div className={styles.root}>
			<span>{index}</span>
			<Button open={open} onClick={handleClick} />
			<div>&#123;</div>
			{
				open ? (
					<div className={styles.json}>
						{keys.map(key => (
							<div key={key}>
								<KeyTyper type={json[key].type}>{key}</KeyTyper>
								:
								{' '}
								{
									json[key].type === JsonEntryType.INVALID ?
										(<span>Unsupported Value</span>) :
										(
											<ValueTyper
												entry={json[key]}
												entryKey={key}
												entryIndex={index}
											/>
										)
								}
							</div>
						))}
					</div>
				) : (
					<span>
						...
					</span>
				)
			}
			<div>&#125;</div>
		</div>
	);
}

export const Json = React.memo(JsonComponent);
