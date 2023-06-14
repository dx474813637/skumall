<!--  -->
<template>
	<div class="u-p-20 box">
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">产品名</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{ list.name }}</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">所属银行</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{ list.bank_name }}</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">授信期限</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{ list.credit_term }} {{ $filters.en2cn(list.credit_mode) }}</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">单户最高额度</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{ list.max_amount }} 元</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">贷款期限</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{ list.loan_term }} {{ $filters.en2cn(list.credit_mode) }}</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">银行利率(年化)</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{ list.annualized }}</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">备注</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{ list.remark }}</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">产品状态</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">
					<el-text type="success" v-if="list.status == '1'">激活</el-text> 
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">授信申请</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">
					<el-button  
						v-if="list.yiqianbao_state == '2'"
						type="primary"  
						link
						@click="router.push({ name: 'pacc_query_edit', params: {id: props.id} })"
						>预授信申请</el-button> 	
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">历史授信</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">
					<el-button 
						link 
						type="primary"  
						@click="router.push({ name: 'pacc_query_list' })"
						>查看</el-button> 
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang='ts'>
import { reactive, ref, inject, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import router from "@/router/guard"  
const $api: any = inject('$api') 
const list = ref<any>({})
const props = defineProps({
	id: String
})

onMounted(async () => {
	if(!props.id) {
		ElMessage.error('参数有误')
		return
	}
	await getData()
})

async function getData() {
	const res = await $api.query_product_detail({params: {product_id: props.id}})
	if(res.code == 1) {
		list.value = res.list
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
		transition: all .3s;;
	}
}
</style>