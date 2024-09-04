import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { router } from './providers'
import App from './index.vue'

export const app = createApp(App)

app.use(createPinia())
app.use(router)

