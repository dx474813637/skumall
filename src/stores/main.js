import {
	defineStore
} from 'pinia';


export const baseStore = defineStore('base', {
	state: () => {
		return {
			// sys: uni.getSystemInfoSync(),
			configBaseURL: import.meta.env.VITE_BASE_URL,
			configHeader: {
				'content-type': 'application/x-www-form-urlencoded',
				'appid': 10001,
				'appsecret': '66f7iMFW6859I2reEiTsm7wIZQWhevpdvu2XggRIuUnH/zEbybV1fMs',
			},
			share_other: '',
			themeColor: '#0070c5',
			empty: 'https://wx.rawmex.cn/Public/memu/data1.png',
			online: {
				count: 0, 
			}, 
			msg: {}
		};
	},
	getters: {
		// doubleCount: (state) => state.counter * 2,
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: { 
	},
});
 