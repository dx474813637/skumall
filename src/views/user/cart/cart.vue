<template>
	<div class="cart-box u-flex-y u-flex-items-start u-p-20">
		<div class="cart-box-main">
			<template v-if="cart_list.length == 0">
				<div class="u-flex u-flex-center u-p-20" style="width: 100%;">
					<el-empty description="选品车为空" />
				</div>
				
			</template>
			<div class="shop-item u-flex-1 u-m-b-40"
				v-for="(shop, index) in cart_list"
				:key="shop.shop.id"
				>
				<el-card class="box-card" shadow="hover">
					<template #header>
						<div class="card-header u-flex u-flex-between">
							<div class="item u-flex">
								<div class="u-m-r-20">
									<el-checkbox
										v-model="shop.shop.checked"
										:disabled="shop.products.every(ele => ele.disabled)"
										:indeterminate="shop.shop.indeterminate" 
										@change="($event) => handleCheckChange($event, [index, -1])"
										></el-checkbox>
								</div>
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
							<el-table-column  width="50" align="center" >
								<template #default="{row, $index}">
									<el-checkbox 
										v-model="row.checked" 
										:disabled="row.disabled"
										size="large" 
										@change="($event) => handleCheckChange($event, [index, $index])"
										/>
								</template> 
							</el-table-column>
							<el-table-column label="预览图" width="100" align="center" >
								<template #default="{row}">
									<div class="img-w" :class="{
										disabled: row.disabled
										}" >
										<el-image  
											:src="row.img" 
											fit="cover" 
											lazy
											/>
									</div>
									
								</template> 
							</el-table-column>
							<el-table-column label="商品信息" >
								<template #default="{row}">
									<div class="u-flex">
										<router-link :to="{name: 'product', params: {id: row.pid}}">
											<el-text :type="row.disabled? 'info' : 'default'" tag="b" size="large" >{{ row.name }}</el-text> 
										</router-link>
										<el-button class="u-m-l-10" type="info" size="small" plain v-show="row.disabled">已失效</el-button>
									</div>
									<div>
										<el-text type="info" size="small" v-for="item in row.specs_arr">【{{ item.label }}：{{ item.value }}】</el-text> 
									</div>
								</template>
							</el-table-column>
							<el-table-column label="价格" prop="price" align="center" width="120"></el-table-column>
							<el-table-column label="数量" width="200" align="center" >
								<template #default="{row, $index}">
									<div class="u-p-10"
										v-loading="row.loading"
										element-loading-background="rgba(255, 255, 255, 0.7)"
										element-loading-spinner='<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"></path></svg>'
										>
										<el-input-number 
											v-model="row.num" 
											:disabled="row.disabled"
											:min="1" :max="row.stock" 
											@change="(currentValue: number | undefined, oldValue: number | undefined) => handleNumChange(currentValue, oldValue, [index, $index])" 
											size="small" 
											step-strictly
											/>
									</div>
									
								</template>
							</el-table-column>
							<el-table-column  width="50" align="center" >
								<template #default="{row}">
									<el-popconfirm 
										title="移除确认" 
										@confirm="deleteProduct({ shopId: shop.shop.id, productId: row.id })"
										confirm-button-text="确认"
										cancel-button-text="取消"
										>
										<template #reference>
											<el-button link >
												<el-icon>
													<i-ep-Delete /> 
												</el-icon>
											</el-button>
										</template>
									</el-popconfirm>
									
								</template>
							</el-table-column>
						</el-table>
					</div>
				</el-card>
			</div>
		</div>
		
		<div class="cart-box-footer ">
			<el-affix position="bottom" :offset="0">
				<div class="cart-box-footer-w">
					<div class="cart-box-footer-box u-flex u-flex-between u-p-20">
						<div class="item u-flex">
							<el-checkbox
								v-model="allCheck" 
								size="large"
								>全选</el-checkbox>
							<div class="item u-p-l-20">
								<el-popconfirm 
									title="移除确认" 
									@confirm="cart.removeProductsById(cart_list.map(ele => ele.products.filter(item => item.checked).map(item => item.id)).reduce((a, b) => a.concat(b)))"
									confirm-button-text="确认"
									cancel-button-text="取消"
									>
									<template #reference>
										<el-button type="warning" size="small" plain >
											移除勾选商品
										</el-button>
									</template>
								</el-popconfirm>
							</div>
							<div class="item u-p-l-20">
								<el-popconfirm 
									title="移除确认" 
									@confirm="cart.removeProductsById(cart_list.map(ele => ele.products.filter(item => item.disabled).map(item => item.id)).reduce((a, b) => a.concat(b)))"
									confirm-button-text="确认"
									cancel-button-text="取消"
									>
									<template #reference>
										<el-button type="warning" size="small" plain >
											移除失效商品
										</el-button>
									</template>
								</el-popconfirm>
							</div>
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
								<el-button type="danger" @click="beforeCreateOrderBtn" :disabled="cart_list_checked_num == 0" style="width: 100%;">去结算</el-button>
							</div>
						</div>
					</div>
				</div>
				
			</el-affix>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, onMounted, toRefs, computed, inject, onUnmounted } from "vue";
import router from '@/router/guard'
import { cartStore } from "@/stores/cart"; 
const cart = cartStore();
const { cart_list, cart_list_checked_num, cart_list_checked_price } = toRefs(cart);
const $api:any = inject('$api') 
onMounted(async () => {
	console.log(cart_list.value);
	if(sku_ids.value) {
		checkPidSku()
	}
	window.addEventListener('storage', cart.addEventLocalStorage)  
});
onUnmounted(() => {
	window.removeEventListener('storage', cart.addEventLocalStorage)
})
const allCheck = computed({
	get() { 
		return cart_list.value.length ==0 ? false : cart_list.value.every(ele => ele.shop.checked) 
	},
	set(v) {  
		handleCheckChange(v, [-1, -1])
	}
})
const sku_ids = computed(() => cart_list.value.map(ele => ele.products.filter(item => !item.disabled).map(item => item.id).join(',')).join(','))
watch(
	() => cart_list.value,
	(val) => {
		console.log('save all')
		cart.saveCartData2LocalStorage()
	},
	{deep: true}
)
// watch(
// 	() => [
// 		...cart_list.value.map(ele => ele.products.map(item => item.num)),
// 		...cart_list.value.map(ele => ele.products.map(item => item.checked))
// 	],
// 	(val, old) => {
// 		console.log('duo',val, old)
// 	},
// 	{deep: true}
// )
watch(
	() => cart_list.value.map((ele:any) => ele.products.map((item:any) => item.checked)),
	() => {
		console.log('checked',cart_list.value)
		
	},
	{deep: true}
)
function deleteProduct({shopId, productId}:any) { 
	console.log(shopId, productId)
	let positionArr:any = [];
	cart_list.value.some((ele:any, index:any) => {
		let flag = false
		if(ele.shop.id == shopId) {
			ele.products.some((item:any, i:any) => {
				if(item.id == productId) {
					positionArr = [index, i]
					flag = true
					return true
				}
				return false
			})
		}
		return flag
	}) 
	if(positionArr.length == 0) return;  
	let items = cart_list.value[positionArr[0]]
	items.products.splice(positionArr[1], 1) 
	if(items.products.length == 0) {
		cart_list.value.splice(positionArr[0], 1)
	} 
	
		updateShopCheckStatus(positionArr[0])
	

}

function updateShopCheckStatus(index) {
	if(index || index === 0) {
		let items = cart_list.value[index];
		items.shop.indeterminate = false
		if(items.products.every(ele => ele.checked)) {
			items.shop.checked = true
		}
		else if(items.products.every(ele => !ele.checked)) {
			items.shop.checked = false
		}else {
			items.shop.indeterminate = true
		}
	}
	else {
		cart_list.value.forEach((ele, i) => {
			updateShopCheckStatus(i)
		})
	}
}
 

async function checkPidSku() {
	await cart.getPidSku(sku_ids.value)
}

function handleCheckChange(val, positionArr, hasReturn=false) { 
	let idStr = ''
	let items = cart_list.value[positionArr[0]] 
	if(positionArr[1] == -1 && positionArr[0] == -1) {
		cart_list.value.forEach((ele, index) => {
			ele.shop.checked = val
			let {ids} = handleCheckChange(val, [index, -1], true)
			idStr += ((index == 0? '' : ',') + ids)
		})  
	}
	if(positionArr[1] == -1 && positionArr[0] != -1) { 
		items.shop.indeterminate = false;
		items.products.forEach(ele => {
			ele.checked = val
		})
		idStr = items.products.map(ele => ele.id).join(',')
		if(hasReturn) {
			return { ids: idStr }
		}
		
	}
	if(positionArr[1] != -1 && positionArr[0] != -1) { 
		idStr = items.products[positionArr[1]].id
		if(!val) {
			items.shop.checked = false;
			if(items.products.every(ele => !ele.checked)) {
				items.shop.indeterminate = false;
			}else {
				items.shop.indeterminate = true;
			}
		}
		else {
			if(items.products.every(ele => ele.checked && !ele.disabled)) {
				items.shop.checked = true;
				items.shop.indeterminate = false;
			} else {
				items.shop.indeterminate = true;
			}
		}
 
	}
	if(val) {
		cart.getPidSku(idStr)
	}
}
async function handleNumChange(currentValue: number | undefined, oldValue: number | undefined, positionArr: Array) {
	console.log(currentValue, oldValue, positionArr)
	let id = cart_list.value[positionArr[0]].products[positionArr[1]].id
	let {res} = await cart.getPidSku(id) 
	if(res.length == 0) {
		cart_list.value[positionArr[0]].products[positionArr[1]].num = oldValue
	}
}

function beforeCreateOrderBtn() {
	router.push({name: 'order_create', force: true, state: { products: [] }})
}
</script>
<style lang="scss" scoped>
.img-w {
	width: 60px; 
	height: 60px; 
	border-radius: 5px;
	overflow: hidden;
	margin: 0 auto;
	position: relative;
	&:after {
		position: absolute;
		content: '';
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255,255,255,.6);
		display: none;
	}
	&.disabled {
		&:after {
			display: block;
		}

	}
	.el-image {
		width: 100%;
		height: 100%;
	}
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
			display: none;
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
</style>
