interface TicketTime {
	startTime: string
	endTime: string
}

export interface ITicketsData {
	id: number
	from: string
	to: string
	company: string
	price: number
	currency: string
	time: TicketTime
	duration: number
	date: Date
	connectionAmount: number
}

export const ticketsData: ITicketsData[] = [
	{
		id: 1,
		from: 'SVO',
		to: 'LED',
		company: 'Победа',
		price: 12680,
		currency: 'RUB',
		time: {
			startTime: '12:00',
			endTime: '16:30'
		},
		duration: 4.3,
		date: new Date(),
		connectionAmount: 1
	},
	{
		id: 2,
		from: 'SVO',
		to: 'LED',
		company: 'Red Wings',
		price: 21500,
		currency: 'RUB',
		time: {
			startTime: '14:00',
			endTime: '16:00'
		},
		duration: 2,
		date: new Date(),
		connectionAmount: 0
	},
	{
		id: 3,
		from: 'SVO',
		to: 'LED',
		company: 'S7 Airlines',
		price: 23995,
		currency: 'RUB',
		time: {
			startTime: '04:50',
			endTime: '13:30'
		},
		duration: 8.4,
		date: new Date(),
		connectionAmount: 2
	}
]
