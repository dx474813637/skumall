<template>
    <el-table 
        v-loading="loading" 
        :data="addressList" 
        style="width: 100%" 
        border 
        :maxHeight="maxHeight"
        :highlight-current-row="isRadioGroup"
        @current-change="handleCurrentTableChange"
        > 
        <el-table-column label="ID" :width="isRadioGroup ?70:50" >
            <template #default="{ row }">
                <div class="u-flex">
                    <span>{{ row.id }}</span> 
                    <span class="u-m-l-10" v-if="isRadioGroup && currentRow && currentRow.id == row.id ">
                        <el-Icon color="#ff0000">
                            <i-ep-CircleCheck></i-ep-CircleCheck>
                        </el-Icon>
                    </span>
                </div>
                
            </template>
        </el-table-column>
        <el-table-column label="收货人" >
            <template #default="{row}">
                <div class="u-flex">
                    <div>{{ row.name }}</div>
                    <el-text tag="b" type="danger" class="u-m-l-10" v-if="row.auto == 1" >默认</el-text> 
                </div>
                <div>{{ row.mobile }}</div>
            </template>
        </el-table-column>
        <el-table-column label="详细地址" >
            <template #default="{row}">
                <div>{{ row.regional_name }}</div>
                <div>{{ row.address }}</div>
            </template>
        </el-table-column>  
        <template #empty>
            <el-empty description="列表为空" />
        </template>
    </el-table>
    <div class="list-page-box u-p-t-20 u-p-b-20">
        <el-pagination
            v-model:current-page="curP"
            :page-size="pageSize"
            small
            background
            layout="prev, pager, next, slot"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        >
            <span class="u-p-l-10">共 {{ total }} 条数据</span>
        </el-pagination>
    </div> 
</template>

<script setup lang='ts'>
import { reactive,ref,computed, inject, onMounted } from 'vue'
import router from "@/router/guard" 
import { deepClone } from '@/utils';
import useProductSku from '@/hook/useProductSku'
const {
    sku2treeData
} = useProductSku()
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
    currentRow: {
        type: Object,
        default: () => ({})
    },
});
const emit = defineEmits(["setCurrentRow"]);
const currentRow = ref()
const $api = inject('$api')
const addressList = ref([])
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
    const res = await $api.addresss_list({params: paramsObj.value, loading: false}) 
    addressList.value = res.list.list.slice(1) 
    total.value = +res.list.pw_rec_total
    pageSize.value = +res.list.page_record
}
 
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
} 

const handleCurrentTableChange = (val, oldVal) => { 
    if(!props.isRadioGroup) return 
    console.log(val, oldVal)
    currentRow.value = val
    emit('setCurrentRow', {val, oldVal})
}

</script>
<style lang='scss' scoped>
// 
.el-tree {
    background-color: transparent;
}
</style>