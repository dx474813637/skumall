export default [
	{
		label: '账号管理',
		type: 'title',
		icon: 'custom-icon-user',
		index: '1',
		children: [
			{
				label: '个人中心',
				type: 'link-navigator',
				url: '/pages/user/user',
				icon: '',
				active: 'user',
				index: '1-1',
			},
			{
				label: '账号信息',
				type: 'link-navigator',
				url: '/pages/memberInfo/memberInfo',
				icon: '',
				active: 'info',
				index: '1-2',
			},
			// {
			// 	label: '账号安全',
			// 	type: 'link-navigator',
			// 	url: '/pages/memberSafe/memberSafe',
			// 	icon: '',
			// 	active: 'safe',
			// 	index: '1-3',
			// },
			// {
			// 	label: '登录明细',
			// 	type: 'link-navigator',
			// 	url: '/pages/log/log',
			// 	icon: '',
			// 	active: 'log',
			// 	index: '1-4',
			// },
		]
	},
	{
		label: '商城管理',
		type: 'title',
		index: '2',
		icon: 'custom-icon-shopping',
		children: [
			{
				label: '订单管理',
				type: 'link-navigator',
				url: '/pages/orderList/orderList',
				icon: '',
				active: 'orderList',
				index: '2-1',
			},
			{
				label: '购物车',
				type: 'link-navigator',
				url: '/pages/cart/cart',
				icon: '',
				active: 'cart',
				index: '2-2',
			},
			{
				label: '地址管理',
				type: 'link-navigator',
				url: '/pages/addr/addr',
				icon: '',
				active: 'addr',
				index: '2-3',
			},
			{
				label: '优惠券',
				type: 'link-navigator',
				url: '/pages/coupon/coupon',
				icon: '',
				active: 'coupon',
				index: '2-4',
			},
		]
	},
	{
		label: '资金管理',
		type: 'title',
		index: '3',
		icon: 'custom-icon-transaction',
		children: [
			{
				label: '资金中心',
				type: 'link-navigator',
				url: '/pages/money_center/money_center',
				icon: '',
				active: 'money_center',
				index: '3-1',
			},
			{
				label: '支付平台账号',
				type: 'link-navigator',
				url: '/pages/sinopay/sinopay',
				icon: '',
				active: 'sinopay',
				index: '3-2',
			},
			{
				label: '我的现金账户',
				type: 'link-navigator',
				url: '/pages/sinopay_account/sinopay_account',
				icon: '',
				active: 'sinopay_account',
				index: '3-3',
			},
			{
				label: '现金付款明细',
				type: 'link-navigator',
				url: '/pages/sinopay_pay_list/sinopay_pay_list',
				icon: '',
				active: 'sinopay_pay_list',
				index: '3-4',
			},
		]
	},
	{
		label: '安全登出',
		type: 'func',
		index: '4',
		active: 'logout',
		icon: 'custom-icon-logout',
	}
]