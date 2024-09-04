import { createRouter, createWebHistory } from 'vue-router'

const pages = import.meta.glob('@/pages/**/*.vue')

const routes = Object.keys(pages).map((path) => {
  let name = path
    .replace('/src/pages', '')
    .replace(/\.vue$/, '')
  if (name.endsWith('/index')) {
    name = name.replace('/index', '')
  }

  return {
    path: name === '' ? '/' : `${name.toLowerCase()}`,
    component: () => pages[path]().catch((err) => {
      console.error(`Ошибка загрузки компонента по пути ${path}:`, err)
    })
  }
})

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})
