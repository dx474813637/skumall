<template>
    <el-table 
        v-loading="loading" 
        :data="list" 
        style="width: 100%" 
        border 
        :maxHeight="maxHeight"  
        > 
        <el-table-column prop="name" label="产品名" width="200" fixed="left"  />
        <el-table-column prop="bank_name" label="所属银行" width="120" />
        <el-table-column  label="授信期限" width="120" >
            <template #default="{row}">
                {{ row.credit_term }}月
            </template> 
        </el-table-column>
        <el-table-column label="单户最高额度" width="120" >
            <template #default="{row}">
                {{ row.max_amount }}元
            </template> 
        </el-table-column>
        <el-table-column label="贷款期限" width="120" >
            <template #default="{row}">
                {{ row.loan_term }}月
            </template> 
        </el-table-column>
        <el-table-column prop="annualized" label="银行利率(年化)" width="120"/>
        <el-table-column prop="remark" label="银行备注" width="120" />
        <el-table-column label="产品状态" width="100" >
            <template #default="{row}">
                <el-text type="success" v-if="row.status == 1">激活</el-text>
            </template> 
        </el-table-column>
        <el-table-column label="操作" width="100" align="center" fixed="right"  > 
            <template #default="{row}">
                <el-button 
                    link 
                    type="primary" 
                    size="small" 
                    @click="router.push({name: 'sku_edit', params: {id: row.id}})"
                    >预授信申请</el-button> 
            </template>
            
        </el-table-column>
        <el-table-column label="查看" width="70" align="center" fixed="right" > 
            <template #default="{row}">
                <el-button 
                    link 
                    type="primary" 
                    size="small" 
                    @click="router.push({name: 'sku_edit', params: {id: row.id}})"
                    >查看</el-button> 
            </template>
            
        </el-table-column>
    </el-table>
    <!-- <div class="list-page-box u-p-t-20 u-p-b-20">
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
    </div>  -->
</template>

<script setup lang='ts'>
import { reactive,ref,computed, inject, onMounted } from 'vue'
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
    }
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
        p: curP.value
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

const getData = async () => { 
    const res = await $api.query_product_list({params: paramsObj.value, loading: false}) 
    if(res.code == 1) {
        list.value = res.list.data
        // total.value = +res.total
    }
}
   
</script>
<style lang='scss' scoped>
// 
.el-tree {
    background-color: transparent;
}
</style>