import {
	defineStore
} from 'pinia';
import { ElMessage } from "element-plus";


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
			app_title: import.meta.env.VITE_APP_TITLE,
			msg: {}
		};
	},
	getters: {
		// doubleCount: (state) => state.counter * 2,
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: { 
		beforeUpload(rawFile, size = 2) {
			//   if (rawFile.type !== 'image/jpeg' ) {
			// console.log(rawFile.type)
			if (!/(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(rawFile.type)) {
				ElMessage.error('图片格式有误！请检查！')
				return false
			} else if (rawFile.size / 1024 / 1024 > size) {
				ElMessage.error(`图片大小请勿超过${size}MB！`)
				return false
			}
			return true
		},
		async getImageBase64_readFile(file) {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => {
				  // 将 base64 数据保存到上传数据中
				//   this.uploadData.base64 = reader.result;
				  resolve(reader.result);
				};
				reader.onerror = (error) => reject(error);
			  
			});
		}, 
	},
});
 