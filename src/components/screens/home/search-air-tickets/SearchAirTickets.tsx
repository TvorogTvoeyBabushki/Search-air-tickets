import { FunctionComponent } from 'react'

import { ITicketsData } from '@/api/data/tickets.data'

import styles from './SearchAirTickets.module.scss'
import { currency } from '@/utils/currency'

const SearchAirTickets: FunctionComponent<{ tickets: ITicketsData[] }> = ({
	tickets
}) => {
	const handleClick = (variant: string) => {
		if (variant === 'cheap') {
			tickets
		}
	}

	return (
		<section className={styles.search_air_tickets}>
			<div>
				<button onClick={() => handleClick('cheap')}>Самый дешевый</button>
				<button onClick={() => handleClick('fast')}>Самый быстрый</button>
				<button onClick={() => handleClick('optimal')}>
					Самый оптимальный
				</button>
			</div>

			<div>
				{tickets.map(ticket => (
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
			</div>
		</section>
	)
}

export default SearchAirTickets
