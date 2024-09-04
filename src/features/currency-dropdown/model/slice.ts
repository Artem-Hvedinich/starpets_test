import { defineStore } from 'pinia'
import { computed, type ComputedRef, ref, type Ref } from 'vue'

import { getCurrencyData } from '../api'
import { getConvertCurrencies, getFilteredCurrenciesRatio } from '../lib'
import { type CurrenciesRatioType } from '../type'

type CurrencyStoreType = {
  getCurrenciesRatio: ComputedRef<CurrenciesRatioType>
  getRatioOfConvertibleCurrencies: ComputedRef<number>
  loadCurrencyData: () => Promise<void>
  loadRatioCurrency: (activeCurrency: string) => Promise<void>
  loadConvertCurrency: (requiredCurrency: string[]) => Promise<void>
}

const requiredCurrency = ['rub', 'eur', 'usd']

export const useCurrency = defineStore('currency', () => {
  const currencyData: Ref<CurrenciesRatioType> = ref({})
  const currenciesRatio: Ref<CurrenciesRatioType> = ref({})
  const getCurrenciesRatio = computed(() => currenciesRatio.value)

  const ratioOfConvertibleCurrencies: Ref<number> = ref(1)
  const getRatioOfConvertibleCurrencies = computed(() => ratioOfConvertibleCurrencies.value)

  const loadCurrencyData = async () => {
    currencyData.value = await getCurrencyData()
  }
  const loadRatioCurrency = async (activeCurrency: string) => {

    currenciesRatio.value = getFilteredCurrenciesRatio(currencyData.value, activeCurrency, requiredCurrency)
  }

  const loadConvertCurrency = async (requiredCurrency: string[]) => {
    ratioOfConvertibleCurrencies.value = getConvertCurrencies(currencyData.value, requiredCurrency)
  }


  const result: CurrencyStoreType = {
    loadCurrencyData,
    loadRatioCurrency,
    loadConvertCurrency,
    getCurrenciesRatio,
    getRatioOfConvertibleCurrencies
  }
  return result
})
