<template>
    <el-table 
        v-loading="loading" 
        :data="skuList" 
        style="width: 100%" 
        border 
        :highlight-current-row="isRadioGroup"
        @current-change="handleCurrentTableChange"
        :max-height="maxHeight"
        > 
        <el-table-column fixed="left" label="ID" :width="isRadioGroup ?70:50" >
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
        <el-table-column fixed="left"  label="商品名" width="200" >
            <template #default="{row}">
                <router-link target="_blank" tag="a" :to="`/product/${row.id}`">
                    <el-text type="primary" >{{ row.name }}</el-text>
                </router-link>
                
            </template>
        </el-table-column>
        <el-table-column prop="cate" label="分类" width="100" />
        <el-table-column prop="sku" label="商品规格" width="200" >
            <template #default="{ $index }">
                <el-tree :data="skuList[$index].sku" :props="defaultProps"  />
            </template>
        </el-table-column>
        <el-table-column prop="recommend_remark" label="商家推荐语" width="120" />
        <el-table-column label="运费模板" width="100" >
            <template #default="{row}">
                {{ freight_list.filter(ele => ele.value == row.freight_id)[0].label }} 
            </template>
        </el-table-column>
        <el-table-column prop="weight" label="重量" width="120" />
        <el-table-column prop="delivery_delay_day" label="承诺发货时间" width="160" />
        <el-table-column label="更新时间" width="100" >
            <template #default="{row}">
                <div v-for="item in row.uptime.split(' ')" :key="item">
                    <el-text type="info" class="u-font-12">{{ item }}</el-text>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="上架状态" fixed="right" width="100"> 
            <template #default="{row}">
                <el-switch 
                    size="large"
                    inline-prompt
                    v-model="row.on" 
                    active-value="1" 
                    inactive-value="0"
                    active-text="上架中"
                    inactive-text="未上架" 
                    :loading="row.switchLoading" 
                    :before-change="() => beforeProdOnChange(row)"
                    /> 
            </template>
            
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="60" v-if="isEditBtn"> 
            <template #default="{row}">
                <el-button 
                    link 
                    type="primary" 
                    size="small" 
                    @click="router.push({name: 'product_edit', params: {id: row.id}})"
                    >编辑</el-button> 
            </template>
            
        </el-table-column>
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
import { reactive,ref,computed, inject, onMounted, toRefs } from 'vue'
import { ElNotification } from 'element-plus'
import router from "@/router/guard" 
import { cateStore } from '@/stores/cate' 
import useProductSku from '@/hook/useProductSku'
const {
    sku2treeData
} = useProductSku()
const cate = cateStore()
const { freight_list } = toRefs(cate)
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
const currentRow = ref()
const $api = inject('$api')
const skuList = ref([])
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
    const res = await $api.product({params: paramsObj.value, loading: false}) 
    skuList.value = res.list.map(ele => ({...ele, switchLoading: false, sku: sku2treeData(ele.sku)}))
    total.value = +res.total
}
 
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
} 

const handleCurrentTableChange = (val: User | undefined) => { 
    if(!props.isRadioGroup) return 
    currentRow.value = val
}

const beforeProdOnChange = async (item) => {
    item.switchLoading = true  
    return new Promise(async (resolve, reject)=>{
        
        let res = await changeProductOnStatus(item) 
        item.switchLoading = false
        if(res.code == 1) { 
            ElNotification({
                title: '系统消息',
                message: res.msg,
                type: 'success',
                position: 'bottom-right',
            })
            return resolve(true)
        }else { 
            ElNotification({
                title: '系统消息',
                message: res.msg,
                type: 'success',
                position: 'bottom-right',
            })
            return resolve(false)
        } 
    })
    
}

const changeProductOnStatus = async (prod) => { 
    const res = await $api.change_product_status({params: {id: prod.id}}); 
    return res
}


</script>
<style lang='scss' scoped>
// 
.el-tree {
    background-color: transparent;
}
</style>