import {
	defineStore
} from 'pinia';
import apis from '@/apis/index'


export const cateStore = defineStore('cate', {
	state: () => {
		return {
			cate_list: [],
			cate_loading: false,
		};
	},
	getters: {
		// doubleCount: (state) => state.counter * 2,
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: { 
		async getCateData() {
			this.cate_loading = true
			const res = await apis.cate_list();
			this.cate_loading = false
			if(res.code == 1) {
				this.cate_list = res.list 
			} 
		}
	},
});
 