import { useCallback, useEffect, useMemo, useState } from 'react'

import { ITicketsData } from '@/api/data/tickets.data'

import { useAction } from '@/hooks/useAction'

export const useSearchAirTickets = (
	tickets: ITicketsData[],
	sortTicketsCompany: ITicketsData[],
	sortTicketsConnectionAmount: ITicketsData[]
) => {
	const {
		SORT_CONNECTION_AMOUNT,
		SORT_TICKETS_CHEAP,
		SORT_TICKETS_FAST,
		SORT_TICKETS_OPTIMAL,
		SORT_COMPANY
	} = useAction()
	const [ticketsData, setTicketsData] = useState<ITicketsData[]>([])

	const [activeBtn, setActiveBtn] = useState<string[]>(['cheap'])
	const [activeCheckbox, setActiveCheckbox] = useState<Set<string>>(new Set())
	const [activeRadioBtn, setActiveRadioBtn] = useState<string[]>([
		'все компании'
	])

	const [connectionAmount, setConnectionAmount] = useState<number[]>([])
	const [companies, setCompanies] = useState<string[]>([])

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
		handleSortClick(activeBtn[0])
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
					let companies = new Set(['Все компании', ...prev])
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

	return useMemo(
		() => ({
			ticketsData,
			connectionAmount,
			companies,
			activeCheckbox,
			activeRadioBtn,
			activeBtn,
			handleCheckboxClick,
			handleRadioBtnClick,
			handleSortClick
		}),
		[
			ticketsData,
			connectionAmount,
			companies,
			activeCheckbox,
			activeRadioBtn,
			activeBtn
		]
	)
}
