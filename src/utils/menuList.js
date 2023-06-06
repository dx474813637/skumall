
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
				index: 'user_index', 
				route: {
					name: 'user_info'
				}
			},
			{
				label: '账号信息', 
				icon: '',
				index: 'user_info', 
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
				label: '商品发布', 
				icon: '',
				index: 'product_add', 
				route: {
					name: 'product_add'
				}
			},
			{
				label: '商品列表', 
				icon: '',
				index: 'product_list', 
				route: {
					name: 'product_list'
				}
			},
			{
				label: 'sku列表', 
				icon: '',
				index: 'sku_list', 
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
				index: 'order_list', 
				route: {
					name: 'order_list'
				} 
			},
			{
				label: '购物车', 
				icon: '',
				index: 'cart', 
				route: {
					name: 'cart'
				} 
			},
			{
				label: '地址管理', 
				icon: '',
				index: 'address_list', 
				route: {
					name: 'address_list'
				} 
			}, 
		]
	}, 
	{
		label: '安全登出',
		type: 'func', 
		index: 'logout',
		icon: Pointer,
	}
]