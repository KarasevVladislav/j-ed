import React from 'react';
import { JsonEntryType } from '../../../../types/chunks';

import styles from './KeyTyper.module.css';

type KeyTyperProps = {
  type: JsonEntryType
} & React.PropsWithChildren;
export function KeyTyper({ children, type }: KeyTyperProps) {
	return <span className={styles[type]}>{children}</span>;
}
