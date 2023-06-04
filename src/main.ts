import { createApp } from 'vue'
import pinia from '@/stores/index.js';
import router from '@/router/guard'
import './style.css'
import App from './App.vue'
import axios from '@/request/index' 
import apis from '@/apis/index'
import 'element-plus/dist/index.css' 
const app = createApp(App)
app.use(pinia)
app.use(router)
app.provide('$api', apis); 
app.provide('$axios', axios);
app.mount('#app')

export default app