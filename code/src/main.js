import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import '@/assets/main.scss'

const app = createApp(App).use(store)

import './include/fa'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
app.component('faIcon', FontAwesomeIcon)

app.mount('#app')
