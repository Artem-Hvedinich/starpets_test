<template>
  <Dropdown :class="isDarkTheme && 'dark'">
    <template #trigger>
      <Icon :i="activeCurrency?.icon" />
      <p>{{ activeCurrency?.value }}</p>
    </template>
    <template #menu>
      <div class="dropdown__menu_item" v-for="currency in currencies"
           @click="emits('get-active-currency', currency)"
           :key="currency.value">
        <Icon :i="currency.icon" />
        <p>{{ currency.value }}</p>
      </div>
    </template>
  </Dropdown>
</template>
<script setup lang="ts">
import { toRefs } from 'vue'
import { currencies } from '@/shared/mocks'
import { Dropdown, Icon } from '@/shared/ui'
import { type CurrenciesType } from '@/shared/types'

const emits = defineEmits<{ (e: 'get-active-currency', payload: CurrenciesType): void }>()
const props =
  withDefaults(defineProps<{ activeCurrency: CurrenciesType, isDarkTheme?: boolean }>(), {
    isDarkTheme: () => false
  })
const { activeCurrency } = toRefs(props)

</script>
<style lang="scss">
.dropdown {
  &.dark &__button {
    color: $primary-color;
    background-color: transparent;
  }

  &__button {
    width: 65px;
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    color: $white-color;
    height: 32px;
    gap: 5px;
  }

  &__menu_item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 2px 0;
    background-color: $white-color;
    cursor: pointer;

    &:hover {
      background-color: $light-blue-color;
      color: $white-color;
    }

    &:first-child {
      border-radius: 4px 4px 0 0;
    }

    &:last-child {
      border-radius: 0 0 4px 4px;
    }
  }

  & .icon {
    height: 15px;

    img {
      width: 15px;
    }
  }
}
</style>
