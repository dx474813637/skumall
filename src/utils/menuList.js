
import {
	User, Setting, Handbag, Pointer, Postcard, Files, Box
} from "@element-plus/icons-vue"; 
export default [
	{
		label: '基础管理',
		type: 'title',
		icon: User,
		index: '1',
		children: [
			{
				label: '个人中心', 
				icon: '',
				index: 'user_index', 
				route: {
					name: 'user_index'
				}
			},
			{
				label: '个人名片', 
				icon: '',
				index: 'user_info', 
				route: {
					name: 'user_info'
				}
			}, 
			{
				label: '店铺信息', 
				icon: '',
				index: 'cpy_info', 
				route: {
					name: 'cpy_info'
				}
			}, 
		]
	},
	{
		label: '商品管理',
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
				// index: 'order_new_list', 
				// route: {
				// 	name: 'order_new_list'
				// } 
			},
			{
				label: '选品车', 
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
		label: '融资中心',
		type: 'title',
		index: '4',
		icon: Files,
		children: [
			{
				label: '认证信息',
				icon: '',
				index: 'finance_account', 
				route: {
					name: 'finance_account'
				} 
			},
			{
				label: '无订单融资借款人信息',
				icon: '',
				index: 'no_order_buyer', 
				route: {
					name: 'no_order_buyer'
				} 
			},
			{
				label: '无订单卖家白名单',
				icon: '',
				index: 'no_order_white_sell_list', 
				route: {
					name: 'no_order_white_sell_list'
				} 
			},
			// {
			// 	label: '个人认证', 
			// 	icon: '',
			// 	index: 'user_apply', 
			// 	route: {
			// 		name: 'user_apply'
			// 	} 
			// },
			// {
			// 	label: '企业认证', 
			// 	icon: '',
			// 	index: 'company_apply', 
			// 	route: {
			// 		name: 'company_apply'
			// 	} 
			// } ,
			{
				label: '融资产品',
				icon: '',
				index: 'query_product_list', 
				route: {
					name: 'query_product_list'
				} 
			},
			{
				label: '授信申请', 
				icon: '',
				index: 'pacc_query_list', 
				route: {
					name: 'pacc_query_list'
				} 
			},
			{
				label: '融资记录',
				icon: '',
				index: 'order_rz_pay_list', 
				route: {
					name: 'order_rz_pay_list'
				} 
			},
			// {
			// 	label: '融资记录',
			// 	icon: '',
			// 	index: 'order_bank_list', 
			// 	route: {
			// 		name: 'order_bank_list'
			// 	} 
			// },
		]
	}, 
	// {
	// 	label: '授信签约中心',
	// 	type: 'title',
	// 	index: '5',
	// 	icon: Files,
	// 	children: [
	// 		{
	// 			label: '融资产品',
	// 			icon: '',
	// 			index: 'query_product_list', 
	// 			route: {
	// 				name: 'query_product_list'
	// 			} 
	// 		},
	// 		{
	// 			label: '授信申请', 
	// 			icon: '',
	// 			index: 'pacc_query_list', 
	// 			route: {
	// 				name: 'pacc_query_list'
	// 			} 
	// 		},
	// 		// {
	// 		// 	label: '授信记录', 
	// 		// 	icon: '',
	// 		// 	index: 'pacc_type_detail1', 
	// 		// 	route: {
	// 		// 		name: 'pacc_type_detail',
	// 		// 		params: {
	// 		// 			type: 1
	// 		// 		}
	// 		// 	} 
	// 		// }, 
	// 		// {
	// 		// 	label: '签约记录', 
	// 		// 	icon: '',
	// 		// 	index: 'pacc_type_detail2', 
	// 		// 	route: {
	// 		// 		name: 'pacc_type_detail',
	// 		// 		params: {
	// 		// 			type: 2
	// 		// 		}
	// 		// 	} 
	// 		// }, 
	// 	]
	// }, 
	{
		label: '分销助手',
		type: 'func', 
		index: 'fx',
		icon: Box,
	},
	{
		label: '安全登出',
		type: 'func', 
		index: 'logout',
		icon: Pointer,
	}
]