import { instance } from '@/shared/api'
import type { CurrenciesRatioType } from './type'

export const getCurrencyData = async (): Promise<CurrenciesRatioType> => {
  const response = await instance.get(`currency`)

  return response.data
}

