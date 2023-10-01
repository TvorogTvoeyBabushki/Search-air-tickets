import { FunctionComponent } from 'react'

import Layout from '@/components/layout/Layout'

import { getTickets } from '@/store/tickets/tickets.actions'
import { store } from '@/store/store'
import { useTickets } from '@/hooks/useTickets'

const Home: FunctionComponent = () => {
	const { tickets } = useTickets()
	const handleClick = () => {
		console.log(tickets)
	}

	return (
		<Layout>
			<main>
				<div className='container'>
					<button onClick={handleClick}>click</button>
				</div>
			</main>
		</Layout>
	)
}

store.dispatch(getTickets())

export default Home
