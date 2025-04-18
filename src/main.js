import './assets/main.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import { setRouter } from './utils/request'
import locale from 'element-plus/dist/locale/zh-cn.js'
import './assets/font/font.scss'

setRouter(router)
const pinia=createPinia();
const persist=createPersistedState();
const app= createApp(App);
pinia.use(persist)
app.use(pinia)

app.use(router)
app.use(ElementPlus,{locale})

app.mount('#app')
