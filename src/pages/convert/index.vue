<template>
  <div class="convert">
    <div class="convert-wrapper">
      <CurrencyDropdown
        v-if="firstActiveCurrency"
        :isDarkTheme="true"
        :active-currency="firstActiveCurrency"
        @get-active-currency="getActiveFirstCurrency" />
      <input placeholder="0"
             @focus="nulledValues"
             v-model="firstValue"
             @input="convertSecondValue"
      >
    </div>
    <div class="convert-wrapper">
      <CurrencyDropdown
        v-if="secondActiveCurrency"
        :isDarkTheme="true"
        :active-currency="secondActiveCurrency"
        @get-active-currency="getActiveSecondCurrency" />
      <input
        placeholder="0"
        @focus="nulledValues"
        v-model="secondValue"
        @input="convertFirstValue"
      >
    </div>

  </div>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, ref, type Ref } from 'vue'
import { CurrencyDropdown, useCurrency } from '@/features/currency-dropdown'
import type { CurrenciesType } from '@/shared/types'

const currencyStore = useCurrency()
const ratioOfConvertibleCurrencies = computed(() => currencyStore.getRatioOfConvertibleCurrencies)

const firstValue: Ref<number | null> = ref(null)
const secondValue: Ref<number | null> = ref(null)
const firstActiveCurrency: Ref<CurrenciesType> = ref({ value: 'RUB', icon: 'ru' })
const secondActiveCurrency: Ref<CurrenciesType> = ref({ value: 'USD', icon: 'usa' })

const getActiveFirstCurrency = (currency: CurrenciesType) => {
  firstActiveCurrency.value = currency
  convertedCurrency()
  nulledValues()
}
const nulledValues = () => {
  firstValue.value = null
  secondValue.value = null
}
const getActiveSecondCurrency = (currency: CurrenciesType) => {
  secondActiveCurrency.value = currency
  convertedCurrency()
  nulledValues()
}
const convertedCurrency = async () => {
  await currencyStore.loadConvertCurrency([firstActiveCurrency.value.value, secondActiveCurrency.value.value])
}

const convertFirstValue = () => {
  firstValue.value = +((secondValue.value ?? 1) / ratioOfConvertibleCurrencies.value).toFixed(2)
}
const convertSecondValue = () => {
  secondValue.value = +((firstValue.value ?? 1) * ratioOfConvertibleCurrencies.value).toFixed(2)
}

onBeforeMount(async () => {
  const defaultValue = { value: 'RUB', icon: 'ru' }
  firstActiveCurrency.value = JSON.parse(localStorage.getItem('header-active-currency') ?? defaultValue.value)
  await currencyStore.loadCurrencyData()
  await currencyStore.loadConvertCurrency([firstActiveCurrency.value.value, secondActiveCurrency.value.value])

})
</script>
<style lang="scss">
.convert {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 0;

  &-wrapper {
    display: flex;
    align-items: center;

    & .dropdown__button {
      border: 1px solid $black-color-20;
      border-radius: 4px 0 0 4px;
      border-right-width: 0;

      &.open {
        border-color: $primary-color;
        border-right-width: 1px;
      }
    }

    input {
      border-radius: 0 4px 4px 0;
      border: 1px solid $black-color-20;
      height: 32px;
      padding: 0 8px;

      &:focus {
        outline: none;
        border: 1px solid $primary-color;
      }
    }
  }
}
</style>
