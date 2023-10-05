import { FieldsetHTMLAttributes, FunctionComponent } from 'react'
import clsx from 'clsx'

import styles from './RadioButton.module.scss'

interface IRadioButtonProps extends FieldsetHTMLAttributes<HTMLInputElement> {
	active: string[]
}

const RadioButton: FunctionComponent<IRadioButtonProps> = ({
	children,
	name,
	active,
	onChange
}) => {
	return (
		<label
			className={clsx(styles.radio_btn, {
				[styles.active]: active[0] === `${children}`.toLowerCase()
			})}
		>
			<input name={name} type='radio' onChange={onChange} />
			<span>{children}</span>
		</label>
	)
}

export default RadioButton
