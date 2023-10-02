import { createAsyncThunk } from '@reduxjs/toolkit'
import { Server } from 'miragejs'
import axios from 'axios'

import { ticketsData } from '@/api/data/tickets.data'

new Server({
	routes() {
		this.namespace = 'api'

		this.get('/tickets/', () => {
			return ticketsData
		})
	}
})

export const getTickets = createAsyncThunk(
	'tickets/fetchTickets',
	async (_, thunkAPI) => {
		try {
			const { data } = await axios.get('/api/tickets/')

			return data
		} catch (error) {
			thunkAPI.rejectWithValue(error)
		}
	}
)
