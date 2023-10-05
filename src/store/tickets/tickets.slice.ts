import {
	createEntityAdapter,
	createSlice,
	PayloadAction
} from '@reduxjs/toolkit'

import { ITicketsData } from '@/api/data/tickets.data'

import { getTickets } from './tickets.actions'

interface ITicketsInitialState {
	tickets: ITicketsData[]
	sortTicketsConnectionAmount: ITicketsData[]
	sortTicketsCompany: ITicketsData[]
	isLoading: boolean
}

const sortCertainTickets = (
	tickets: ITicketsData[],
	payload: { connectionAmount: Set<string>; company: string[] }
): ITicketsData[] => {
	const certainTickets = tickets.filter(
		ticket =>
			ticket.company.toLowerCase() === payload.company[0] &&
			payload.connectionAmount.has(`${ticket.connectionAmount}`)
	)

	return certainTickets
}

const switchTickets = (
	variant: string,
	tickets: ITicketsData[],
	sortTickets: (tickets: ITicketsData[]) => ITicketsData[]
) => {
	switch (variant) {
		case 'cheap':
			return tickets.sort((a, b) => a.price - b.price)
		case 'fast':
			return sortTickets(tickets)
		case 'optimal':
			return tickets.sort((a, b) => a.connectionAmount - b.connectionAmount)
		default:
			return tickets.sort((a, b) => a.price - b.price)
	}
}

const handleSortTickets = (
	variant: string,
	state: ITicketsInitialState,
	payload: { connectionAmount: Set<string>; company: string[] }
) => {
	const sortTickets = (tickets: ITicketsData[]) => {
		return tickets.sort((a, b) => {
			const percent = 100
			const firstTime = a.duration.hour + a.duration.minute / percent
			const secondTime = b.duration.hour + b.duration.minute / percent

			return firstTime - secondTime
		})
	}

	if (payload.company[0] === 'все компании' && payload.connectionAmount.size) {
		const certainTickets = state.tickets.filter(ticket =>
			payload.connectionAmount.has(`${ticket.connectionAmount}`)
		)

		state.sortTicketsConnectionAmount = switchTickets(
			variant,
			certainTickets,
			sortTickets
		)

		return
	}

	if (payload.company[0] !== 'все компании' && payload.connectionAmount.size) {
		state.sortTicketsConnectionAmount = switchTickets(
			variant,
			sortCertainTickets(state.tickets, payload),
			sortTickets
		)

		state.sortTicketsCompany = switchTickets(
			variant,
			sortCertainTickets(state.tickets, payload),
			sortTickets
		)

		return
	}

	if (payload.company[0] !== 'все компании') {
		switchTickets(variant, state.sortTicketsCompany, sortTickets)

		return
	}

	if (payload.connectionAmount.size) {
		switchTickets(variant, state.sortTicketsConnectionAmount, sortTickets)

		return
	}

	switchTickets(variant, state.tickets, sortTickets)
}

const ticketsAdapter = createEntityAdapter<ITicketsInitialState>()
const initialState: ITicketsInitialState = ticketsAdapter.getInitialState({
	tickets: [],
	sortTicketsConnectionAmount: [],
	sortTicketsCompany: [],
	isLoading: false
})

export const ticketsSlice = createSlice({
	name: 'tickets',
	initialState,
	reducers: {
		SORT_TICKETS_CHEAP: (
			state,
			{
				payload
			}: PayloadAction<{ connectionAmount: Set<string>; company: string[] }>
		) => {
			handleSortTickets('cheap', state, payload)
		},
		SORT_TICKETS_FAST: (
			state,
			{
				payload
			}: PayloadAction<{ connectionAmount: Set<string>; company: string[] }>
		) => {
			handleSortTickets('fast', state, payload)
		},
		SORT_TICKETS_OPTIMAL: (
			state,
			{
				payload
			}: PayloadAction<{ connectionAmount: Set<string>; company: string[] }>
		) => {
			handleSortTickets('optimal', state, payload)
		},
		SORT_CONNECTION_AMOUNT: (
			state,
			{
				payload
			}: PayloadAction<{
				connectionAmount: Set<string>
				company: string[]
			}>
		) => {
			if (payload.company[0] !== 'все компании') {
				state.sortTicketsConnectionAmount = sortCertainTickets(
					state.tickets,
					payload
				)

				return
			}

			state.sortTicketsConnectionAmount = state.tickets.filter(ticket =>
				payload.connectionAmount.has(`${ticket.connectionAmount}`)
			)
		},
		SORT_COMPANY: (
			state,
			{
				payload
			}: PayloadAction<{
				connectionAmount: Set<string>
				company: string[]
			}>
		) => {
			if (payload.connectionAmount.size) {
				state.sortTicketsCompany = sortCertainTickets(state.tickets, payload)

				return
			}

			state.sortTicketsCompany = state.tickets.filter(
				ticket => ticket.company.toLowerCase() === payload.company[0]
			)
		}
	},
	extraReducers: builder => {
		builder
			.addCase(getTickets.pending, state => {
				state.isLoading = true
			})
			.addCase(
				getTickets.fulfilled,
				(state, { payload }: PayloadAction<ITicketsData[]>) => {
					state.isLoading = false
					state.tickets = payload.sort((a, b) => a.price - b.price)
				}
			)
	}
})

export const ticketsActions = { ...ticketsSlice.actions }
