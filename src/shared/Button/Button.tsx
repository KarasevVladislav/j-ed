import React, { memo, MouseEventHandler } from 'react';

import styles from './Button.module.css';
import classNames from 'classnames';

type ButtonProps = {
  open: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

function ButtonComponent({ open, onClick }: ButtonProps) {
	const handleClick: MouseEventHandler<HTMLButtonElement> = (ev) => {
		if (onClick) {
			onClick(ev);
		}
	};

	return (
		<button
			className={classNames(styles.button, {
				[styles.button_open]: open,
			})}
			onClick={handleClick}
			type="button"
		>
			➤
		</button>
	);
}

export const Button = memo(ButtonComponent);
