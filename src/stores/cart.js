import {
	defineStore
} from 'pinia';
import apis from '@/apis/index'
import { deepMerge, deepClone } from '@/utils'


export const cartStore = defineStore('cart', {
	state: () => {
		return { 
			cart_list: JSON.parse(localStorage.getItem('cart_list')) || []
		};
	},
	getters: { 
		cart_list_num() {
			return this.cart_list.reduce((sum, item) => sum += item.num, 0)
		},
		cart_list_price() {
			return this.cart_list.reduce((sum, item) => sum += (item.num*item.price), 0)
		},
	}, 
	actions: { 
		saveCartData2LocalStorage() {
			localStorage.setItem('cart_list', JSON.stringify(this.cart_list))
		},
		removeCartData() {
			this.cart_list = []
			this.saveCartData2LocalStorage()
		},
		addProduct2Cart(data) {
			let index = this.cart_list.findIndex(ele => ele.id == data.id);
			if(index == -1) {
				this.cart_list.unshift(data) 
			}else {
				data.num += this.cart_list[index].num
				console.log(data, this.cart_list[index])
				let item = deepClone(this.cart_list[index])
				item = deepMerge(item, data) 
				this.cart_list.splice(index, 1)
				this.cart_list.unshift(item) 
			}
			this.saveCartData2LocalStorage()
		}
	},
});
 