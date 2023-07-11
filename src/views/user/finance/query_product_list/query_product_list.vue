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
		<OrderCreateForm
			@submitSuccess="submitSuccess"
		></OrderCreateForm> 
	</el-dialog>
</template>
  
<script setup lang='ts'>
import { reactive, ref, inject, onMounted, computed } from 'vue'
import { ElMessageBox } from 'element-plus'
import router from '@/router/guard'
const $api: any = inject('$api')
import { useFinanceStore } from '@/stores/finance';
const finance = useFinanceStore();
const dialogVisible = ref(false)
const list = ref([])
const loading = ref(false)
const curP = ref(1)

// const dynamicValidateForm = reactive({ 
//     sell_login: '',
//     name: '',
//     specs: '', 
//     num: '',
//     price: '0',
//     id: '', 
// })
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
  ElMessageBox.confirm('是否关闭表单？','退出确认',
    {
      confirmButtonText: '关闭',
      cancelButtonText: '考虑一下',
      type: 'warning',
    })
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
 function submitSuccess(data) {
	dialogVisible.value = false
	router.push({name: 'order_new', params: {id: data.order}})
 }
</script>
<style lang='scss' scoped>
.box {
	@extend %box-sizing;
}
</style>