<!--  -->
<template>
	<div class="u-p-20 box">
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">授信ID</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{ list.id }}</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">银行产品</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">
					<el-button 
						link 
						type="primary"  
						@click="router.push({ name: 'query_product', params: {id: list.bank_zxrz?.product_id} })"
						>{{ list.bank_zxrz?.name }}</el-button>	
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="10" v-if="list.amount">
			<el-col :span="5">
				<div class="grid-content label">申请金额</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{ list.amount }} 元</div>
			</el-col>
		</el-row>
		<el-row :gutter="10" v-if="list.termMonth">
			<el-col :span="5">
				<div class="grid-content label">申请期限</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{ list.termMonth }} 月</div>
			</el-col>
		</el-row>
		<el-row :gutter="10" v-if="list.credit_amount">
			<el-col :span="5">
				<div class="grid-content label">审批额度</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{ list.credit_amount }} 元</div>
			</el-col>
		</el-row>
		<el-row :gutter="10" v-if="list.credit_beginDate">
			<el-col :span="5">
				<div class="grid-content label">开始日期</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{ list.credit_beginDate }}</div>
			</el-col>
		</el-row>
		<el-row :gutter="10" v-if="list.credit_endDate">
			<el-col :span="5">
				<div class="grid-content label">截止日期</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{ list.credit_endDate }}</div>
			</el-col>
		</el-row>
		<el-row :gutter="10" v-if="list.credit_termMonth">
			<el-col :span="5">
				<div class="grid-content label">授信期限</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{ list.credit_termMonth }} 月</div>
			</el-col>
		</el-row>
		<el-row :gutter="10" v-if="list.bank_zxrz && list.bank_zxrz.loan_term">
			<el-col :span="5">
				<div class="grid-content label">贷款期限</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{ list.bank_zxrz?.loan_term }} 月</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">申请人</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{ list.platform_person }}</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">发起时间</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{ list.ctime }}</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">授信状态</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content u-flex" v-loading="loading_status"> 
					<el-text type="danger" v-if="list.status == '4'">{{ $filters.pacc_query_status(list.status) }}</el-text>
					<el-text type="success" v-else-if="list.status == '8'">{{ $filters.pacc_query_status(list.status) }}</el-text>
					<el-text type="warning" v-else>{{ $filters.pacc_query_status(list.status) }}</el-text> 

					<el-button type="primary" plain size="small" class="u-m-l-30" @click="updateStatusBtn">更新</el-button>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="10" v-if="list.errorText">
			<el-col :span="5">
				<div class="grid-content label">授信失败原因</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">
					<el-text type="danger">{{ list.errorText }}</el-text>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="10" v-if="list.status == 8">
			<el-col :span="5">
				<div class="grid-content label">可用余额</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content u-flex" v-loading="loading_loans">
					<el-text type="primary">{{ loans == 'no' ? '****' : loans + ' 元'}}</el-text>	 
					<el-button type="primary" plain size="small" class="u-m-l-30" @click="getMoneyBtn">查询</el-button>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="10" v-if="list.remark">
			<el-col :span="5">
				<div class="grid-content label">备注</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{ list.remark }}</div>
			</el-col>
		</el-row>
		<el-row :gutter="10" v-if="list.status >= 5">
			<el-col :span="5">
				<div class="grid-content label">签约文件</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content file-content" v-for="(item, index) in fileList" v-loading="item.loading">
					<div>
						<span class="item ">
							<el-text type="danger" v-if="item.signflows_state == '4'">{{ $filters.sign_file_status(item.signflows_state) }}</el-text>
							<el-text type="info" v-else-if="item.signflows_state == '0'">{{ $filters.sign_file_status(item.signflows_state) }}</el-text>
							<el-text type="primary" v-else>{{ $filters.sign_file_status(item.signflows_state) }}</el-text>
							-
						</span>
						<span class="item">
							<el-link :href="item.file_url" target="_blank" v-if="item.file_url">
								<el-icon class="u-p-b-4 u-m-r-4"><i-ep-Document /></el-icon>
								<span>{{ item.name }}</span> 
								<span class="u-font-12">[点击查看]</span> 
							</el-link> 
							<el-link :href="item.pdf_http" target="_blank" v-else-if="item.pdf_http">
								<el-icon class="u-p-b-4 u-m-r-4"><i-ep-Document /></el-icon>
								<span>{{ item.name }}</span> 
								<span class="u-font-12">[点击查看]</span> 
							</el-link> 
							<el-text v-else>
								<el-icon class="u-p-b-4 u-m-r-4"><i-ep-Document /></el-icon>
								<span>{{ item.name }}</span> 
							</el-text>
						</span> 
					</div>
					<div class="u-flex u-p-b-15 u-p-t-10">
						<div class="item u-p-r-10" v-if="!item.signflows_id">
							<el-button  
								plain
								type="warning" 
								size="small"  
								@click="getyiqianbao(item)" 
								>开始签约</el-button> 
						</div>
						<div class="item u-p-r-10" v-if="item.signflows_state == 1 || item.signflows_state == 2">
							<el-button  
								plain
								type="warning" 
								size="small"  
								@click="updateyiqianbao(item)" 
								>更新签约状态</el-button> 
						</div>
					</div>
					
				</div> 
			</el-col>
		</el-row>
		<el-row :gutter="10" v-if="list.pic_bankofsun">
			<el-col :span="5">
				<div class="grid-content label">微信二维码</div>
			</el-col>
			<el-col :span="19">
				<el-image 
						style="width: 140px; height: 140px; border-radius: 5px;" 
						:src="list.pic_bankofsun" 
						fit="cover" 
						lazy
						/>	
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label"> </div>
			</el-col>
			<el-col :span="19">
				<el-button  
					plain
					type="primary"  
					@click="router.push({ name: 'pacc_query_edit', params: {id: list.product_id} })"
					>申请授信</el-button> 
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang='ts'>
import { reactive, ref, inject, onMounted } from 'vue'
import { ElMessage, ElNotification } from 'element-plus'
import router from "@/router/guard"  
const $api: any = inject('$api') 
const list = ref<any>({})
const props = defineProps({
	id: String
})
const loading_status = ref(false)
const loading_loans = ref(false)
const loans = ref('no')
onMounted(async () => {
	if(!props.id) {
		ElMessage.error('参数有误')
		return
	} 
	await getData() 
})
const fileList = ref<any>([])

async function getData() {
	const res = await $api.pacc_query_detail({params: {id: props.id}, loading: true})
	if(res.code == 1) {
		list.value = res.list
		fileList.value = [
			{...res.list.file_286, loading: false}, 
			{...res.list.file_287, loading: false}
		]
	}
}
async function updateStatus() {
	try {
		const res = await $api.pacc_query({params: {pacc_id: list.value.pacc_id}, loading: false})
		if(res.code == 1) {
			ElNotification({
				title: '系统消息',
				message: '授信状态已更新', 
				type: 'success',
				position: 'bottom-right',
			})
		}
	} catch (error) { 
		loading_status.value = false
		ElNotification({
			title: '系统消息',
			message: error.msg,
			type: 'error',
			position: 'bottom-right',
		})
	}
}
async function updateStatusBtn() {
	loading_status.value = true
	await updateStatus()
	loading_status.value = false
	await getData()
}

async function getMoneyBtn() {
	loading_loans.value = true
	const res = await $api.query_loans_information({params: {id: list.value.id}, loading: false})
	loading_loans.value = false 
	if(res.code == 1) {
		loans.value = res.list.money
	}
}
async function getyiqianbao({contract_id, name}) {
	let index = fileList.value.findIndex(ele => ele.contract_id == contract_id)
	fileList.value[index].loading = true
	const res = await $api.yiqianbao_start({params: {id: list.value.id, contract_id}, loading: false})
	fileList.value[index].loading = false
	if(res.code == 1) { 
		ElNotification({
			title: '系统消息',
			message: '签约状态已更新', 
			type: 'success',
			position: 'bottom-right',
		})
		await getData() 
	}
} 
async function updateyiqianbao({contract_id, name}) {
	let index = fileList.value.findIndex(ele => ele.contract_id == contract_id)
	fileList.value[index].loading = true
	const res = await $api.query_signflows({params: {id: list.value.id, contract_id}, loading: false})
	fileList.value[index].loading = false
	if(res.code == 1) { 
		ElNotification({
			title: '系统消息',
			message: `${name}签约状态已更新`, 
			type: 'success',
			position: 'bottom-right',
		})
		await getData() 
	}
}

</script>
<style lang='scss' scoped>
.box {
	@extend %box-sizing;
}
.el-row {
	// margin-bottom: 6px;
	padding: 6px;
	border-radius: 5px;
	transition: all .3s;
	&:hover {
		background-color: #f8f8f8;
		.grid-content.content {
			box-shadow: 0 0 10px rgba(0,0,0,.1);
		}
	}
}
.grid-content {
	min-height: 35px;
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
		transition: all .3s;
		word-break: break-all;
		&.file-content {
			line-height: 25px;
			padding-top: 5px;
			margin-bottom: 10px;
			&:last-child {
				margin-bottom: 0;
			}
		}
	}
	.item {

	}
}
</style>