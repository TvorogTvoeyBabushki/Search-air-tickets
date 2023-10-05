import { FunctionComponent, useEffect } from 'react'

import Layout from '@/components/layout/Layout'

import { getTickets } from '@/store/tickets/tickets.actions'
import { store } from '@/store/store'

import { useTickets } from '@/hooks/useTickets'

import SearchAirTickets from './search-air-tickets/SearchAirTickets'

const Home: FunctionComponent = () => {
	const { tickets, sortTicketsCompany, sortTicketsConnectionAmount } =
		useTickets()

	useEffect(() => {
		store.dispatch(getTickets())
	}, [])
	// в самом конце объединить компонент чекбокса и радиокнопки
	return (
		<Layout>
			<main>
				<div className='container'>
					<SearchAirTickets
						tickets={tickets}
						sortTicketsCompany={sortTicketsCompany}
						sortTicketsConnectionAmount={sortTicketsConnectionAmount}
					/>
				</div>
			</main>
		</Layout>
	)
}

export default Home
