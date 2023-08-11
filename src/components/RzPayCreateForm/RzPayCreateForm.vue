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
        <!-- <el-form-item prop="sell_id" label="公司名">
            <el-select
				style="width: 100%"
                v-model="selectCompany" 
                filterable
                remote
                clearable
                remote-show-suffix
                placeholder="输入关键字进行检索选择"
                :remote-method="(query:String) => debounce(remoteMethod, 1200, false, query)"
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
        </el-form-item> -->
        <el-form-item label="卖家" prop="sell_id">
            <el-cascader
                style="width: 100%"
                placeholder="请选择（可输入关键字筛选）"
                :options="white_seller_list"
                v-model="dynamicValidateForm.sell_id" 
                filterable
                :props="{
                    label: 'company',
                    value: 'id',
                }"
            >
                <template #default="{ node, data }">
                    <span>{{ data.company }} - {{ data.bank_product_intro }} - {{ data.cardNo }}</span> 
                </template>
            </el-cascader>
        </el-form-item>
        <el-form-item prop="product_intro" label="产品描述">
            <el-input v-model="dynamicValidateForm.product_intro"></el-input>
        </el-form-item>
        <el-form-item prop="remark" label="产品详细描述">
            <el-input v-model="dynamicValidateForm.remark"></el-input>
        </el-form-item> 
        <el-form-item prop="pay_price" label="融资金额">
            <el-input v-model="dynamicValidateForm.pay_price"></el-input>
        </el-form-item>
        <el-form-item  >
            <el-button class="u-m-t-20" style="width: 200px;" type="primary" @click="submit(formRef)">提交</el-button> 
        </el-form-item>
    </el-form>  
</template>
  
<script setup lang='ts'>
import { reactive, ref, inject, onMounted, computed, watch } from 'vue' 
import { genFileId, ElMessage } from 'element-plus'
import debounce from '@/utils/debounce'
const props = defineProps({
    origin: {
        type: Object,
        default: () => ({})
    }
})
const emits = defineEmits(['submitSuccess'])
const $api: any = inject('$api') 
const dynamicValidateForm = reactive({ 
    sell_id: '', 
    product_intro: '',
    remark: '', 
    num: '',
    pay_price: '',
    id: '', 
})
const formRef = ref()
// const search_loading = ref(false)
// const options = ref([])
const white_seller_list = ref([])
const rules = reactive({
    sell_id: [
        {
            required: true,
            message: '公司名不能为空',
            trigger: ['change', 'blur'],
        },
    ],
    product_intro: [
        {
            required: true,
            message: '商品名不能为空',
            trigger: ['change', 'blur'],
        },
    ],
    remark: [
        {
            required: true,
            message: '规格不能为空',
            trigger: ['change', 'blur'],
        },
    ],
    num: [
        {
            required: true,
            message: '数量不能为空',
            trigger: ['change', 'blur'],
        },
    ],
    pay_price: [
        {
            required: true,
            message: '价格不能为空',
            trigger: ['change', 'blur'],
        },
    ],
})

// const selectCompany = computed({
//     get() {
//         return dynamicValidateForm.company || dynamicValidateForm.sell_id
//     },
//     set(v) {  
//         let product_intro = v ? options.value.filter(ele => ele.value == v)[0].product_intro : v
//         dynamicValidateForm.company = product_intro;
//         dynamicValidateForm.sell_id = v; 
//     }
// })
watch(
    () => props.origin,
    (n) => {
        console.log(n)
        dynamicValidateForm.sell_id = n.sell_id
        dynamicValidateForm.product_intro = n.product_intro
        dynamicValidateForm.remark = n.remark
        dynamicValidateForm.num = n.num
        dynamicValidateForm.pay_price = n.pay_price
        dynamicValidateForm.id = n.id
    },
    {
        deep: true,
        immediate: true
    }
)
onMounted(async () => {
    getWhiteListData()

})
const getWhiteListData = async () => { 
    const res = await $api.no_order_white_sell_list({params: {page_record: 100, state: 1}, loading: false}) 
    if(res.code == 1) {
        white_seller_list.value = res.list.list 
    }
}
// const remoteMethod = async (query: string) => { 
// 	query = query.trim()
// 	if (query) {
// 		search_loading.value = true;
// 		const res = await $api.search_company_product_intro({params: {terms: query}, loading: false})
// 		search_loading.value = false;
// 		if(res.code == 1) {
// 			options.value = res.list.map(ele => ({...ele, label: ele.product_intro, value: ele.login}))
// 		}
// 	} else {
// 		options.value = [];
// 	}
// };
 
function submit(formEl) {
    formEl.validate(async (valid) => {
        if (valid) {
            console.log('submit!') 
            await submitApi()
        } else {
            console.log('error submit!')
            return false
        }
    })
}

async function submitApi() { 
    const res = await $api.no_order_rz_pay({
        ...dynamicValidateForm,
        sell_id: dynamicValidateForm.sell_id[0]
    })
    if(res.code == 1) {
        ElMessage.success(res.msg)
        emits('submitSuccess', res)
    }
}
</script>
<style lang='scss' scoped>
.box {
	@extend %box-sizing;
}
</style>