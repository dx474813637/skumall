import { createApp } from 'vue'
import pinia from '@/stores/index.js';
import router from '@/router/guard'
import './style.css'
import App from './App.vue'
import axios from '@/request/index'
import apis from '@/apis/index'
import 'element-plus/dist/index.css'
import defineDirectives from '@/directive/index'
import filters from '@/plugins/filters'
declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$filters: Record<string, any>
	}
}
const app = createApp(App)
defineDirectives(app)
app.use(pinia)
app.use(router)
app.use(filters)
app.provide('$api', apis);
app.provide('$axios', axios);
app.mount('#app')

export default app