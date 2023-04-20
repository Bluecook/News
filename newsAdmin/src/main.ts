import { createApp } from 'vue'
import '../theme/tailwindcss.css'
import App from './App.vue'

import IconFontPlugin from '../plugins/iconfont'

import pinia from './store'

import router from './router'
import { setupDirectives } from './util/directives'

const app = createApp(App)


app.use(router)

app.use(pinia)

app.use(IconFontPlugin, { url: '//at.alicdn.com/t/c/font_3991993_5ka9tyr4klf.js' })

setupDirectives(app)

app.mount('#app')