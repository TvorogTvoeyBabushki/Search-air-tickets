import { FunctionComponent } from 'react'

import { ITicketsData } from '@/api/data/tickets.data'

import Button from '@/components/ui/button/Button'

import SearchAirTicketsWrapper from './tickets-wrapper/SearchAirTicketsWrapper'
import SearchAirTicketsSortPanel from './sort-panel/SearchAirTicketsSortPanel'
import { useSearchAirTickets } from './useSearchAirTickets'
import styles from './SearchAirTickets.module.scss'

const btnElements = [
	{ children: 'Самый дешевый', variant: 'cheap' },
	{ children: 'Самый быстрый', variant: 'fast' },
	{ children: 'Самый оптимальный', variant: 'optimal' }
]

const searchAirTicketsSortItems = [
	{
		title: 'Количество пересадок',
		variant: 'checkbox'
	},
	{
		title: 'Компании',
		variant: 'radiobtn'
	}
]

const SearchAirTickets: FunctionComponent<{ [x: string]: ITicketsData[] }> = ({
	tickets,
	sortTicketsCompany,
	sortTicketsConnectionAmount
}) => {
	const searchAirTicketsProps = useSearchAirTickets(
		tickets,
		sortTicketsCompany,
		sortTicketsConnectionAmount
	)

	return (
		<section className={styles.search_air_tickets}>
			<div>
				{searchAirTicketsSortItems.map(searchAirTicketsSortItem => (
					<SearchAirTicketsSortPanel
						key={searchAirTicketsSortItem.title}
						title={searchAirTicketsSortItem.title}
						content={
							searchAirTicketsSortItem.variant === 'checkbox'
								? searchAirTicketsProps.connectionAmount
								: searchAirTicketsProps.companies
						}
						variant={searchAirTicketsSortItem.variant}
						active={
							searchAirTicketsSortItem.variant === 'checkbox'
								? searchAirTicketsProps.activeCheckbox
								: searchAirTicketsProps.activeRadioBtn
						}
						handle={
							searchAirTicketsSortItem.variant === 'checkbox'
								? searchAirTicketsProps.handleCheckboxClick
								: searchAirTicketsProps.handleRadioBtnClick
						}
					/>
				))}
			</div>

			<div>
				<div>
					{btnElements.map((btnElement, index) => (
						<Button
							key={index}
							variant={btnElement.variant}
							active={searchAirTicketsProps.activeBtn}
							onClick={() =>
								searchAirTicketsProps.handleSortClick(btnElement.variant)
							}
						>
							{btnElement.children}
						</Button>
					))}
				</div>

				<SearchAirTicketsWrapper
					ticketsData={searchAirTicketsProps.ticketsData}
				/>
			</div>
		</section>
	)
}

export default SearchAirTickets
