<!--  -->
<template>
	<div class="u-p-20 box">
		<el-card class="box-card" shadow="hover">
			<template #header>
				<div class="card-header u-flex u-flex-between">
					<div class="item u-flex ">
						<span class="u-m-r-20">个人认证信息</span>
						<el-button text bg type="primary" size="small" :disabled="account_loading" @click="finance.getAccountData">
							<el-icon><i-ep-Refresh /></el-icon>
							<span class="u-m-l-3">刷新</span>
						</el-button>
					</div>
					<div class="item u-flex">
						<el-icon class="u-m-r-5" color="#999">
							<i-ep-clock />
						</el-icon>
						<el-text type="info">{{ account_info.ctime }}</el-text> 
					</div> 
				</div>
			</template>
			<div v-loading="account_loading">
				<div class="u-flex u-flex-center " v-if="!account_info || !account_info.hasOwnProperty('state') || account_info.state == 0">
					<el-empty description="您还未创建办理人信息">
						<el-button plain type="primary" @click="router.push({name: 'user_apply'})">立即创建</el-button>
					</el-empty>
				</div>
				<div v-else>
					<el-row :gutter="10">
						<el-col :span="5">
							<div class="grid-content label">姓名</div>
						</el-col>
						<el-col :span="19">
							<div class="grid-content content">{{ account_info.name }}</div>
						</el-col>
					</el-row>
					<el-row :gutter="10">
						<el-col :span="5">
							<div class="grid-content label">{{ $filters.idType2Str(account_info.idType) }}</div>
						</el-col>
						<el-col :span="19">
							<div class="grid-content content">{{ account_info.idNumber }}</div>
						</el-col>
					</el-row>
					<el-row :gutter="10">
						<el-col :span="5">
							<div class="grid-content label">手机</div>
						</el-col>
						<el-col :span="19">
							<div class="grid-content content">{{ account_info.mobile }}</div>
						</el-col>
					</el-row>
					<el-row :gutter="10">
						<el-col :span="5">
							<div class="grid-content label">认证状态</div>
						</el-col>
						<el-col :span="19">
							<div class="grid-content content u-flex">
								<div class="u-m-r-20">{{ $filters.finance_account_status(account_info.state) }}</div>
								<div class="u-m-r-20" v-if="account_info.state == '1'">
									<el-button 
										text 
										bg 
										type="primary" 
										size="small" 
										:disabled="account_loading" 
										@click="router.push({name: 'user_apply'})"
										>
										更新信息
									</el-button>
								</div> 
								<div class="u-m-r-20" v-if="account_info.state == '1'">
									<el-button 
										text 
										bg 
										type="primary" 
										size="small" 
										:disabled="account_loading" 
										@click="router.push({name: 'user_verify'})"
										>
										短信验证
									</el-button>
								</div> 
								
							</div>
						</el-col>
					</el-row>
				</div>
				
			</div>

		</el-card>

	</div>
	<div class="u-p-20 box">
		<el-card class="box-card" shadow="hover">
			<template #header> 
				<div class="card-header u-flex u-flex-between">
					<div class="item u-flex ">
						<span class="u-m-r-20">企业认证信息</span>
						<el-button text bg type="primary" size="small" :disabled="organizations_loading" @click="finance.getCpyData">
							<el-icon><i-ep-Refresh /></el-icon>
							<span class="u-m-l-3">刷新</span>
						</el-button>
					</div>
					<div class="item u-flex">
						<el-icon class="u-m-r-5" color="#999">
							<i-ep-clock />
						</el-icon>
						<el-text type="info">{{ organizations_info.ctime }}</el-text> 
					</div> 
				</div>
			</template>
			<div v-loading="organizations_loading">
				<div class="u-flex u-flex-center " v-if="!organizations_info || !organizations_info.hasOwnProperty('state') || organizations_info.state == 0">
					<el-empty description="您还未创建企业信息">
						<el-button plain type="primary" @click="router.push({name: 'company_apply'})">立即创建</el-button>
					</el-empty>
				</div>
				<div v-else>
					<el-row :gutter="10">
						<el-col :span="5">
							<div class="grid-content label">企业名称</div>
						</el-col>
						<el-col :span="19">
							<div class="grid-content content">{{ organizations_info.name }}</div>
						</el-col>
					</el-row>
					<el-row :gutter="10">
						<el-col :span="5">
							<div class="grid-content label">统一社会信用代码</div>
						</el-col>
						<el-col :span="19">
							<div class="grid-content content">{{ organizations_info.idNumber }}</div>
						</el-col>
					</el-row> 
					<el-row :gutter="10">
						<el-col :span="5">
							<div class="grid-content label">认证状态</div>
						</el-col>
						<el-col :span="19">
							<div class="grid-content content u-flex">
								<div class="u-m-r-20">{{ $filters.finance_organizations_status(organizations_info.auth_record_state) }}</div>
								<div class="u-m-r-20" v-if="organizations_info.state == '1'">
									<el-button 
										text 
										bg 
										type="primary" 
										size="small" 
										:disabled="organizations_loading" 
										@click="router.push({name: 'user_apply'})"
										>
										更新信息
									</el-button>
								</div> 
								<div class="u-m-r-20" v-if="organizations_info.auth_record_state == '1'">
									<el-button 
										text 
										bg 
										type="primary" 
										size="small" 
										:disabled="organizations_loading" 
										@click="router.push({name: 'company_verify'})"
										>
										去验证
									</el-button>
								</div> 
								
							</div> 
						</el-col>
					</el-row>
					<el-row :gutter="10" v-if="organizations_info.auth_record_state != '2'">
						<el-col :span="5">
							<div class="grid-content label">随机金额打款进度</div>
						</el-col>
						<el-col :span="19" v-loading="transfer_process_loading">
							<div class="grid-content content u-flex">
								<div class="u-m-r-20">{{ $filters.finance_transfer_process(transfer_process_info.process) }}</div>
								<div class="u-m-r-20" v-if="transfer_process_info.process != 'ORGANFINISHED'">
									<el-button 
										text 
										bg 
										type="primary" 
										size="small" 
										:disabled="transfer_process_loading" 
										@click="finance.query_transfer_process"
										>
										刷新
									</el-button>
								</div>  
								
							</div> 
							<div class="grid-content content u-m-t-10" v-if="transfer_process_info.cardNo"> 
								<div>
									<el-text type="info">发起时打款对公账号信息：</el-text> 
									<span>{{ transfer_process_info.cardNo }}</span>
								</div>
							</div> 
							<div class="grid-content content u-m-t-10" v-if="transfer_process_info.subbranch"> 
								<div>
									<el-text type="info">对公账号所在银行名称：</el-text>  
									<span>{{ transfer_process_info.subbranch }}</span>
								</div>
							</div> 
							<div class="grid-content content u-m-t-10" v-if="transfer_process_info.foresee"> 
								<div>
									<el-text type="info">预计最晚到款日期：</el-text>   
									<span>{{ transfer_process_info.foresee }}</span>
								</div>
							</div> 
							<div class="grid-content content u-m-t-10" v-if="transfer_process_info.message"> 
								<div>
									<el-text type="info">打款进度附件描述信息：</el-text>   
									<span>{{ transfer_process_info.message }}</span>
								</div>
							</div> 
							<div class="grid-content content u-m-t-10" v-if="transfer_process_info.bizFlowNo"> 
								<div>
									<el-text type="info">交易流水号：</el-text>  
									<span>{{ transfer_process_info.bizFlowNo }}</span>
								</div>
							</div> 
						</el-col>
					</el-row>
				</div>
				
			</div>

		</el-card>
		
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, inject, onMounted, toRefs } from "vue";
import { ElMessage } from "element-plus";
import { useFinanceStore } from "@/stores/finance";
import router from "@/router/guard";
const finance = useFinanceStore();
const {
	account_info,
	account_loading,
	organizations_info,
	organizations_loading,
	transfer_process_info,
	transfer_process_loading
} = toRefs(finance);
const $api: any = inject("$api");
const list = ref<any>({});
const props = defineProps({
	id: String,
});

onMounted(async () => {
	await finance.getAccountData();
	if(account_info.value.organizations_id) { 
		await finance.getCpyData();
		if(organizations_info.value.auth_record_state != '2') {
			await finance.query_transfer_process();
		}
	}
});

 
</script>
<style lang="scss" scoped>
.box {
	@extend %box-sizing;
}

.el-row {
	// margin-bottom: 6px;
	padding: 6px;
	border-radius: 5px;
	transition: all 0.3s;

	&:hover {
		background-color: #f8f8f8;

		.grid-content.content {
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		}
	}
}

.grid-content {
	height: 35px;
	line-height: 35px;
	border-radius: 4px;
	font-size: 15px;

	&.label {
		color: #666;
		// text-align: right;
	}

	&.content {
		@extend %box-sizing;
		background-color: #f9fafc;
		padding: 0px 20px;
		transition: all 0.3s;
	}
}</style>
