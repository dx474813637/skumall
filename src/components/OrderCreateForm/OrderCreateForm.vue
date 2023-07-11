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
        <el-form-item prop="sell_login" label="公司名">
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
        </el-form-item>
        <el-form-item prop="name" label="商品名">
            <el-input v-model="dynamicValidateForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="specs" label="规格">
            <el-input v-model="dynamicValidateForm.specs"></el-input>
        </el-form-item>
        <el-form-item prop="num" label="数量">
            <el-input v-model="dynamicValidateForm.num"></el-input>
        </el-form-item>
        <el-form-item prop="price" label="价格">
            <el-input v-model="dynamicValidateForm.price"></el-input>
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
    sell_login: '',
    company: '',
    name: '',
    specs: '', 
    num: '',
    price: '',
    id: '', 
})
const formRef = ref()
const search_loading = ref(false)
const options = ref([])
const rules = reactive({
    sell_login: [
        {
            required: true,
            message: '公司名不能为空',
            trigger: ['change', 'blur'],
        },
    ],
    name: [
        {
            required: true,
            message: '商品名不能为空',
            trigger: ['change', 'blur'],
        },
    ],
    specs: [
        {
            required: true,
            message: '公司名不能为空',
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
    price: [
        {
            required: true,
            message: '价格不能为空',
            trigger: ['change', 'blur'],
        },
    ],
})

const selectCompany = computed({
    get() {
        return dynamicValidateForm.company || dynamicValidateForm.sell_login
    },
    set(v) {  
        let name = v ? options.value.filter(ele => ele.value == v)[0].name : v
        dynamicValidateForm.company = name;
        dynamicValidateForm.sell_login = v; 
    }
})
watch(
    props.origin,
    (n) => {
        console.log(n)
        dynamicValidateForm.sell_login = n.sell_login
        dynamicValidateForm.name = n.name
        dynamicValidateForm.specs = n.specs
        dynamicValidateForm.num = n.num
        dynamicValidateForm.price = n.price
        dynamicValidateForm.id = n.id
    },
    {
        deep: true,
        immediate: true
    }
)
onMounted(async () => {
    

})
const remoteMethod = async (query: string) => { 
	query = query.trim()
	if (query) {
		search_loading.value = true;
		const res = await $api.search_company_name({params: {terms: query}, loading: false})
		search_loading.value = false;
		if(res.code == 1) {
			options.value = res.list.map(ele => ({...ele, label: ele.name, value: ele.login}))
		}
	} else {
		options.value = [];
	}
};
 
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
    const res = await $api.create_order_new({
        ...dynamicValidateForm
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