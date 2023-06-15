import type { App } from 'vue'
// import { timeFormat } from '@/utils'

export default {
	install: (app: App) => {
		app.config.globalProperties.$filters = {
			finance_transfer_process(value: string | number | undefined) {
				let text = value
				if(value == 'INIT') text = '完成企业信息比对，但未发起打款'
				else if(value == 'PAID') text = '打款申请完成'
				else if(value == 'PAID_FAILED') text = '打款失败'
				else if(value == 'PAID_SUCCESS') text = '打款成功' 
				else if(value == 'ORGANFINISHED') text = '打款回填成功，企业认证完成' 
				return text
			},
			finance_account_status(value: string | number | undefined) {
				let text = value
				if(value == '0') text = '未创建'
				else if(value == '1') text = '未认证'
				else if(value == '2') text = '已认证'
				else if(value == '3') text = '已注销' 
				return text
			},
			finance_organizations_status(value: string | number | undefined) {
				let text = value
				if(value == '0') text = '待认证'
				else if(value == '1') text = '认证发送中'
				else if(value == '2') text = '认证成功'
				else if(value == '3') text = '认证失败' 
				else if(value == '4') text = '认证中' 
				return text
			},
			idType2Str(value: string | number | undefined) {
				let text = value
				if(value == 'CRED_PSN_CH_IDCARD') text = '中国大陆身份证'
				else if(value == 'CRED_PSN_CH_TWCARD') text = '台湾来往大陆通行证'
				else if(value == 'CRED_PSN_CH_MACAO') text = '澳门来往大陆通行证'
				else if(value == 'CRED_PSN_CH_HONGKONG') text = '香港来往大陆通行证'
				else if(value == 'CRED_PSN_PASSPORT') text = '护照' 
				return text
			},
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
			order_status(status: string | number | undefined) {
				let text = status
				if(status == '0') text = '待付款' 
				else if(status == '1') text = '付款成功' 
				else if(status == '2') text = '待收货'
				else if(status == '3') text = '订单完成'
				else if(status == '4') text = '评分完成'
				else if(status == '5') text = '支付中'
				else if(status == '6') text = '支付失败' 
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