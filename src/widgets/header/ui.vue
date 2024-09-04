<template>
  <header>
    <div class="wrapper header">
      <div class="header-left">
        <router-link to="/">Главная</router-link>
        <router-link to="/convert">Конвертация</router-link>
      </div>
      <CurrencyDropdown
        :active-currency="activeCurrency"
        @get-active-currency="getActiveCurrency" />
    </div>
  </header>
</template>
<script setup lang="ts">
import { onBeforeMount, type Ref, ref } from 'vue'
import { CurrencyDropdown, useCurrency } from '@/features/currency-dropdown'
import type { CurrenciesType } from '@/shared/types'

const activeCurrency: Ref<CurrenciesType | null> = ref(null)
const currencyStore = useCurrency()
const getActiveCurrency = (currency: CurrenciesType) => {
  localStorage.setItem('header-active-currency', JSON.stringify(currency))
  activeCurrency.value = currency
  currencyStore.loadRatioCurrency(currency.value)
}

onBeforeMount(() => {
  activeCurrency.value = JSON.parse(localStorage.getItem('header-active-currency') ?? '')
})
</script>
<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;

  &-left {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  a {
    color: $white-color;
  }
}
</style>
