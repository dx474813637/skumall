<!--  -->
<template>
	<Header-base></Header-base>
	<div class="main u-p-20">
		<div class="home-w">
			<el-row :gutter="30" class="u-m-b-40">
				<el-col :span="7">
					<div class="u-m-b-15">
						<product-focusing 
							:imgs="picArr"
							:index="activeIndex"
							></product-focusing>
					</div>
					<div class="preview-img-tabs">
						<el-tabs
							v-model="activeIndex"
							type="border-card"  
							>
							<el-tab-pane  
								v-for="(item, index) in picArr"
								:key="index"
								:name="index"
								>
								<template #label> 
									<el-image 
										:src="item"
										class="preview-img"
										fit="cover" 
										@mouseenter="previewHoverEvent(index)"
										></el-image>  
								</template>
							</el-tab-pane> 
						</el-tabs> 
					</div>
				</el-col>
				<el-col :span="12">
					<div class="main-center u-p-r-30">
						<div class="product-title u-m-b-10">
							<el-text class="u-font-20">{{ product_base_data.name }}</el-text> 
						</div>
						<div class="product-price u-p-10 u-m-b-5">
							<div class="u-flex u-flex-items-start info-row" >
								<div class="info-row-item info-row-item-label">价格：</div>
								<div class="info-row-item info-row-item-content u-flex u-flex-items-start u-flex-wrap u-m-l-10">
									<el-text type="danger" tag="b">￥</el-text>
									<el-statistic :value="skuPrice" :precision="2" value-style="color: #ff0000; font-size: 22px; font-weight: bold"></el-statistic>
								</div>
							</div>
						</div>
						<div class="product-fahuo u-m-b-5">
							<div class="u-flex u-flex-items-start info-row" >
								<div class="info-row-item info-row-item-label">发货：</div>
								<div class="info-row-item info-row-item-content u-flex u-flex-items-start u-flex-wrap u-m-l-10">
									<el-text >预计 {{ product_base_data.delivery_delay_day }} 天发货</el-text> 
								</div>
							</div>
						</div>
						<div class="product-service u-m-b-5">
							<div class="u-flex u-flex-items-start info-row" >
								<div class="info-row-item info-row-item-label">服务：</div>
								<div class="info-row-item info-row-item-content u-flex u-flex-items-start u-flex-wrap u-m-l-10">
									<el-text >{{ freight_name }}</el-text> 
								</div>
							</div>
						</div>
						<div class="product-data u-p-t-5 u-p-b-5 u-m-t-5 u-m-b-15">
							<el-row :gutter="20">
								<el-col :span="8">
									<el-text type="info" size="small">重量：{{ product_base_data.weight }} {{ $filters.weight_unit2_str(product_base_data.weight_unit) }}</el-text>
								</el-col>
								<el-col :span="8">
									<el-text type="info" size="small">浏览量：{{ product_base_data.pageviews }}次</el-text>
								</el-col>
							</el-row>
						</div> 
						<div class="u-flex u-flex-items-start info-row u-m-b-10" 
							v-for="(item, index) in product_sku.data"
							:key="index"
							>
							<div class="info-row-item info-row-item-label">
								{{ item.label }}：
							</div>
							<div class="info-row-item info-row-item-content u-flex u-flex-items-start u-flex-wrap u-m-l-10">
								<div class="content-item u-m-r-10 u-m-b-10 radio"
									v-for="(ele,i) in item.children"
									:key="i"
									>
									<el-check-tag 
										:checked="product_sku.form[item.label] == ele.label" 
										@change="skuClick(item.label, ele.label)"
										>{{ ele.label }}</el-check-tag>
								</div>
							</div>
						</div>
						<div class="u-flex u-flex-items-start info-row u-m-b-20" >
							<div class="info-row-item info-row-item-label">数量：</div>
							<div class="info-row-item info-row-item-content u-flex u-flex-items-start u-flex-wrap u-m-l-10">
								<div class="content-item u-m-r-10 u-m-b-10" >
									<el-input-number 
										ref="countRef" 
										v-model="product_num" 
										:min="1" 
										:max="product_num_max" 
										@blur="handleChange" 
										/>
								</div>
							</div>
						</div>
						<div class="u-flex u-flex-items-start info-row" >
							<div class="info-row-item info-row-item-label"> </div>
							<div class="info-row-item info-row-item-content u-flex u-flex-items-start u-flex-wrap u-m-l-10">
								<div class="content-item u-m-r-10 u-m-b-10" >
									<el-button type="primary" @click="addCartBtn" :disabled="skuCheckStatus" size="large">加入采购车</el-button>
								</div>
							</div>
						</div>
						<div class="u-flex u-flex-items-start info-row" >
							<div class="info-row-item info-row-item-label"> </div>
							<div class="info-row-item info-row-item-content u-m-l-10">
								<!-- <el-text size="small" type="info" v-if="product_ctime">创建时间：{{ $filters.time_from( product_ctime, false )  }}</el-text> -->
								<el-text size="small" type="info" v-if="product_ctime">创建时间：{{ product_ctime  }}</el-text>
								<el-text size="small" type="info" class="u-m-l-30" v-if="product_uptime">更新时间：{{ product_uptime }}</el-text>
							</div>
						</div> 
					</div>
				</el-col>
				<el-col :span="5">
					<div class="shop-card u-p-12">
						<div class="shop-box u-p-15 u-p-t-30 u-p-b-30">
							<div class="shop-header shop-row u-flex u-flex-items-start">
								<div class="shop-logo">
									<el-avatar  :src="product_shop_data.img" />
								</div>
								<div class="shop-name u-m-l-10">
									<el-link @click="$router.push({name: 'shop', params: {id: 1}})">
										<el-text size="large">
											{{product_shop_data.company}}
										</el-text>
										
									</el-link>
								</div> 
							</div>
							<div class="shop-row"><el-text size="small">地址：{{ product_shop_data.address }}</el-text></div>
							<div class="shop-row"><el-text size="small">联系人：{{ product_shop_data.contacts }}</el-text></div>
							<div class="shop-row"><el-text size="small">联系方式：{{ product_shop_data.phone }}</el-text></div>
							<div class="shop-row"><el-text size="small">介绍：{{ product_shop_data.info }}</el-text></div>
						</div>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="19">
					<div class="u-m-b-40">
						<el-tabs v-model="detailActive" type="border-card">
							<el-tab-pane label="商品详情" name="description">
								<div class="u-p-10">
									<el-image v-for="(item, index) in descriptionArr" :key="index"
										:src="item"
										lazy
										style="width: 100%;"
									></el-image>
								</div>
							</el-tab-pane> 
						</el-tabs>
					</div>
				</el-col>
			</el-row>
		</div>
		
	</div>
	<Footer-base></Footer-base>
</template>

<script setup lang="ts">
import { reactive, ref, watch, onMounted, onUnmounted, inject, toRefs, computed } from 'vue';
import { cartStore } from '@/stores/cart'
import { ElMessage, ElNotification } from 'element-plus' 
import router from '@/router';
const cart = cartStore()
import useProductSku from '@/hook/useProductSku.ts'
import {isObjectEqual} from '@/utils/index'
import { userStore } from '@/stores/user';
import {timeFrom} from '@/utils/index'
const user = userStore();
let { login } = toRefs(user); 
import { cateStore } from '@/stores/cate';
const cate = cateStore();
let { freight_list } = toRefs(cate); 
const product_ctime = computed(() => timeFrom(String(new Date(product_base_data.value.ctime).getTime())) )
const product_uptime = computed(() => timeFrom(String(new Date(product_base_data.value.uptime).getTime())) )
const {
    sku2treeData,
	getPriceStockBySkuId
} = useProductSku()
const $api = inject('$api')
const props = defineProps({
	id: {
		type: String,
		default: ''
	},
});     
const detailActive = ref('description')
const product_base_data = ref({})
const picArr = computed(() => product_base_data.value.pic?.split('|'))
const descriptionArr = computed(() => product_base_data.value.description?.split('|'))
const spec_prices_data = ref([])
const product_shop_data = ref({})
const product_sku = reactive({
	data: {},
	form: {}
})
const countRef = ref()
const product_num = ref(1)
const product_num_max = ref(Infinity)
// const product_sku_form = reactive({})
const skuCheckStatus = computed(() => Object.values(product_sku.form).some(ele => !ele) )
const activeIndex = ref(0)

const freight_name = computed(() => freight_list.value.filter(ele => ele.value == product_base_data.value?.freight_id)[0]?.label)

const skuPrice = computed(() => {
	let price = 0;
	let i = findIndexby()
	if(i != -1) {
		price =  +spec_prices_data.value[i].price
	}else {
		price =  +product_base_data.value.price || 0
	}
	return price
})

watch(
	() => product_base_data.value.sku,
	(val) => {
		// console.log(val);
		product_sku.data = sku2treeData(val)
		product_sku.data.forEach(ele => {
			product_sku.form[ele.label] = ''
		})
		// console.log(product_sku.form)
	}
)
watch(
	() => product_num_max.value,
	(val, old) => {
		console.log(val);
		if(val < product_num.value) {
			product_num.value = product_num_max.value
			countRef.value.blur()
		}
	}
)
watch(
	() => product_num.value,
	(val, old) => {
		console.log(val);
		if(val > product_num_max.value) {
			product_num.value = product_num_max.value
			countRef.value.blur()
		}
	}
)
 
onMounted(async () => {
	await getData()
	window.addEventListener('storage', cart.addEventLocalStorage)  
})
onUnmounted(() => {
	window.removeEventListener('storage', cart.addEventLocalStorage)
})

const getData = async () => {
	const res = await $api.web_product_detail({ params: { id: props.id } })
	if(res.code == 1) {
		product_base_data.value = res.list
		spec_prices_data.value = res.spec_prices
		product_shop_data.value = res.company
	}
}
const skuClick = (key, value) => {
	if(product_sku.form[key] == value) {
		value = ''
	} 
	product_sku.form[key] = value
	if(Object.values(product_sku.form).filter(ele => !ele).length == 0) {
		setMaxCount()
	} 
	
	// console.log(product_sku.form)
	
}

function setMaxCount() {
	// console.log(product_sku)
	let i = spec_prices_data.value.map(ele => ele.specs).findIndex(ele => {
		return isObjectEqual(ele, product_sku.form)
	})
	if(i != -1) {
		let count = spec_prices_data.value[i].stock;
		product_num_max.value = count
	}
} 
function findIndexby () {
	return spec_prices_data.value.map(ele => ele.specs).findIndex(ele => isObjectEqual(ele, product_sku.form) );
}
const addCartBtn = () => {  
	let skuItem
	let i = findIndexby()
	
	if(i == -1) return

	skuItem = {
		...spec_prices_data.value[i],
		img: spec_prices_data.value[i].img ? spec_prices_data.value[i].img : spec_prices_data.value[i].pic.split('|')[0],
		shop: product_shop_data.value || {},
		name: product_base_data.value.name,
		freight_id: product_base_data.value.freight_id,
		num: +product_num.value,
		checked: false,
	}
	let flag = cart.addProduct2Cart(skuItem)
	if(flag) ElNotification({
		title: '系统消息',
		type: 'success',
		message: '成功加入购物车！',
    	position: 'bottom-right',
	})
	
} 
function previewHoverEvent(index) {
	activeIndex.value = +index
}

</script>
<style lang='scss' scoped>
.main {
	.el-image {
		display: block;
	}
}
.shop-card {
	position: relative;
	overflow: hidden;
	border-radius: 5px;
	background-color: var(--el-color-primary-light-9);
	// min-height: 100%;
	@extend %box-sizing;
	&:after {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 120px;
		background-color: var(--el-color-primary);
	}
	.shop-box {
		position: relative;
		z-index: 20;
		border-radius: 5px;
		background-color: #fff;
		box-shadow: 0 0 10px rgba(0,0,0,.1); 
		.shop-row {
			line-height: 18px;
			margin-bottom: 14px;
			padding-bottom: 10px;
			border-bottom: 1px dashed var(--el-border-color);
			.el-text {

			}
			&.shop-header {
				border-bottom: 0;
			}
		}
		.shop-header {
			.shop-logo {
				flex: 0 0 40px;
				width: 40px;
				height: 40px;
				.el-avatar {
					width: 100%;
					height: 100%;
				}
			}
			.shop-name { 
			}
		}
	}
}
.preview-img-tabs {
	.el-tabs {
		--el-tabs-header-height: auto;
		::v-deep {
			.el-tabs__nav-wrap {
				margin-bottom: 0;
			}
			.el-tabs__item {
				padding: 5px!important;
			}
			.el-tabs__content {
				display: none;
			}
			.el-tabs__header {
				border-bottom: 0;
			}
		}
	}
	.preview-img {
		width: 50px;
		height: 50px;
	}
}

.main {
	background-color: #fff;
	.product-title {
		line-height: 25px;
	}
	.product-price {
		height: 40px;
		background-color: var(--el-color-primary-light-9);
	}
	.product-data {
		border-top: 1px dashed var(--el-border-color);
		border-bottom: 1px dashed var(--el-border-color);
	}
}
.info-row {
	.info-row-item {
		&.info-row-item-label {
			font-size: 12px;
			flex: 0 0 3em;
			width: 3em;  
			color: #999;
			line-height: 30px;
			// text-align: justify;
			// text-justify: distribute-all-lines;
			// text-align-last: justify;
			// -moz-text-align-last: justify;
			// -webkit-text-align-last: justify;
		}
		&.info-row-item-content {
			line-height: 30px;
			.content-item {
				&.radio {
						::v-deep {
							.el-check-tag {
								font-weight: normal;
							}
							// .el-button:focus {
							// 	color: var(--el-button-text-color);
							// 	border-color: var(--el-button-border-color);
							// 	// background-color: var(--el-button-bg-color); 
							// }
							// .el-button:not(.is-disabled):hover {
							// 	color: var(--el-button-text-color);
							// 	border-color: var(--el-button-border-color);
							// 	background-color: var(--el-fill-color); 
							// }
							// .el-button.is-plain:hover,
							// .el-button.is-plain:focus { 
							// 	background-color: var(--el-button-bg-color); 
							// }
					}
				}
				
				&.active {

				}
			}
		}
	}
}
</style>