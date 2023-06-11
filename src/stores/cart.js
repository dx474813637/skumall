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
			return this.cart_list.map(ele => ele.products.reduce((sum, item) => sum += +item.num, 0)).reduce((sum, item) => sum += item, 0)
		},
		cart_list_checked_num() {
			return this.cart_list.map(ele => ele.products.filter(item => item.checked).reduce((sum, item) => sum += Number(item.num), 0)).reduce((sum, item) => sum += item, 0) 
		},
		cart_list_checked_price() {
			return this.cart_list.map(ele => ele.products.filter(item => item.checked).reduce((sum, item) => sum += (item.num*item.price), 0)).reduce((sum, item) => sum += item, 0) 
		},
	}, 
	actions: { 
		addEventLocalStorage(event) {
			if (event.key === 'cart_list') {
				// console.log('xx')
				this.saveLocalStorage2CartData() 
			}
		},
		saveCartData2LocalStorage() {
			localStorage.setItem('cart_list', JSON.stringify(this.cart_list))
		},
		saveLocalStorage2CartData() {
			this.cart_list = JSON.parse(localStorage.getItem('cart_list')) || []
			
		},
		removeCartData() {
			this.cart_list = []
			this.saveCartData2LocalStorage()
		},
		specs2Obj(specs) {
			let arr = [];
			for(let key in specs) {
				arr.push({
					label: key,
					value: specs[key]
				})
			}
			return arr
		},
		addProduct2Cart(data) {
			let { id: shopId } = data.shop;
			data = {
				...data, 
				loading: false, 
				checked: false
			} 
			let shop_index = this.cart_list.findIndex(ele => ele.shop.id == shopId);
			// console.log(shop_index)
			if(shop_index == -1) {
				let shopObj = deepClone(data.shop)
				delete data.shop
				data.specs_arr = this.specs2Obj(data.specs)
				let datas = {  
					shop: {
						...shopObj, 
						checked: false,
						indeterminate: false
					},
					products: [data]
				}
				this.cart_list.unshift(datas) 
			}
			else { 
				let datas = this.cart_list[shop_index]
				let productIndex = datas.products.findIndex(ele => ele.id == data.id);
				data.shop.checked = datas.shop.checked;
				datas.shop = deepMerge(datas.shop, data.shop) 
				delete data.shop
				if(productIndex == -1) {
					if(datas.shop.checked) datas.shop.indeterminate = true
					datas.shop.checked = false
					data.specs_arr = this.specs2Obj(data.specs)
					datas.products.unshift(data)
				}else {
					data.num += datas.products[productIndex].num 
					data.checked = datas.products[productIndex].checked 
					let item = deepClone(datas.products[productIndex])
					item = deepMerge(item, data)  
					datas.products.splice(productIndex, 1)
					datas.products.unshift(item) 
				}
			}
 
			this.saveCartData2LocalStorage()
		},
		setPidSku(arr) {
			this.cart_list.some((cart ) => {
				return cart.products.some((item) => {
					let itemIndex = arr.findIndex((ele) => ele.id == item.id)
					if(itemIndex != -1) {
						let itemObj = arr[itemIndex]
						item = {
							...item,
							img: itemObj.img? itemObj.img : item.img,
							stock: itemObj.stock,
							num: +(itemObj.stock > item.num? item.num : itemObj.stock),
							price: itemObj.price
						}
						return true
					}
					return  false
				}) 
			})
		},
		async getPidSku(idStr) {
			if(!idStr) return 
			const res = await apis.web_pid_sku1({
				params: { id: idStr }
			})
			if(res.code == 1) {
				// let idArr = res.list.map((r) => r.id); 
				this.setPidSku(res.list)
			}
		}
	},
});
 