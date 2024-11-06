/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
	ChangeEventHandler,
	FocusEventHandler,
	MouseEventHandler, useCallback, useState,
} from 'react';
import { JsonEntry, JsonEntryType } from '../../../../types/chunks';

import styles from './ValueTyper.module.css';
import { useAppContext } from '../../../../App-context';

type ValueTyperProps = {
  entry: JsonEntry,
	entryIndex: number;
	entryKey: string;
};

type MappedInputProps = {
	type: JsonEntryType;
  inputValue: unknown;
  onBlur: FocusEventHandler;
  onChange: ChangeEventHandler;
};

function MappedInput({
	type, inputValue, onBlur, onChange,
}: MappedInputProps) {
	switch (type) {
	case JsonEntryType.STRING:
		return <input autoFocus onBlur={onBlur} onChange={onChange} className={styles.root} type="text" value={String(inputValue)} />;
	case JsonEntryType.NUMBER:
		return <input autoFocus onBlur={onBlur} onChange={onChange} className={styles.root} type="number" value={Number(inputValue)} />;
	case JsonEntryType.EMAIL:
		return <input autoFocus onBlur={onBlur} onChange={onChange} className={styles.root} type="email" value={String(inputValue)} />;
	case JsonEntryType.DATE:
		return <input autoFocus onBlur={onBlur} onChange={onChange} className={styles.root} type="date" value={String(inputValue)} />;
	case JsonEntryType.BOOLEAN:
		return (
			<span autoFocus>
				<label htmlFor="true">
					True
					<input onBlur={onBlur} type="radio" id="true" name="true" value="true" checked={String(inputValue).toLowerCase() === 'true'} onChange={onChange} />
				</label>
				<label htmlFor="false">
					False
					<input onBlur={onBlur} type="radio" id="false" name="false" value="false" checked={String(inputValue).toLowerCase() === 'false'} onChange={onChange} />
				</label>
			</span>
		);
	case JsonEntryType.LONG_TEXT:
		return <textarea autoFocus onBlur={onBlur} className={styles.root} value={String(inputValue)} onChange={onChange} />;
	default:
		return <span>Unhandled type</span>;
	}
}

export function ValueTyper({ entry, entryIndex, entryKey }: ValueTyperProps) {
	const [editorMode, setEditorMode] = useState(false);
	const { type, value } = entry;
	const [inputValue, setInputValue] = useState(value);
	const { patchData } = useAppContext();

	const handleEditClick: MouseEventHandler = useCallback((ev) => {
		ev.stopPropagation();

		if (type === JsonEntryType.INVALID || type === JsonEntryType.ID) return;

		setEditorMode(!editorMode);
	}, [editorMode, type]);

	const handleChange: ChangeEventHandler<HTMLInputElement & HTMLTextAreaElement> = (ev) => {
		setInputValue(ev.target.value);
	};

	const handleBlur: FocusEventHandler<HTMLInputElement & HTMLTextAreaElement> = () => {
		setEditorMode(false);
	};

	return (
		<span onDoubleClick={handleEditClick}>
			{
				editorMode ? (
					<MappedInput
						type={type}
						inputValue={inputValue}
						onBlur={handleBlur}
						onChange={handleChange}
					/>
				) : (
					<span>{String(inputValue)}</span>
				)
			}
			{
				((inputValue !== value) && !editorMode) ? (
					<>
						<button className={styles.button} onClick={() => setInputValue(value)} type="button">Undo</button>
						<button className={styles.button} onClick={() => patchData(entryIndex, entryKey, inputValue)} type="button">Save</button>
					</>
				) : null
			}
		</span>
	);
}
