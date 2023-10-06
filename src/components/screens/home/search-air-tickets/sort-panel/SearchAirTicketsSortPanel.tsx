import { FunctionComponent } from 'react'

import RadioButton from '@/components/ui/radioButton/RadioButton'
import Checkbox from '@/components/ui/checkbox/Checkbox'

import styles from './SearchAirTicketsSortPanel.module.scss'

interface ISearchAirTicketsSortItemProps {
	title: string
	content: number[] | string[]
	variant: string
	active: Set<string> | string[]
	handle:
		| ((e: React.FormEvent<HTMLInputElement>) => void)
		| ((company: string) => void)
}

const SearchAirTicketsSortPanel: FunctionComponent<
	ISearchAirTicketsSortItemProps
> = ({ title, content, variant, active, handle }) => {
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
		<div className={styles.sort_panel}>
			<h3>{title}</h3>
			<form>
				{variant === 'checkbox'
					? content
							.sort((a, b) => (a as number) - (b as number))
							.map(connectionAmountEl => (
								<Checkbox
									key={connectionAmountEl}
									active={
										(active as Set<string>).has(`${connectionAmountEl}`)
											? true
											: false
									}
									value={connectionAmountEl as number}
									onChange={e =>
										(handle as (e: React.FormEvent<HTMLInputElement>) => void)(
											e
										)
									}
								>
									{switchConnectionAmountEl(connectionAmountEl as number)}
								</Checkbox>
							))
					: content.map(company => (
							<RadioButton
								key={company}
								name='company'
								active={active as string[]}
								onChange={() =>
									(handle as (company: string) => void)(
										(company as string).toLowerCase()
									)
								}
							>
								{company}
							</RadioButton>
					  ))}
			</form>
		</div>
	)
}

export default SearchAirTicketsSortPanel
