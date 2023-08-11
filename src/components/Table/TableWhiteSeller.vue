<template>
    <el-table 
        v-loading="loading" 
        :data="list" 
        style="width: 100%" 
        border 
        :maxHeight="maxHeight"  
        > 
        <el-table-column prop="id" label="ID" width="70" align="center"  /> 
        <el-table-column prop="product_name" label="融资产品" width="200"  />
        <el-table-column prop="company" label="收款方公司名称" width="200"  />  
        <el-table-column prop="name" label="收款方银行账户名称" width="200"  />  
        <el-table-column prop="bank_name" label="收款方银行总行名称" width="200"  />  
        <el-table-column prop="cardNo" label="收款方银行卡号" width="200"  />  
        <el-table-column prop="subbranch" label="收款方银行账户开户行名称" width="200"  />  
        <el-table-column prop="state" label="用户审核状态" width="100"   >
            <template #default="{row}">
                <el-text type="danger" v-if="row.state == '1'">激活</el-text>
                <el-text type="info" v-else >未激活</el-text> 
            </template> 
        </el-table-column>    
        <el-table-column prop="ctime" label="创建时间" width="200" />
        <el-table-column label="查看" width="70" align="center" fixed="right" > 
            <template #default="{row}">
                <el-button 
                    link 
                    type="primary" 
                    size="small" 
                    @click="router.push({name: 'no_order_white_sell_edit', params: {id: row.id}})"
                    >查看</el-button> 
            </template>
            
        </el-table-column>
        <template #empty>
            <div class="u-flex u-flex-center u-p-t-20 u-p-b-20">
                <el-empty description="无数据" />
            </div>
        </template>
    </el-table>
    <div class="list-page-box u-p-t-20 u-p-b-20">
        <el-pagination
            v-model:current-page="curP"
            v-model:page-size="pageSize"
            small
            background
            layout="prev, pager, next, slot"
            :total="total" 
        >
            <span class="u-p-l-10">共 {{ total }} 条数据</span>
        </el-pagination>
    </div> 
</template>

<script setup lang='ts'>
import { reactive,ref,computed, inject, onMounted, watch } from 'vue'
import router from "@/router/guard"  
const props = defineProps({
    isRadioGroup: {
        type: Boolean,
        default: false
    },
    isEditBtn: {
        type: Boolean,
        default: false
    },
    maxHeight: {
        type: [String, Number],
        default: '80vh'
    },
    customParams: {
        type: Object,
        default: () => ({})
    },
});
const emit = defineEmits(["setCurrentRow"]);
const currentRow = ref()
const $api = inject('$api')
const list = ref([])
const loading = ref(false)
const curP = ref(1)
const total = ref(0)
const pageSize = ref(20)
const paramsObj = computed(() => {
    return {
        p: curP.value,
        ...props.customParams
    }
})
const defaultProps = {
  children: 'children',
  label: 'label',
}
onMounted(async () => {
    loading.value = true; 
    await getData()
    loading.value = false;

})
watch(
    () => [curP.value, props.customParams],
    async (val) => {
        loading.value = true; 
        await getData()
        loading.value = false;
    },
    {deep: true}
)
const getData = async () => { 
    const res = await $api.no_order_white_sell_list({params: paramsObj.value, loading: false}) 
    if(res.code == 1) {
        list.value = res.list.list
        total.value = +res.list.pw_rec_total 
    }
}
   
</script>
<style lang='scss' scoped>
// 
.el-tree {
    background-color: transparent;
}
</style>