import { ticketsData } from '@/api/data/tickets.data'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Server } from 'miragejs'

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
