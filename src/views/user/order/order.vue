<!--  -->
<template>
	<div class="u-p-10">
		<div class="cart-box u-flex-y u-flex-items-start u-p-20">
			<div class="shop-item u-flex-1 " >
				<el-card class="box-card" shadow="hover">
					<template #header>
						<div class="card-header u-flex u-flex-between">
							<div class="item u-flex">
								<el-image style="width: 30px; height: 30px; border-radius: 5px;" :src="sell_info.img"
									fit="cover" lazy />
								<span class="u-m-l-10">{{ sell_info.company }}</span>
							</div>
						</div>
					</template>
					<div class="products-item">
						<el-table :data="list.pid" style="width: 100%">
							<el-table-column label="预览图" width="100" align="center">
								<template #default="{ row }">
									<el-image style="width: 60px; height: 60px; border-radius: 5px;" :src="row.img"
										fit="cover" lazy />
								</template>
							</el-table-column>
							<el-table-column label="商品信息">
								<template #default="{ row }">
									<div>
										<router-link tag="a" :to="{name: 'product', params: {id: row.pid}}">
											<el-text tag="b" size="large">{{ row.name }}</el-text>
										</router-link>
									</div>
									<div>
										<el-text type="info" size="small" v-for="item in row.specs_arr">
											{{ item.label }}：{{item.value }}；
										</el-text>
									</div>
								</template>
							</el-table-column>
							<el-table-column label="单价" prop="price" align="center" width="120"></el-table-column>
							<el-table-column label="数量" width="120" align="center">
								<template #default="{ row }">
									<span class="u-p-r-10">×</span><span>{{ row.num }}</span>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</el-card>
			</div>
		</div>
		<div class="content-addr-wrap" v-if="addressData.id" v-loading="address_loading">
			<div class="letter-box u-radius-10">
				<div class="letter-border u-radius-10">
					<div class="u-flex u-p-b-10">
						<div class="item-left u-m-r-20 u-flex ">
							<div class="default-label u-m-r-5" v-if="addressData.auto == 1">
								<el-button type="danger" size="small" plain>默认</el-button>
							</div>
							<div class="name u-m-r-10">{{ addressData.name }}</div>
							<div class="mobile">{{ addressData.mobile }}</div>
						</div>  
					</div>
					<div class="u-flex address u-line-2">
						{{ addressData.regional_name }}
						{{ addressData.address }}
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="u-p-20 box">
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">买家</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{ buy_info.login == login ? '我' : buy_info.company }}</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">卖家</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{ sell_info.login == login ? '我' : sell_info.company }}</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">订单创建时间</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">{{ list.ctime }}</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">订单状态</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">
					<el-text type="danger" v-if="list.status == '6'">{{ $filters.order_status(list.status) }}</el-text>
					<el-text type="success" v-else-if="list.status == '3' || list.status == '4'" >{{ $filters.order_status(list.status) }}</el-text>
					<el-text type="warning" v-else >{{ $filters.order_status(list.status) }}</el-text>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">总金额</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content u-flex">
					<el-statistic :precision="2" :value="list.total_fee" value-style="font-size: 14px" />
					<el-text type="info" class="u-m-l-10">元</el-text>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label">订单评分</div>
			</el-col>
			<el-col :span="19">
				<div class="grid-content content">
					<span class="u-m-r-10">{{ list.score }} 分</span>
					<el-rate :value="list.score" disabled />
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="5">
				<div class="grid-content label"></div>
			</el-col>
			<el-col :span="19" class="u-flex">
				<div class="item u-m-r-10" v-show="(list.status == 0 || list.status == 6)  && login == buy_info.login">
					<el-popconfirm 
						title="支付确认" 
						@confirm="orderBuyBtn"
						confirm-button-text="确认"
						cancel-button-text="取消"
						>
						<template #reference>
							<el-button plain type="primary" >订单支付</el-button>	
						</template>
					</el-popconfirm>
					
				</div>
				<div class="item u-m-r-10" v-show="list.status == 3 && login == buy_info.login">
				<!-- <div class="item u-m-r-10" > -->
					<el-button plain type="primary" @click="scoreBtn">我要评分</el-button>	
				</div>
				<div class="item u-m-r-10" v-show="list.status == 2 && login == buy_info.login">
					<el-popconfirm 
						title="收货确认" 
						@confirm="confirmReceiveBtn"
						confirm-button-text="确认"
						cancel-button-text="取消"
						>
						<template #reference>
							<el-button plain type="primary" >确认收货</el-button>	
						</template>
					</el-popconfirm>
					
				</div>
				<div class="item u-m-r-10" v-show="list.status == 1 && login == sell_info.login">
					<el-popconfirm 
						title="发货确认" 
						@confirm="confirmSendBtn"
						confirm-button-text="确认"
						cancel-button-text="取消"
						>
						<template #reference>
							<el-button plain type="primary" >确认发货</el-button>	
						</template>
					</el-popconfirm>
				</div>
				
			</el-col>
		</el-row>
	</div>
	<el-dialog v-model="showRate" title="请鼠标点击对应星级并确认进行订单评分" width="30%" center>
		<div class="u-flex u-flex-center">
			<el-rate v-model="score" :texts="['1分', '2分', '3分', '4分', '5分']" size="large"  />
		</div>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="showRate = false">取消</el-button>
				<el-button type="primary" @click="confirmScoreBtn">
					提交评分
				</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang='ts'>
import { reactive, ref, inject, onMounted, toRefs } from 'vue'
import { ElMessage, ElMessageBox  } from 'element-plus'
import router from "@/router/guard"
import {userStore} from '@/stores/user';
const user = userStore()
const {login} = toRefs(user)
console.log(user)
const $api: any = inject('$api')
const list = ref<any>({})
const sell_info = ref<any>({})
const buy_info = ref<any>({})
const addressData = ref<any>({})
const address_loading = ref(false)
const showRate = ref(false)
const score = ref(1)
const props = defineProps({
	id: String
})

onMounted(async () => { 
	if (!props.id) {
		ElMessage.error('参数有误')
		return
	} 
	await getData()
	try {
		address_loading.value = true
		await getAddressData()
	} catch (error) {
		
	}
		address_loading.value = false
	
})

async function getData() {
	const res = await $api.order_detail({ params: { order_id: props.id } })
	if (res.code == 1) {
		list.value = res.list
		sell_info.value = res.sell_info
		buy_info.value = res.buy_info
	}
}
async function getAddressData() { 
	const res = await $api.address_detail({ params: { address_id: list.value.address_id }, loading: false })
	if (res.code == 1) {
		addressData.value = res.list 
	}
}
async function orderBuyBtn () {
	const res = await $api.rz_pay({params: {
		order_id: props.id
	}})
	if(res.code == 1) { 
		ElMessage.success(res.msg)
		await getData()
	}
}
async function confirmScoreBtn() { 
	if(score.value == 0) {
		ElMessage.warning('请先点击星级进行评分')
		return
	}
	await ElMessageBox.confirm(`当前您的评分为：${score.value}分，请确认！` , {'cancelButtonText': '取消', 'confirmButtonText': '确认并提交'})
    const res = await  $api.order_score({params: {score: score.value, order_id: props.id}});
	if(res.code == 1) {
		ElMessage.success(res.msg)
		await getData()
	}
}
async function scoreBtn () {
	showRate.value = true
}

async function confirmReceiveBtn () {
	await changeStatus()
	await getData()
}

async function confirmSendBtn () {
	await changeStatus()
	await getData()
	
}

async function changeStatus () {
	const res = await $api.change_order_status({params: {
		order_id: props.id
	}})
	if(res.code == 1) {
		ElMessage.success(res.msg)
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
			box-shadow: 0 0 10px rgba(0, 0, 0, .1);
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
		transition: all .3s;
		;
	}
}

.letter-border {
	padding: 30px;
	background: #fdfdfd;
	@extend %box-sizing;
}

.letter-box {
	@extend %box-sizing;
	padding: 4px;
	box-sizing: border-box;
	background: linear-gradient(45deg,
			#f22121 12.5%,
			#ebe4f8 12.5%,
			#ebe4f8 25%,
			#2c6dd6 25%,
			#2c6dd6 37.5%,
			#ebe4f8 37.5%,
			#ebe4f8 50%,
			#f22121 50%,
			#f22121 62.5%,
			#ebe4f8 62.5%,
			#ebe4f8 75%,
			#2c6dd6 75%,
			#2c6dd6 87.5%,
			#ebe4f8 87.5%,
			#ebe4f8 100%);
	background-size: 70px 70px;
}
.content-addr-wrap {
	padding: 10px 20px 10px;
	width: 100%;
	@extend %box-sizing;
	.name {}

	.address {
		color: #888;
		font-size: 14px;
	}

	.mobile {}
}

.cart-box {
	height: 100%;
	@extend %box-sizing;
	.cart-box-footer {
		@extend %box-sizing;
		height: 100px;
		width: 100%;
		background-color: #fff;
		.cart-box-footer-w {
			@extend %box-sizing;
			width: 100%; 
			background-color: #fff;
			height: 100px;
			// box-shadow: var(--el-box-shadow-lighter);
			.cart-box-footer-box {
				@extend %box-sizing;
				border-radius: 0 0 10px 10px;
			border: 1px solid var(--el-border-color);
				width: 100%;
				height: 100%;
			}
		}
	}
}
.cart-box-main {
	width: 100%;
	min-height: 60vh;
}

.shop-item {
	width: 100%; 
	@extend %box-sizing;
	::v-deep {
		.el-loading-spinner {
			--el-loading-spinner-size: 20px;
			color: $uni-color-primary;
		}
		.el-table thead {
			// display: none;
		}
		.el-card__header {
			background-color: #f8f8f8;
			padding-top: 10px;
			padding-bottom: 10px;
		}
	}
	.el-card {
		--el-card-border-radius: 20px;
		
	}
}
.cart-box-footer {
	@extend %box-sizing;
	height: 100px;
	width: 100%;
	background-color: #fff;
	.cart-box-footer-w {
		@extend %box-sizing;
		width: 100%; 
		background-color: #fff;
		height: 100px;
		// box-shadow: var(--el-box-shadow-lighter);
		.cart-box-footer-box {
			@extend %box-sizing;
			// border-radius: 0 0 10px 10px;
			border-top: 1px solid var(--el-border-color);
			width: 100%;
			height: 100%;
		}
	}
}
</style>