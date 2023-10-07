import { FunctionComponent } from 'react'

import { ITicketsData } from '@/api/data/tickets.data'

import SearchAirTicketsWrapper from './tickets-wrapper/SearchAirTicketsWrapper'
import SearchAirTicketsSortPanel from './sort-panel/SearchAirTicketsSortPanel'
import SearchAirTicketsBtnSortPanel from './SearchAirTicketsBtnSortPanel'
import { useSearchAirTicketsView } from './useSearchAirTicketsView'
import { useSearchAirTickets } from './useSearchAirTickets'
import styles from './SearchAirTickets.module.scss'

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
	const { isShowSortPanel, windowWidth, handleShowSortPanel } =
		useSearchAirTicketsView()

	return (
		<section className={styles.search_air_tickets}>
			{windowWidth <= 1150 && (
				<>
					<div className={styles.btn_sort_panel}>
						<SearchAirTicketsBtnSortPanel
							activeBtn={searchAirTicketsProps.activeBtn}
							handleSortClick={searchAirTicketsProps.handleSortClick}
						/>
					</div>

					<div>
						<h3>
							{windowWidth > 760
								? 'Любая авиакомпания, любое кол-во пересадок'
								: `Любая авиакомпания, пересадок: ${searchAirTicketsProps.connectionAmount
										.slice(0, 3)
										.sort((a, b) => a - b)
										.map(item => ` ${item}`)}`}
						</h3>
						<button onClick={handleShowSortPanel}>
							{windowWidth > 760 ? 'Открыть настройки' : ''}
							<img src='arrow.png' alt='arrow' />
						</button>
					</div>
				</>
			)}
			{isShowSortPanel && (
				<div className={styles.sort_panel_wrapper}>
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
			)}

			<div>
				{windowWidth > 1150 && (
					<div className={styles.btn_sort_panel}>
						<SearchAirTicketsBtnSortPanel
							activeBtn={searchAirTicketsProps.activeBtn}
							handleSortClick={searchAirTicketsProps.handleSortClick}
						/>
					</div>
				)}

				<SearchAirTicketsWrapper
					ticketsData={searchAirTicketsProps.ticketsData}
				/>
			</div>
		</section>
	)
}

export default SearchAirTickets
