<!--  -->
<template>
	<div class="u-p-10 box">
		<!-- <table-query-product></table-query-product> -->
		<el-image src="/pacc_help.jpg"></el-image>
		<div class="query-list u-p-10 u-p-l-20 u-p-r-20">
			<div class="query-item u-m-b-25" v-for="item in list" :key="item.id">
				<QueryProductCard :origin="item" @createOrderEvent="createOrderEvent"></QueryProductCard>
			</div>
		</div>
	</div>
	<el-dialog v-model="dialogVisible" title="下单融资" width="50%" :before-close="handleClose">
		
		<el-form 
			ref="formRef" 
			:model="dynamicValidateForm" 
			label-width="120px" 
			:rules="rules" 
			class="demo-dynamic u-p-20"
			label-position="top"
			scroll-to-error
			inline-message
			>
			<el-form-item prop="name" label="商品名称">
				<el-input v-model="dynamicValidateForm.name" />
			</el-form-item>
			<el-form-item prop="cate" label="分类">
				<el-cascader 
					v-model="dynamicValidateForm.cate" 
					:options="cate_list"
					placeholder="请选择分类"
					:props="{
						value: 'id',
						label: 'name'
					}"
					filterable
					style="width: 100%"
					>
					<template #default="{ node, data }">
						<span>{{ data.name }}</span>
						<span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
					</template>
				</el-cascader>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="submit">
					提交
				</el-button>
			</span>
		</template>
	</el-dialog>
</template>
  
<script setup lang='ts'>
import { reactive, ref, inject, onMounted, computed } from 'vue'
import { ElMessageBox } from 'element-plus'
const $api: any = inject('$api')
import { useFinanceStore } from '@/stores/finance';
const finance = useFinanceStore();
const dialogVisible = ref(false)
const list = ref([])
const loading = ref(false)
const curP = ref(1)

const dynamicValidateForm = reactive({ 
    sell_login: '',
    name: '',
    specs: '', 
    num: '',
    price: '0',
    id: '', 
})
// const total = ref(0)
// const pageSize = ref(20)
const paramsObj = computed(() => {
	return {
		p: curP.value
	}
})
onMounted(async () => {
	loading.value = true;
	await getData()
	await finance.getbankbuyall()
	loading.value = false;

})

const getData = async () => {
	const res = await $api.query_product_list({ params: paramsObj.value, loading: false })
	if (res.code == 1) {
		list.value = res.list.data
		// total.value = +res.total
	}
}

function createOrderEvent(data) {
	dialogVisible.value = true
}
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

function submit() {

}
</script>
<style lang='scss' scoped>
.box {
	@extend %box-sizing;
}
</style>