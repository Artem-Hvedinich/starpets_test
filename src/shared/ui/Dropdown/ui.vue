<template>
  <div class="dropdown">
    <button ref="excludeRef" :class="['dropdown__button', isOpen && 'open']" @click="toggle">
      <slot name="trigger"></slot>
    </button>
    <div v-if="isOpen" ref="componentRef" class="dropdown__menu">
      <slot name="menu"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useClickOutside } from '@/shared/lib'

const componentRef = ref()
const excludeRef = ref()
const isOpen = ref(false)

useClickOutside(
  componentRef,
  excludeRef,
  close
)

function close() {
  isOpen.value = false
}

function toggle() {
  isOpen.value = !isOpen.value
}
</script>
<style scoped lang="scss">
.dropdown {
  position: relative;
  display: inline-block;

  &__button {
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 16px;
    outline: none;

    &:hover {
      background-color: $light-blue-color;
    }
  }

  &__menu {
    display: block;
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    z-index: 2;
    min-width: 100%;
    background-color: $white-color;
    border: 1px solid $light-grey-color;
    border-radius: 4px;
    box-shadow: 0 2px 8px $black-color-20;
  }
}
</style>
