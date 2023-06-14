import type { App } from 'vue'
// import { timeFormat } from '@/utils'

export default {
	install: (app: App) => {
		app.config.globalProperties.$filters = {
			pacc_query_status(status: string | number | undefined) {
				let text = status
				if(status == '1') text = '授信申请中'
				else if(status == '2') text = '授信已递交'
				else if(status == '4') text = '授信失败'
				else if(status == '5') text = '授信通过，签约中'
				else if(status == '6') text = '授信通过，贷款企业已签约'
				else if(status == '7') text = '授信通过，签约通过'
				else if(status == '8') text = '授信通过，贷款账户已激活'
				return text
			},
			order_rz_status(status: string | number | undefined) {
				let text = status
				if(status == '1') text = '融资申请中'
				else if(status == '2') text = '流程暂停'
				else if(status == '3') text = '财务已拒绝'
				else if(status == '4') text = '放款机构已同意'
				else if(status == '5') text = '放款机构已拒绝'
				else if(status == '6') text = '提款成功'
				else if(status == '7') text = '提款失败'
				return text
			},
			order_pay_status(status: string | number | undefined) {
				let text = status
				if(status == '1') text = '等待支付' 
				else if(status == '5') text = '支付成功'
				else if(status == '6') text = '支付失败' 
				return text
			},
			sign_file_status(status: string | number | undefined) {
				let text = status
				if(status == 0) text = '未提交'
				else if(status == 1) text = '已创建'
				else if(status == 2) text = '已开启'
				else if(status == 3) text = '已归档'
				else if(status == 4) text = '已撤销' 
				return text
			},
			en2cn(en: string | number | undefined) {
				let text = en
				if(en == 'month') text = '月' 
				else if(en == 'year') text = '年'
				else if(en == 'day') text = '天' 
				return text
			}
		}
	},
}