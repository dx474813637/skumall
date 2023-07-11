import {
	defineStore
} from 'pinia';
import apis from '@/apis/index'
import menuList from '@/utils/menuList'
import {deepClone} from '@/utils/index'

export const cateStore = defineStore('cate', {
	persist: {
		enabled: false // true 表示开启持久化保存
	},
	state: () => {
		return {
			cate_list: [],
			memu_list: [],
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
		cate_list_all: (state) => {
			let cate = deepClone(state.cate_list)  
			cate.unshift({
				name: '全部',
				id: ''
			})
			cate.forEach((ele, index) => {
				ele.children && ele.children.unshift({
					name: '全部',
					id: ele.id
				}) 
			}) 
			return cate
		},
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: {
		async getCateData() {
			this.cate_loading = true
			const res = await apis.cate_list();
			this.cate_loading = false
			if (res.code == 1) {
				this.cate_list = res.list
				this.memu_list = res.memu
			}
		},
		async getFreightData() {
			this.freight_loading = true
			const res = await apis.freight_list();
			this.freight_loading = false
			if (res.code == 1) {
				this.freight_list = res.list
			}
		},
		async getRegionalData() {
			this.regional_loading = true
			const res = await apis.addressDetail();
			this.regional_loading = false
			if (res.code == 1) {
				this.regional_list = JSON.parse(res.regional_list)
				console.log(this.regional_list)
			}
		},
	},
});
