
import {
	User, Setting, Handbag, Pointer
} from "@element-plus/icons-vue"; 
export default [
	{
		label: '账号管理',
		type: 'title',
		icon: User,
		index: '1',
		children: [
			{
				label: '个人中心', 
				icon: '',
				active: 'user_index',
				index: '1-1',
				route: {
					name: 'user_info'
				}
			},
			{
				label: '账号信息', 
				icon: '',
				active: 'user_info',
				index: '1-2',
				route: {
					name: 'user_info'
				}
			}, 
		]
	},
	{
		label: 'sku管理',
		type: 'title',
		index: '2',
		icon: Setting,
		children: [
			{
				label: '商品列表', 
				icon: '',
				active: 'product_list',
				index: '2-1',
				route: {
					name: 'product_list'
				}
			},
			{
				label: 'sku列表', 
				icon: '',
				active: 'sku_list',
				index: '2-2',
				route: {
					name: 'sku_list'
				}
			}, 
		]
	},
	{
		label: '商城管理',
		type: 'title',
		index: '3',
		icon: Handbag,
		children: [
			{
				label: '订单管理',
				icon: '',
				active: 'order_list',
				index: '3-1',
				route: {
					name: 'order_list'
				} 
			},
			{
				label: '购物车', 
				icon: '',
				active: 'cart',
				index: '3-2',
				route: {
					name: 'cart'
				} 
			},
			{
				label: '地址管理', 
				icon: '',
				active: 'address_list',
				index: '3-3',
				route: {
					name: 'address_list'
				} 
			}, 
		]
	}, 
	{
		label: '安全登出',
		type: 'func',
		index: '4',
		active: 'logout',
		icon: Pointer,
	}
]