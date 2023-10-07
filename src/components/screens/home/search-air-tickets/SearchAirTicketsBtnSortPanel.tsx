import { FunctionComponent } from 'react'

import Button from '@/components/ui/button/Button'

const btnElements = [
	{ children: 'Самый дешевый', variant: 'cheap' },
	{ children: 'Самый быстрый', variant: 'fast' },
	{ children: 'Самый оптимальный', variant: 'optimal' }
]

const SearchAirTicketsBtnSortPanel: FunctionComponent<{
	activeBtn: string[]
	handleSortClick: (variant: string) => void
}> = ({ activeBtn, handleSortClick }) => {
	return (
		<>
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
		</>
	)
}

export default SearchAirTicketsBtnSortPanel
