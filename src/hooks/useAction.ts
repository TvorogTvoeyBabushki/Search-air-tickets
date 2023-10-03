import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { useMemo } from 'react'

import { ticketsActions } from '@/store/tickets/tickets.slice'

export const useAction = () => {
	const dispatch = useDispatch()

	return useMemo(() => bindActionCreators(ticketsActions, dispatch), [dispatch])
}
