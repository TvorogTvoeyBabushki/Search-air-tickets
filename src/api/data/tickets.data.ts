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
	duration: {
		hour: number
		minute: number
	}
	date: Date
	connectionAmount: number
	logo: string
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
		duration: {
			hour: 4,
			minute: 30
		},
		date: new Date(),
		connectionAmount: 1,
		logo: '/победа.png'
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
		duration: {
			hour: 2,
			minute: 0
		},
		date: new Date(),
		connectionAmount: 0,
		logo: '/red-wings.png'
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
		duration: {
			hour: 8,
			minute: 40
		},
		date: new Date(),
		connectionAmount: 2,
		logo: '/s7-airlines.png'
	}
]
