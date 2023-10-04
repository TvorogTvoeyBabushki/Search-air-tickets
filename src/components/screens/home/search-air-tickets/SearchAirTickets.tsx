import { FunctionComponent, useState, useEffect, useCallback } from 'react'

import { ITicketsData } from '@/api/data/tickets.data'

import Button from '@/components/ui/button/Button'
import Checkbox from '@/components/ui/checkbox/Checkbox'

import { currency } from '@/utils/currency'

import { useAction } from '@/hooks/useAction'

import styles from './SearchAirTickets.module.scss'
import { useTickets } from '@/hooks/useTickets'

const btnElements = [
	{ children: 'Самый дешевый', variant: 'cheap' },
	{ children: 'Самый быстрый', variant: 'fast' },
	{ children: 'Самый оптимальный', variant: 'optimal' }
]

const checkboxElements = [
	{
		children: 'Без пересадок',
		connectionAmount: 0
	},
	{
		children: '1 пересадка',
		connectionAmount: 1
	},
	{
		children: '2 пересадки',
		connectionAmount: 2
	},
	{
		children: '3 пересадки',
		connectionAmount: 3
	}
]

const SearchAirTickets: FunctionComponent<{ [x: string]: ITicketsData[] }> = ({
	tickets,
	sortTickets
}) => {
	const [ticketsData, setTicketsData] = useState<ITicketsData[]>([])
	const {
		SORT_CONNECTION_AMOUNT,
		SORT_TICKETS_CHEAP,
		SORT_TICKETS_FAST,
		SORT_TICKETS_OPTIMAL
	} = useAction()
	const [activeBtn, setActiveBtn] = useState<string[]>(['cheap'])
	const [activeCheckbox, setActiveCheckbox] = useState<Set<string>>(new Set())

	const handleSortClick = (variant: string) => {
		if (variant === 'cheap') {
			// попробовать передавать груз в акшен чтоб нормально реализовать сорт
			SORT_TICKETS_CHEAP(activeCheckbox.size ? true : false)
			setActiveBtn([variant])
		}

		if (variant === 'fast') {
			SORT_TICKETS_FAST(activeCheckbox.size ? true : false)
			setActiveBtn([variant])
		}

		if (variant === 'optimal') {
			SORT_TICKETS_OPTIMAL(activeCheckbox.size ? true : false)
			setActiveBtn([variant])
		}
	}

	const handleCheckboxClick = useCallback(
		(e: React.FormEvent<HTMLInputElement>) => {
			setActiveCheckbox(prev => {
				let filters = new Set(prev)

				if ((e.target as HTMLInputElement).checked) {
					filters.add((e.target as HTMLInputElement).value)
				} else {
					filters.delete((e.target as HTMLInputElement).value)
				}

				return filters
			})
		},
		[setActiveCheckbox]
	)

	useEffect(() => {
		if (activeCheckbox.size) {
			SORT_CONNECTION_AMOUNT(activeCheckbox)
			handleSortClick(activeBtn[0])
		} else {
			setTicketsData(tickets)
			handleSortClick(activeBtn[0])
		}
	}, [activeCheckbox])

	useEffect(() => {
		setTicketsData(tickets)
	}, [tickets])

	useEffect(() => {
		setTicketsData(sortTickets)
	}, [sortTickets])

	return (
		<section className={styles.search_air_tickets}>
			<div>
				<div>
					<h3>Количество пересадок</h3>
					{checkboxElements.map((checkboxElement, index) => (
						<Checkbox
							key={index}
							active={
								activeCheckbox.has(`${checkboxElement.connectionAmount}`)
									? true
									: false
							}
							value={checkboxElement.connectionAmount}
							onChange={e => handleCheckboxClick(e)}
						>
							{checkboxElement.children}
						</Checkbox>
					))}
				</div>
			</div>

			<div>
				<div>
					{btnElements.map((btnElement, index) => (
						<Button
							key={index}
							variant={btnElement.variant}
							active={activeBtn}
							onClick={() => handleSortClick(btnElement.variant)}
						>
							{btnElement.children}
						</Button>
					))}
				</div>

				<div>
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
			</div>
		</section>
	)
}

export default SearchAirTickets
