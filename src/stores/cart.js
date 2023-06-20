import {
	defineStore,
	storeToRefs
} from 'pinia';
import router from '@/router/guard'
import apis from '@/apis/index'
import { deepMerge, deepClone } from '@/utils'
import { userStore } from '@/stores/user';
const user = userStore();
import { useSettingsStore } from '@/stores/settings';
const settings = useSettingsStore();
let { login } = storeToRefs(user); 

let cart_list = [];
if(localStorage.getItem('cart_list')) cart_list = JSON.parse(localStorage.getItem('cart_list'))[login.value] || []
console.log(cart_list)
export const cartStore = defineStore('cart', {
	state: () => {
		return { 
			cart_list: cart_list
		};
	},
	getters: { 
		cart_list_num() {
			if(!this.cart_list || this.cart_list.length == 0) return 0
			return this.cart_list.map(ele => ele.products.reduce((sum, item) => sum += +item.num, 0)).reduce((sum, item) => sum += item, 0)
		},
		cart_list_checked_num() {
			if(!this.cart_list || this.cart_list.length == 0) return 0
			return this.cart_list.map(ele => ele.products.filter(item => item.checked).reduce((sum, item) => sum += Number(item.num), 0)).reduce((sum, item) => sum += item, 0) 
		},
		cart_list_checked_price() {
			if(!this.cart_list || this.cart_list.length == 0) return 0
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
			let oridinData = JSON.parse(localStorage.getItem('cart_list')) || {}
			oridinData[login.value] = this.cart_list
			localStorage.setItem('cart_list', JSON.stringify(oridinData))
		},
		saveLocalStorage2CartData() {
			if(localStorage.getItem('cart_list')) {
				this.cart_list = JSON.parse(localStorage.getItem('cart_list'))[login.value] || []
			}
			
			
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
			if(!login.value) {
				settings.setPrevPage(router.currentRoute.value)
				ElMessage.error('请先登录');
				settings.goLogin()
				return
			}
			
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
					data.num = (+data.num) + (+datas.products[productIndex].num)
					console.log(data.num)
					data.checked = datas.products[productIndex].checked 
					let item = deepClone(datas.products[productIndex])
					item = deepMerge(item, data)  
					datas.products.splice(productIndex, 1)
					datas.products.unshift(item) 
				}
			}
 
			this.saveCartData2LocalStorage()

			return true
		},
		setPidSku(arr, idStr) { 
			this.cart_list.forEach((cart ) => {
				cart.products.forEach((item) => {
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
					}else if(idStr.includes(item.id)) { 
						item.disabled = true
						item.checked = false
					} 
				}) 
			})
			// console.log(this.cart_list)
		},
		async getPidSku(idStr) { 
			if(!idStr) return 
			let obj = {}
			obj = await apis.web_pid_sku1({
				params: { id: idStr }
			})
			.then( res => {
				this.setPidSku(res.list, idStr)
				this.saveCartData2LocalStorage()
				return {
					res: res.list
				}
			})
			.catch(res => {
				this.setPidSku([], idStr)
				this.saveCartData2LocalStorage()
				return {
					res: []
				}
			})
			console.log(obj)
			return obj
			
			 
		},
		removeProductsById(arr) { 
			let data = deepClone(this.cart_list)
			data.forEach((cart, index ) => {
				cart.products.forEach((item, i) => {
					let itemIndex = arr.findIndex((id) => id == item.id)
					if(itemIndex != -1) {   
						data[index].products[i] = false 
					} 
				}) 
			})
			this.cart_list = data.map(ele =>( {...ele, products: ele.products.filter(item => item)})).filter(ele => ele.products.length != 0)
			console.log(this.cart_list)
		}
	},
});
 