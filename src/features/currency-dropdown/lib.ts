import type { CurrenciesRatioType } from './type'

export const getFilteredCurrenciesRatio = (data: CurrenciesRatioType, activeCurrency: string, requiredCurrency: string[]) => {
  const filterData = Object.keys(data).filter(m => {
    const splitData = m.split('-')

    return requiredCurrency.includes(splitData[0]) && splitData[1].includes(activeCurrency.toLowerCase())
  })
  const result: CurrenciesRatioType = {}
  for (const key in data) {
    if (filterData.includes(key)) {
      result[key.split('-')[0]] = data[key]
    }
  }

  return result
}
export const getConvertCurrencies = (data: CurrenciesRatioType, requiredCurrency: string[]): number => {
  return data[`${requiredCurrency[0].toLowerCase()}-${requiredCurrency[1].toLowerCase()}`] ?? 1
}
