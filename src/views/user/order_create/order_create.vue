<template>
	<div class="content-addr-wrap" >
		<div class="letter-box u-radius-10">
			<div class="letter-border u-radius-10">
				<div class="u-flex u-p-b-10">
					<div class="item-left u-m-r-20 u-flex ">
						<div class="default-label u-m-r-5" v-if="addressData.auto == 1">
							<el-button type="danger" size="small" plain>默认</el-button>
						</div>
						<div class="name u-m-r-10">{{addressData.name}}</div>
						<div class="mobile">{{addressData.mobile}}</div>
					</div>
					<div class="item-right">
						<el-button class="u-p-0" type="text" @click="handleShowAddrBox">
							<div class="u-flex">
								选择其他地址
							</div>
						</el-button>
					</div>

				</div>
				<div class="u-flex address u-line-2">
					{{addressData.regional_name}}
					{{addressData.address}}
				</div>
			</div>
		</div>
	</div>
	<div class="cart-box u-flex-y u-flex-items-start u-p-20">
		<div class="shop-item u-flex-1 u-m-b-40"
			v-for="(shop, index) in products_checked"
			:key="shop.shop.id"
			>
			<el-card class="box-card" shadow="hover">
				<template #header>
					<div class="card-header u-flex u-flex-between">
						<div class="item u-flex"> 
							<el-image 
								style="width: 30px; height: 30px; border-radius: 5px;" 
								:src="shop.shop.img" 
								fit="cover" 
								lazy
								/>
							<span class="u-m-l-10">{{ shop.shop.company }}</span> 
						</div>
					</div>
				</template>
				<div class="products-item" >
					<el-table   
						:data="shop.products" 
						style="width: 100%"   
						> 
						<el-table-column label="预览图" width="100" align="center" >
							<template #default="{row}">
								<el-image 
									style="width: 60px; height: 60px; border-radius: 5px;" 
									:src="row.img" 
									fit="cover" 
									lazy
									/>
							</template> 
						</el-table-column>
						<el-table-column label="商品信息" >
							<template #default="{row}">
								<div>
									<!-- <router-link :to="{name: 'product', params: {id: row.pid}}"> -->
										<el-text  tag="b" size="large" >{{ row.name }}</el-text> 
									<!-- </router-link> -->
								</div>
								<div>
									<el-text type="info" size="small" v-for="item in row.specs_arr">{{ item.label }}：{{ item.value }}；</el-text> 
								</div>
							</template>
						</el-table-column>
						<el-table-column label="单价" prop="price" align="center" width="120"></el-table-column>
						<el-table-column label="数量" width="120" align="center" >
							<template #default="{ row }">
								<span class="u-p-r-10">×</span><span>{{ row.num }}</span>
							</template>
						</el-table-column>  
					</el-table>
				</div>
			</el-card>
		</div> 
	</div>
	<div class="cart-box-footer "> 
		<div class="cart-box-footer-w">
			<div class="cart-box-footer-box u-flex u-flex-between u-p-20">
				<div class="item"> 
				</div>
				<div class="item u-flex">
					<div class="item u-m-r-20">
						<el-text type="info">
							当前选择 <el-text type="danger">{{cart_list_checked_num}}</el-text> 件商品
						</el-text> 
					</div>
					<div class="item "> 
						<div class="item u-flex">
							
							<el-text type="danger">合计：</el-text> 
							<el-statistic :value="cart_list_checked_price" value-style="color: red; font-weight: bold" :precision="2" /> 
							<el-text type="danger" class="u-m-l-6"> 元</el-text> 
						</div>
						<el-button type="danger" @click="createOrderBtn" :disabled="cart_list_checked_num == 0" style="width: 100%;">创建订单</el-button>
					</div>
				</div>
			</div>
		</div>
				 
	</div>
	<el-dialog v-model="addrTableDialog" @close="close" title="地址列表" width="70%" :close-on-click-modal="false" :close-on-press-escape="false" > 
        <table-address
			:currentRow="currentRow"
            isRadioGroup
            maxHeight="50vh"
            @setCurrentRow="setCurrentRow"
        ></table-address> 
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="closeBtn">退出</el-button>
                <el-button type="primary" @click="handleConfirmAddr">选择</el-button> 
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, watch, onMounted, toRefs, computed, inject, onUnmounted } from "vue";
import router from '@/router/guard'
import { cartStore } from "@/stores/cart";  
import { ElNotification, ElMessage } from 'element-plus' 
import { update } from "lodash";
const cart = cartStore();
const { cart_list, cart_list_checked_num, cart_list_checked_price } = toRefs(cart);
const $api = inject("$api"); 
onMounted(async () => { 
	// console.log(window.history.state.message)
	await init()
});
const products_checked = computed(() => {
	return cart_list.value.map(ele => ({...ele, products: ele.products.filter(item => item.checked)})).filter(ele => ele.products.length != 0)
})
let addressData = ref({
	id: '',
	name: '',
	mobile: '',
	address: '',
	regional_name: '',
	auto: 0,
})
const currentRow = ref({})
const currentRowOld = ref({})
const addrTableDialog = ref(false)
watch(
	() => cart_list.value,
	() => {
		console.log('cera')
	},
	{deep: true}
)

async function init() {
	const res = await $api.orderConfirm(); 
	if(res.code == 1) { 
		addressData.value = res.moren 
		// addressData = res.moren
		// addressData.id = res.moren.id;
		// addressData.name = res.moren.name;
		// addressData.mobile = res.moren.mobile;
		// addressData.address = res.moren.address;
		// addressData.regional_name = res.moren.regional_name;
		// addressData.auto = res.moren.auto;
	}
}

function handleShowAddrBox() {
	addrTableDialog.value = true;
	currentRow.value = addressData
}
function handleConfirmAddr() { 
	if (currentRow.value.id) {
		addrTableDialog.value = false
		addressData.value = currentRow.value;
		currentRowOld.value = addressData.value
	}
}
function closeBtn() { 
	addressData.value = currentRowOld.value;
	addrTableDialog.value = false
}
function setCurrentRow({val, oldVal}) {
    currentRow.value = val
    
}

async function createOrderBtn() {
	// router.push({name: 'order_create', force: true, state: { products: [] }})
	let idStr = products_checked.value.map(ele => ele.products.map(item => item.id).join(',')).join(',')
	await cart.getPidSku(idStr);
	await createOrder()
}
async function createOrder() {
	let arr = products_checked.value.map(ele => ele.products.map(item => ({id: item.id, num: item.num}))).reduce((a, b) => a.concat(b))
 
	const res = await $api.create_order({
		params: {
			address_id: addressData.value.id,
			pid_array: JSON.stringify(arr)
		}
	})
	if(res.code == 1) {
		cart.removeProductsById(arr.map(ele => ele.id))
		cart.saveCartData2LocalStorage()
		router.replace({name: 'order_list'})
		ElMessage.success(res.msg)
	}
}
</script>
<style lang="scss" scoped>
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
