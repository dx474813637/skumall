<!--  -->
<template>
	<div class="u-p-20 box">
		<!-- <el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">融资ID</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{ list.id }}</div>
			</el-col>
		</el-row> -->
		<!-- <el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">来源订单</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">
					<el-link :underline="false">
						<el-text type="primary" @click="router.push({name: 'order', params: {id: list.order_id}})">{{ list.order_id }}</el-text>
					</el-link>
					
				</div>
			</el-col>
		</el-row> -->
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">卖家</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{ list.sell_company }}</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">买家</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{ list.buy_company }}</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">商品名称</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{ list.product_name }}</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">商品描述</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{ list.product_intro }}</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">融资金额</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{ list.price }}元</div>
			</el-col>
		</el-row>
		<!-- <el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">放款银行</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">
					<el-link :underline="false">
						<el-text type="primary" @click="router.push({name: 'pacc_query', params: {id: list.bank_pacc?.id}})">{{ list.bank_zxrz?.bank_name }}</el-text>
					</el-link>
				</div>
			</el-col>
		</el-row> -->
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">融资时间</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{ list.post_time }} </div>
			</el-col>
		</el-row>
		<!-- <el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">融资期限</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{list.credit_termMonth}}月</div>
			</el-col>
		</el-row> -->
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">融资状态</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content u-flex" v-loading="loading_status"> 
					<el-text type="danger" v-if="list.status == '4'">{{ $filters.order_rz_status(list.rz_status) }}</el-text>
					<el-text type="success" v-else-if="list.rz_status == '8'">{{ $filters.order_rz_status(list.rz_status) }}</el-text>
					<el-text type="warning" v-else>{{ $filters.order_rz_status(list.rz_status) }}</el-text> 

					<el-button type="primary" plain size="small" class="u-m-l-30" @click="updateStatusBtn">更新</el-button>
				</div>
			</el-col>
		</el-row> 
		<!-- <el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">订单支付状态</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content u-flex" v-loading="loading_status"> 
                <el-text type="danger" v-if="list.status == '6'">{{ $filters.order_pay_status(list.status) }}</el-text>
                <el-text type="success" v-else-if="list.status == '5'" >{{ $filters.order_pay_status(list.status) }}</el-text>
                <el-text type="warning" v-else >{{ $filters.order_pay_status(list.status) }}</el-text>

					<el-button type="primary" plain size="small" class="u-m-l-30" @click="updateStatusBtn">更新</el-button>
				</div>
			</el-col>
		</el-row>  -->
		<!-- <el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">受托支付账户卡号</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{list.bank_account?.cardNo}}</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">受托支付账户开户行</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{list.bank_account?.subbranch}}</div>
			</el-col>
		</el-row> -->
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">备注</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{list.remark}}</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label"></div>
			</el-col>
			<el-col :span="19" class="u-flex">
				<div class="item u-m-r-10" v-show="list.rz_status == 2">
					<el-popconfirm 
						title="发起确认" 
						@confirm="orderBuyBtn"
						confirm-button-text="确认"
						cancel-button-text="取消"
						>
						<template #reference>
							<el-button plain type="primary" >发起无订单融资提款请求</el-button>	
						</template>
					</el-popconfirm>
					
				</div>
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
onMounted(async () => {
	if(!props.id) {
		ElMessage.error('参数有误')
		return
	}
	await getData()
})

async function getData() {
	const res = await $api.no_order_rz_pay_detail({params: {id: props.id}})
	if(res.code == 1) {
		list.value = res.list
	}
}
async function orderBuyBtn () {
	const res = await $api.no_order_rz_pay({
		order_id: list.value.order_id,
		sell_id: list.value.id,
		pay_price: list.value.price,
		product_intro: list.value.product_intro,
		remark: list.value.remark,
	})
	if(res.code == 1) { 
		ElMessage.success(res.msg)
		await getData()
	}
}

async function updateStatus() {
	try {
		const res = await $api.no_order_pay_query({loading: false})
		if(res.code == 1) {
			ElNotification({
				title: '系统消息',
				message: '状态已更新', 
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