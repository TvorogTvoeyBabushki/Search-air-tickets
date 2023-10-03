import { ButtonHTMLAttributes, FunctionComponent } from 'react'
import clsx from 'clsx'

import styles from './Button.module.scss'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant: string
	active?: string[]
}

const Button: FunctionComponent<IButtonProps> = ({
	variant,
	active = ['cheap'],
	children,
	onClick
}) => {
	return (
		<button
			className={clsx(styles.btn, {
				[styles.load_more]: variant === 'load-more',
				[styles.active]: variant === active[0]
			})}
			onClick={onClick}
			disabled={variant === active[0] ? true : false}
		>
			{children}
		</button>
	)
}

export default Button
