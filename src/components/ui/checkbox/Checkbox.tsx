import { FieldsetHTMLAttributes, FunctionComponent } from 'react'
import clsx from 'clsx'

import styles from './Checkbox.module.scss'

interface ICheckboxProps extends FieldsetHTMLAttributes<HTMLInputElement> {
	active: boolean
}

const Checkbox: FunctionComponent<ICheckboxProps> = ({
	active,
	children,
	onChange
}) => {
	return (
		<label
			className={clsx(styles.checkbox, {
				[styles.active]: active
			})}
		>
			<input onChange={onChange} type='checkbox' />
			<span>{children}</span>
		</label>
	)
}

export default Checkbox
