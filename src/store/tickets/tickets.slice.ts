import {
	createEntityAdapter,
	createSlice,
	PayloadAction
} from '@reduxjs/toolkit'

import { ITicketsData } from '@/api/data/tickets.data'

import { getTickets } from './tickets.actions'

interface ITicketsInitialState {
	tickets: ITicketsData[]
	isLoading: boolean
}

const ticketsAdapter = createEntityAdapter<ITicketsInitialState>()
const initialState: ITicketsInitialState = ticketsAdapter.getInitialState({
	tickets: [],
	isLoading: false
})

export const ticketsSlice = createSlice({
	name: 'tickets',
	initialState,
	reducers: {
		SORT_TICKETS_CHEAP: state => {
			state.tickets.sort((a, b) => a.price - b.price)
		},
		SORT_TICKETS_FAST: state => {
			state.tickets.sort((a, b) => {
				const percent = 100
				const firstTime = a.duration.hour + a.duration.minute / percent
				const secondTime = b.duration.hour + b.duration.minute / percent

				return firstTime - secondTime
			})
		},
		SORT_TICKETS_OPTIMAL: state => {
			state.tickets.sort((a, b) => a.connectionAmount - b.connectionAmount)
		},
		SORT_CONNECTION_AMOUNT: (state, { payload }: PayloadAction<number[]>) => {
			state.tickets = state.tickets.filter(
				ticket =>
					ticket.connectionAmount ===
					payload.find(
						connectionAmount => connectionAmount === ticket.connectionAmount
					)
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
