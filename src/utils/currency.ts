export const currency = (currency: number): string => {
	return new Intl.NumberFormat('ru-RU', {
		currency: 'RUB',
		style: 'currency',
		maximumFractionDigits: 0
	}).format(currency)
}
