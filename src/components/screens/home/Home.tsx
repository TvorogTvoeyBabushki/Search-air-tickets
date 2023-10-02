import { FunctionComponent, useEffect } from 'react'

import Layout from '@/components/layout/Layout'

import { getTickets } from '@/store/tickets/tickets.actions'
import { store } from '@/store/store'

import { useTickets } from '@/hooks/useTickets'

import SearchAirTickets from './search-air-tickets/SearchAirTickets'

const Home: FunctionComponent = () => {
	const { tickets } = useTickets()

	useEffect(() => {
		store.dispatch(getTickets())
	}, [])

	return (
		<Layout>
			<main>
				<div className='container'>
					<SearchAirTickets tickets={tickets} />
				</div>
			</main>
		</Layout>
	)
}

export default Home
