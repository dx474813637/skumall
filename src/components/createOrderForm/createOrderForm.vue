<!--  -->
<template>
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
        <el-form-item prop="name" label="公司名">
            <el-select
				style="width: 100%"
                v-model="dynamicValidateForm.name" 
                filterable
                remote
                clearable
                remote-show-suffix
                placeholder="Please enter a keyword"
                :remote-method="(query:String) => debounce(remoteMethod, 800, false, query)"
                :loading="search_loading"
                loading-text="正在请求数据中"
                no-data-text="无匹配数据"
            >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                />
            </el-select>
        </el-form-item>
    </el-form> 
    <div class="u-flex">
        
    </div>
</template>
  
<script setup lang='ts'>
import { reactive, ref, inject, onMounted, computed } from 'vue' 
import debounce from '@/utils/debounce'
const $api: any = inject('$api') 
const dynamicValidateForm = reactive({ 
    sell_login: '',
    name: '',
    specs: '', 
    num: '',
    price: '0',
    id: '', 
})
const search_loading = ref(false)
const options = ref([])
const rules = reactive({
    name: [
        {
            required: true,
            message: '公司名不能为空',
            trigger: ['change', 'blur'],
        },
    ],
})
// const total = ref(0)
// const pageSize = ref(20)
// const paramsObj = computed(() => {
// 	return {
// 		p: curP.value
// 	}
// })
onMounted(async () => {
    

})
const remoteMethod = async (query: string) => { 
	query = query.trim()
	if (query) {
		search_loading.value = true;
		const res = await $api.search_company_name({params: {term: query}, loading: false})
		search_loading.value = false;
		if(res.code == 1) {
			options.value = res.list.map(ele => ({...ele, label: ele.bank_name, value: ele.bank_name}))
		}
	} else {
		options.value = [];
	}
};
 
function submit() {

}
</script>
<style lang='scss' scoped>
.box {
	@extend %box-sizing;
}
</style>