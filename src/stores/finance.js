import {
	defineStore
} from 'pinia';
import apis from '@/apis/index'
import {exchangeRegionalData} from '@/utils'
// import { useStoreB } from '@/store/modules/page_b';
// const storeB = useStoreB();
// let { pniaBcuntData } = storeToRefs(storeB);

export const useFinanceStore = defineStore('finance', {
	state: () => {
		return {
			account_info: {},
			account_loading: false, 
			organizations_info: {},
			organizations_loading: false, 
			idTypeList: [
				{
					label: '中国大陆身份证',
					value: 'CRED_PSN_CH_IDCARD'
				},
				{
					label: '台湾来往大陆通行证',
					value: 'CRED_PSN_CH_TWCARD'
				},
				{
					label: '澳门来往大陆通行证',
					value: 'CRED_PSN_CH_MACAO'
				},
				{
					label: '香港来往大陆通行证',
					value: 'CRED_PSN_CH_HONGKONG'
				},
				{
					label: '护照',
					value: 'CRED_PSN_PASSPORT'
				},
			],
			bank_list: [],
			bank_loading: false, 
			regional_list: [],
			regional_loading: false, 
		}
	}, 
	actions: {    
		async getAccountData(needLoading = false) {
			this.account_loading = true
			await apis.get('verify_account_3')
			const res = await apis.account({needLoading});
			this.account_loading = false
			if(res.code == 1) {
				this.account_info = res.list 
			} 
		},  
		async getCpyData(needLoading = false) {
			this.organizations_loading = true
			await apis.get('query_organizations')
			const res = await apis.organizations({needLoading});
			this.organizations_loading = false
			if(res.code == 1) {
				this.organizations_info = res.list 
			} 
		},  
		async getBankListData(needLoading = false) {
			this.bank_loading = true 
			const res = await apis.transfer_random_amount_detail({needLoading});
			this.bank_loading = false
			if(res.code == 1) {
				this.bank_list = res.list.bank_list
			} 
		},  
		async getRegionalData(needLoading = false) {
			this.regional_loading = true 
			const res = await apis.get_regional({needLoading});
			this.regional_loading = false
			if(res.code == 1) { 
				this.regional_list = exchangeRegionalData( 'items', res.list)   
			} 
		},  

	},
});
 