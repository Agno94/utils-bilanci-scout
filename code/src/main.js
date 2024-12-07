import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

import 'bulma/css/bulma.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)

import './include/fa'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
app.component('faIcon', FontAwesomeIcon)

app.mount('#app')
