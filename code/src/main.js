import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import '@/assets/main.scss'

const app = createApp(App)

app.use(store)
app.use(router)

import './include/fa'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
app.component('faIcon', FontAwesomeIcon)

app.mount('#app')
