import {
	defineStore
} from 'pinia';
import apis from '@/apis/index'
import menuList from '@/utils/menuList'

export const cateStore = defineStore('cate', {
	state: () => {
		return {
			cate_list: [],
			cate_loading: false,
			freight_list: [
				{
					label: '包邮',
					value: '0'
				}
			],
			freight_loading: false,
			regional_list: [],
			regional_loading: false,
			menuList: menuList,
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
		},
		async getFreightData() {
			this.freight_loading = true
			const res = await apis.freight_list();
			this.freight_loading = false
			if(res.code == 1) {
				this.freight_list = res.list 
			} 
		},
		async getRegionalData() {
			this.regional_loading = true
			const res = await apis.addressDetail();
			this.regional_loading = false
			if(res.code == 1) { 
				this.regional_list = JSON.parse(res.regional_list) 
				console.log(this.regional_list)
			} 
		},
	},
});
 