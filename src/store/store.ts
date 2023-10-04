import { configureStore } from '@reduxjs/toolkit'

import { ticketsSlice } from './tickets/tickets.slice'

export const store = configureStore({
	reducer: {
		tickets: ticketsSlice.reducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false
		})
})

export type RootState = ReturnType<typeof store.getState>
