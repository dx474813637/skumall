<template>
    <el-table 
        v-loading="loading" 
        :data="list" 
        style="width: 100%" 
        border 
        :maxHeight="maxHeight"  
        > 
        <el-table-column prop="id" label="ID" width="70" align="center"  />
        <el-table-column prop="sell_company" label="卖家" width="150"  />
        <el-table-column prop="buy_company" label="买家" width="150" /> 
        <el-table-column prop="product_name" label="订单商品" width="200" />
        <el-table-column prop="price" label="融资金额" width="100" >
            <template #default="{row}">
                <span v-if="row.price > 0">{{ row.price }} 元</span>  
            </template> 
        </el-table-column>
        <!-- <el-table-column prop="credit_endDate" label="融资期限" width="120" />  -->
        <el-table-column label="融资状态" width="180" >
            <template #default="{row}">
                <el-text type="danger" v-if="row.rz_status == '3' || row.rz_status == '7'">{{ $filters.order_rz_status(row.rz_status) }}</el-text>
                <el-text type="success" v-else-if="row.rz_status == '4' || row.rz_status == '6'" >{{ $filters.order_rz_status(row.rz_status) }}</el-text>
                <el-text type="warning" v-else >{{ $filters.order_rz_status(row.rz_status) }}</el-text>
            </template> 
        </el-table-column> 
        <el-table-column label="订单支付状态" width="150" >
            <template #default="{row}">
                <el-text type="danger" v-if="row.status == '6'">{{ $filters.order_pay_status(row.status) }}</el-text>
                <el-text type="success" v-else-if="row.status == '5'" >{{ $filters.order_pay_status(row.status) }}</el-text>
                <el-text type="warning" v-else >{{ $filters.order_pay_status(row.status) }}</el-text>
            </template> 
        </el-table-column> 
        <el-table-column prop="post_time" label="融资时间" width="120" /> 
        <el-table-column label="查看" width="70" align="center" fixed="right" > 
            <template #default="{row}">
                <el-button 
                    link 
                    type="primary" 
                    size="small" 
                    @click="router.push({name: 'order_bank', params: {id: row.id}})"
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
    const res = await $api.order_bank_list({params: paramsObj.value, loading: false}) 
    if(res.code == 1) {
        list.value = res.list.list
        total.value = +res.list.pw_rec_total
        pageSize.value = +res.list.page_record
    }
}
   
</script>
<style lang='scss' scoped>
// 
.el-tree {
    background-color: transparent;
}
</style>