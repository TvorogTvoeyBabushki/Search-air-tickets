import { FunctionComponent, ReactNode } from 'react'

import Header from './header/Header'

const Layout: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
	return (
		<section>
			<Header />
			{children}
		</section>
	)
}

export default Layout
