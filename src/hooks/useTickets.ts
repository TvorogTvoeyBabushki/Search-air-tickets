import { useAppSelector } from './useAppSelector'

export const useTickets = () => useAppSelector(state => state.tickets)
