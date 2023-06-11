<template>
	<div class="cart-box u-flex-y u-flex-items-start u-p-20">
		<div class="shop-item u-flex-1 u-m-b-40"
			v-for="(shop, index) in cart_list"
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
									<router-link :to="{name: 'product', params: {id: row.pid}}">
										<el-text  tag="b" size="large" >{{ row.name }}</el-text> 
									</router-link>
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
</template>

<script setup lang="ts">
import { reactive, ref, watch, onMounted, toRefs, computed, inject, onUnmounted } from "vue";
import router from '@/router/guard'
import { cartStore } from "@/stores/cart";  
const cart = cartStore();
const { cart_list, cart_list_checked_num, cart_list_checked_price } = toRefs(cart);
const $api = inject("$api");
const curOrderData = ref([])
onMounted(() => { 
	console.log(window.history.state.message)
	$api.orderConfirm(); 
});
watch(
	() => cart_list.value,
	() => {
		console.log('cera')
	},
	{deep: true}
)

</script>
<style lang="scss" scoped>
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
.shop-item {
	width: 100%;
	min-height: 60vh;
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
</style>
