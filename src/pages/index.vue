<template>
  <div>
    <p v-if="activeCurrency">
      * это курсы валют по отношению к {{ activeCurrency.value }}:
    </p>
    <div v-for="(ratio, name) in currenciesRatio" :key="ratio">
      {{ createCurrencyString(ratio, name as string) }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, ref, watch, type Ref } from 'vue'
import { useCurrency, Currency } from '@/features/currency-dropdown'
import type { CurrenciesType } from '@/shared/types'

const currencyStore = useCurrency()
const currenciesRatio = computed(() => currencyStore.getCurrenciesRatio)

const activeCurrency: Ref<CurrenciesType | null> = ref(null)

const createCurrencyString = (ratio: number, name: string) => {
  let amountCurrency = 1
  let value = ratio.toFixed(2)

  if (name.toUpperCase() === Currency.RUB) {
    amountCurrency = 100
    value = (ratio * 100).toFixed(2)
  }
  return `${amountCurrency + ' ' + name.toUpperCase()} = ${value + ' ' + activeCurrency.value?.value || ''}`
}
watch(currenciesRatio, () => {
  activeCurrency.value = JSON.parse(localStorage.getItem('header-active-currency') ?? '')
})
onBeforeMount(async () => {
  let headerActiveCurrency = localStorage.getItem('header-active-currency')
  const defaultValue = { value: 'RUB', icon: 'ru' }
  if (!headerActiveCurrency) {
    localStorage.setItem('header-active-currency', JSON.stringify(defaultValue))
    activeCurrency.value = defaultValue
  } else {
    activeCurrency.value = JSON.parse(headerActiveCurrency)
  }
  await currencyStore.loadCurrencyData()
  await currencyStore.loadRatioCurrency(activeCurrency.value?.value ?? defaultValue.value)
})
</script>
