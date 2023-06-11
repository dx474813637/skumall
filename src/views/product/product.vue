<!--  -->
<template>
	<div>home</div>
	<div class="main u-p-20">
		<div 
			class="u-flex u-flex-items-start info-row" 
			v-for="(item, index) in product_sku.data"
			:key="index"
			>
			<div class="info-row-item info-row-item-label">
				{{ item.label }}
			</div>
			<div class="info-row-item info-row-item-content u-flex u-flex-items-start u-flex-wrap u-m-l-10">
				<div class="content-item u-m-r-10 u-m-b-10 radio"
					v-for="(ele,i) in item.children"
					:key="i"
					>
					<el-button
						:type="product_sku.form[item.label] == ele.label? 'danger' :'default'"
						:text="product_sku.form[item.label] != ele.label"
						bg 
						:plain="product_sku.form[item.label] == ele.label"  
						@click="skuClick(item.label, ele.label)"
						>
						{{ ele.label }}
					</el-button>
				</div>
			</div>
		</div>
		<div class="u-flex u-flex-items-start info-row" >
			<div class="info-row-item info-row-item-label"> 数量 </div>
			<div class="info-row-item info-row-item-content u-flex u-flex-items-start u-flex-wrap u-m-l-10">
				<div class="content-item u-m-r-10 u-m-b-10" >
					<el-input-number v-model="product_num" :min="1" :max="product_num_max" @change="handleChange" />
				</div>
			</div>
		</div>
		<div class="u-flex u-flex-items-start info-row" >
			<div class="info-row-item info-row-item-label"> </div>
			<div class="info-row-item info-row-item-content u-flex u-flex-items-start u-flex-wrap u-m-l-10">
				<div class="content-item u-m-r-10 u-m-b-10" >
					<el-button type="primary" @click="addCartBtn">加入采购车</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, onMounted, onUnmounted, inject } from 'vue';
import { cartStore } from '@/stores/cart'
import { ElMessage } from 'element-plus'
const cart = cartStore()
import useProductSku from '@/hook/useProductSku.ts'
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
const product_base_data = ref({})
const spec_prices_data = ref([])
const product_shop_data = ref({})
const product_sku = reactive({
	data: {},
	form: {}
})
const product_num = ref(1)
const product_num_max = ref(Infinity)
// const product_sku_form = reactive({})


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
	console.log(product_sku.form)
}

const addCartBtn = () => {  
	let skuItem
	let i = spec_prices_data.value.findIndex(ele => {
		let flag = true
		for(let key in ele.specs) {
			if(ele.specs[key] !== product_sku.form[key]) {
				flag = false; 
			}
		}
		return flag
	});
	console.log(i)
	if(i == -1) return
	skuItem = {
		...spec_prices_data.value[i],
		img: spec_prices_data.value[i].img ? spec_prices_data.value[i].img : spec_prices_data.value[i].pic.split('|')[0],
		shop: product_shop_data.value || {},
		name: product_base_data.value.name,
		freight_id: product_base_data.value.freight_id,
		num: product_num.value,
		checked: false,
	}
	cart.addProduct2Cart(skuItem)
	ElMessage.success('操作成功')
}

</script>
<style lang='scss' scoped>
.main {
	background-color: #fff;
}
.info-row {
	.info-row-item {
		&.info-row-item-label {
			flex: 0 0 120px;
			text-align: right;
			margin-right: 20px;
			// text-align: justify;
			// text-justify: distribute-all-lines;
			// text-align-last: justify;
			// -moz-text-align-last: justify;
			// -webkit-text-align-last: justify;
		}
		&.info-row-item-content {
			.content-item {
				&.radio {
						::v-deep {
						.el-button:focus {
							color: var(--el-button-text-color);
							border-color: var(--el-button-border-color);
							// background-color: var(--el-button-bg-color); 
						}
						.el-button:not(.is-disabled):hover {
							color: var(--el-button-text-color);
							border-color: var(--el-button-border-color);
							background-color: var(--el-fill-color); 
						}
						.el-button.is-plain:hover,
						.el-button.is-plain:focus { 
							background-color: var(--el-button-bg-color); 
						}
					}
				}
				
				&.active {

				}
			}
		}
	}
}
</style>