import { FunctionComponent } from 'react'

import { ITicketsData } from '@/api/data/tickets.data'

import Button from '@/components/ui/button/Button'

import { currency } from '@/utils/currency'

import styles from './SearchAirTicketsWrapper.module.scss'

const SearchAirTicketsWrapper: FunctionComponent<{
	ticketsData: ITicketsData[]
}> = ({ ticketsData }) => {
	return (
		<div className={styles.tickets_wrapper}>
			{ticketsData.map(ticket => (
				<div key={ticket.id}>
					<div>
						<h2>{currency(ticket.price)}</h2>
						<img src={ticket.logo} alt='Победа' />
					</div>
					<div>
						<div>
							<div>{`${ticket.from} - ${ticket.to}`}</div>
							<div>{`${ticket.time.startTime} - ${ticket.time.endTime}`}</div>
						</div>
						<div>
							<div>В пути</div>
							<div>
								{`${ticket.duration.hour} ч ${ticket.duration.minute} мин`}
							</div>
						</div>
						<div>
							<div>Пересадки</div>
							<div>
								{ticket.connectionAmount && ticket.connectionAmount === 1
									? '1 пересадка'
									: ticket.connectionAmount && ticket.connectionAmount !== 1
									? `${ticket.connectionAmount} пересадки`
									: 'Без пересадок'}
							</div>
						</div>
					</div>
				</div>
			))}

			<Button variant='load-more'>Загрузить еще билеты</Button>
		</div>
	)
}

export default SearchAirTicketsWrapper
