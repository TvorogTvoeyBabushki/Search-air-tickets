import { useEffect, useMemo, useState } from 'react'

export const useSearchAirTicketsView = () => {
	const [windowWidth, setWindowWidth] = useState<number>(
		document.documentElement.clientWidth
	)
	const [isShowSortPanel, setIsShowSortPanel] = useState<boolean>(false)

	const handleShowSortPanel = () => {
		isShowSortPanel ? setIsShowSortPanel(false) : setIsShowSortPanel(true)
	}

	useEffect(() => {
		window.addEventListener('resize', () => {
			setWindowWidth(document.documentElement.clientWidth)
		})

		return () =>
			window.removeEventListener('resize', () => {
				setWindowWidth(document.documentElement.clientWidth)
			})
	}, [])

	useEffect(() => {
		windowWidth > 1150 ? setIsShowSortPanel(true) : setIsShowSortPanel(false)
	}, [windowWidth])

	return useMemo(
		() => ({
			windowWidth,
			isShowSortPanel,
			handleShowSortPanel
		}),
		[windowWidth, isShowSortPanel]
	)
}
