import {
	defineStore
} from 'pinia';
import apis from '@/apis/index'


export const userStore = defineStore('user', {
	state: () => {
		return {
			user_info: {},
			user_loading: false,
			cpy_info: {},
			cpy_loading: false,
		};
	},
	getters: {
		// doubleCount: (state) => state.counter * 2,
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: { 
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
 