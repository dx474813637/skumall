import {
	defineStore
} from 'pinia';
import apis from '@/apis/index'
// import { useStoreB } from '@/store/modules/page_b';
// const storeB = useStoreB();
// let { pniaBcuntData } = storeToRefs(storeB);

export const userStore = defineStore('user', {
	state: () => {
		return {
			user_info: {},
			user_loading: false,
			cpy_info: {},
			cpy_loading: false,
			login: localStorage.getItem('login') || ''
		};
	},
	getters: {
		// doubleCount: (state) => state.counter * 2,
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: {  
		logout() {
			console.log('清除token 登录过期')
			this.login = ''
			localStorage.removeItem('token')
			localStorage.removeItem('login')
		},
		async getUserData(needLoading = false) {
			this.user_loading = true
			const res = await apis.my_card({needLoading});
			this.user_loading = false
			if(res.code == 1) {
				this.user_info = res.list 
			} 
		}, 
		async getCpyData(needLoading = false) {
			this.cpy_loading = true
			const res = await apis.my_company({needLoading});
			this.cpy_loading = false
			if(res.code == 1) {
				this.cpy_info = res.list || {}
			} 
		}, 
	},
});
 