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
			transfer_process_info: {},
			transfer_process_loading: false, 
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
			bank_buy_all: {},
			bank_buy_all_loading: false, 
			no_order_buyer: {},
			no_order_buyer_loading: false, 
			tooclePic: 'https://img-i-album.toocle.com/0-0/'
		}
	}, 
	actions: {  
		async getno_order_buyer(needLoading = false) {
			this.bank_buy_all_loading = true
			try { 
				const res = await apis.no_order_buyer_detail({loading: needLoading});
				if(res.code == 1 && res.list.hasOwnProperty('id')) {
					this.no_order_buyer = {...res.list, filesList: [{url: `${this.tooclePic}${res.list.reg_pic}`}] }
				} 
			} catch (error) {
				
			}
			this.bank_buy_all_loading = false
			
		},    
		async getbankbuyall(needLoading = false) {
			this.bank_buy_all_loading = true
			try { 
				const res = await apis.bank_buy_all({loading: needLoading});
				if(res.code == 1) {
					this.bank_buy_all = res.list 
				} 
			} catch (error) {
				
			}
			this.bank_buy_all_loading = false
			
		},    
		async getAccountData(needLoading = false) {
			this.account_loading = true
			try {
				await apis.verify_account_3({loading: needLoading})
				const res = await apis.account({loading: needLoading});
				if(res.code == 1) {
					this.account_info = res.list 
				} 
			} catch (error) {
				
			}
			this.account_loading = false
			
		},  
		async getCpyData(needLoading = false) {
			this.organizations_loading = true
			try {
				await apis.query_organizations({loading: needLoading})
				const res = await apis.organizations({loading: needLoading}); 
				if(res.code == 1) {
					this.organizations_info = res.list 
				} 
			} catch (error) {
				
			}
			this.organizations_loading = false
		},  
		async query_transfer_process(needLoading = false) {
			this.transfer_process_loading = true
			try { 
				const res = await apis.query_transfer_process({loading: needLoading}); 
				if(res.code == 1) {
					this.transfer_process_info = res.list.info
				} 
			} catch (error) {
				
			}
			this.transfer_process_loading = false
		},  
		async getBankListData(needLoading = false) {
			this.bank_loading = true 
			const res = await apis.transfer_random_amount_detail({loading: needLoading});
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
 