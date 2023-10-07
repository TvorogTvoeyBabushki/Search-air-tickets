import { FunctionComponent } from 'react'

import styles from './Header.module.scss'

const Header: FunctionComponent = () => {
	return (
		<header className={styles.header}>
			<div className='container'>
				<div>
					<img src='/Search-air-tickets/logo.png' alt='Logo' />
					<h1>Поиск авиабилетов</h1>
				</div>
			</div>
		</header>
	)
}

export default Header
