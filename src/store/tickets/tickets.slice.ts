import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ITicketsData } from '@/api/data/tickets.data'

import { getTickets } from './tickets.actions'

interface ITicketsInitialState {
	tickets: ITicketsData[]
	isLoading: boolean
}

const initialState: ITicketsInitialState = {
	tickets: [],
	isLoading: false
}

export const ticketsSlice = createSlice({
	name: 'tickets',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getTickets.pending, state => {
				state.isLoading = true
			})
			.addCase(
				getTickets.fulfilled,
				(state, { payload }: PayloadAction<ITicketsData[]>) => {
					state.isLoading = false
					state.tickets = payload
				}
			)
	}
})
