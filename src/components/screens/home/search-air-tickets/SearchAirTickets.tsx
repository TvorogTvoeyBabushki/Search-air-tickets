import { FunctionComponent, useState, useEffect, useCallback } from 'react'

import { ITicketsData } from '@/api/data/tickets.data'

import Button from '@/components/ui/button/Button'
import Checkbox from '@/components/ui/checkbox/Checkbox'
import RadioButton from '@/components/ui/radioButton/RadioButton'

import { currency } from '@/utils/currency'

import { useAction } from '@/hooks/useAction'

import styles from './SearchAirTickets.module.scss'

const btnElements = [
	{ children: 'Самый дешевый', variant: 'cheap' },
	{ children: 'Самый быстрый', variant: 'fast' },
	{ children: 'Самый оптимальный', variant: 'optimal' }
]

const SearchAirTickets: FunctionComponent<{ [x: string]: ITicketsData[] }> = ({
	tickets,
	sortTicketsCompany,
	sortTicketsConnectionAmount
}) => {
	const [ticketsData, setTicketsData] = useState<ITicketsData[]>([])
	const {
		SORT_CONNECTION_AMOUNT,
		SORT_TICKETS_CHEAP,
		SORT_TICKETS_FAST,
		SORT_TICKETS_OPTIMAL,
		SORT_COMPANY
	} = useAction()

	const [activeBtn, setActiveBtn] = useState<string[]>(['cheap'])
	const [activeCheckbox, setActiveCheckbox] = useState<Set<string>>(new Set())
	const [activeRadioBtn, setActiveRadioBtn] = useState<string[]>([
		'все компании'
	])

	const [connectionAmount, setConnectionAmount] = useState<number[]>([])
	const [companies, setCompanies] = useState<string[]>(['Все компании'])

	const handleSortClick = (variant: string) => {
		if (variant === 'cheap') {
			SORT_TICKETS_CHEAP({
				connectionAmount: activeCheckbox,
				company: activeRadioBtn
			})
		}

		if (variant === 'fast') {
			SORT_TICKETS_FAST({
				connectionAmount: activeCheckbox,
				company: activeRadioBtn
			})
		}

		if (variant === 'optimal') {
			SORT_TICKETS_OPTIMAL({
				connectionAmount: activeCheckbox,
				company: activeRadioBtn
			})
		}
		setActiveBtn([variant])
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

	const handleRadioBtnClick = (company: string) => {
		setActiveRadioBtn([company])

		if (company === 'все компании') {
			activeCheckbox.size
				? setTicketsData(sortTicketsConnectionAmount)
				: setTicketsData(tickets)
			return
		}

		SORT_COMPANY({
			connectionAmount: activeCheckbox,
			company: [company]
		})
	}

	useEffect(() => {
		if (activeRadioBtn[0] === 'все компании') {
			handleSortClick(activeBtn[0])
		}
	}, [activeRadioBtn])

	useEffect(() => {
		if (activeCheckbox.size) {
			SORT_CONNECTION_AMOUNT({
				connectionAmount: activeCheckbox,
				company: activeRadioBtn
			})
		} else {
			activeRadioBtn[0] !== 'все компании'
				? SORT_COMPANY({
						connectionAmount: activeCheckbox,
						company: activeRadioBtn
				  })
				: setTicketsData(tickets)
		}
		handleSortClick(activeBtn[0])
	}, [activeCheckbox])

	useEffect(() => {
		if (tickets.length) {
			setTicketsData(tickets)

			tickets.forEach(ticket => {
				setCompanies(prev => {
					let companies = new Set(prev)
					companies.add(ticket.company)

					return [...companies]
				})
				setConnectionAmount(prev => {
					let connectionAmount = new Set(prev)
					connectionAmount.add(ticket.connectionAmount)

					return [...connectionAmount]
				})
			})
		}
	}, [tickets])

	useEffect(() => {
		setTicketsData(sortTicketsCompany)
	}, [sortTicketsCompany])

	useEffect(() => {
		setTicketsData(sortTicketsConnectionAmount)
	}, [sortTicketsConnectionAmount])

	const switchConnectionAmountEl = (connectionAmountEl: number): string => {
		switch (connectionAmountEl) {
			case 0:
				return 'Без пересадок'
			case 1:
				return `${connectionAmountEl} пересадка`
			default:
				return `${connectionAmountEl} пересадки`
		}
	}

	return (
		<section className={styles.search_air_tickets}>
			<div>
				<div>
					<h3>Количество пересадок</h3>
					{connectionAmount
						.sort((a, b) => a - b)
						.map(connectionAmountEl => (
							<Checkbox
								key={connectionAmountEl}
								active={
									activeCheckbox.has(`${connectionAmountEl}`) ? true : false
								}
								value={connectionAmountEl}
								onChange={e => handleCheckboxClick(e)}
							>
								{switchConnectionAmountEl(connectionAmountEl)}
							</Checkbox>
						))}
				</div>
				<div>
					<h3>Компании</h3>
					{companies.map(company => (
						<RadioButton
							key={company}
							name='company'
							active={activeRadioBtn}
							onChange={() => handleRadioBtnClick(company.toLowerCase())}
						>
							{company}
						</RadioButton>
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
