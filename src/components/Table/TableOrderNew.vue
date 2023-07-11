<template>
    <el-table 
        v-loading="loading" 
        :data="list" 
        style="width: 100%" 
        border 
        :maxHeight="maxHeight"  
        > 
        <el-table-column prop="id" label="ID" width="70" align="center"  />
        <!-- <el-table-column prop="company" :label="props.customParams.role == '1'? '卖家' : '买家'" width="150" /> -->
        <el-table-column prop="name" label="商品" width="300"  />
        <el-table-column prop="specs" label="规格" width="200"  />
        <el-table-column prop="num" label="数量" width="150"  />
        <el-table-column prop="price" label="总价" width="150"  >
            <template #default="{row}">
                <div class="u-flex">
                    <el-statistic :precision="2" :value="row.price" value-style="font-size: 14px" />
                    <el-text type="info" class="u-m-l-5" >元</el-text>
                </div>
                
            </template>
        </el-table-column>
        <el-table-column label="订单状态" width="120" >
            <template #default="{row}">
                <el-text type="danger" v-if="row.zt == '6'">{{ $filters.order_new_zt(row.zt) }}</el-text>
                <el-text type="success" v-else-if="row.zt == '3' || row.zt == '4'" >{{ $filters.order_new_z(row.zt) }}</el-text>
                <el-text type="warning" v-else >{{ $filters.order_new_zt(row.zt) }}</el-text>
            </template> 
        </el-table-column>  
        <el-table-column prop="ctime" label="创建时间" width="200" />
        <el-table-column label="查看" width="70" align="center" fixed="right" > 
            <template #default="{row}">
                <el-button 
                    link 
                    type="primary" 
                    size="small" 
                    @click="router.push({name: 'order_new', params: {id: row.id}})"
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
    const res = await $api.order_list_new({params: paramsObj.value, loading: false}) 
    if(res.code == 1) {
        list.value = res.list
        total.value = +res.total 
    }
}
   
</script>
<style lang='scss' scoped>
// 
.el-tree {
    background-color: transparent;
}
</style>