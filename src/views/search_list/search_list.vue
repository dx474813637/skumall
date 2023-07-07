<template>
	<Header-base :cate="cate_active" :terms="terms"></Header-base>
    
	<div class="list-w">
		<div class="home-w">  
            <div class="list-main-box u-p-t-10 u-p-b-10" v-loading="loading">
                <div class="list">
                    <template v-if="!search_res_list || search_res_list.length == 0">
                        <div class="u-flex u-flex-center u-p-t-30" style="width: 100%; background-color: #fff;">
                            <el-empty description="列表为空" />
                        </div> 
                    </template>
                    <template v-if="cate_active == '0'">
                        <div class="list-item u-m-b-10" v-for="item in search_res_list" :key="item.id">
                            <ProductCard :origin="item"></ProductCard>
                        </div>
                    </template>
                    <template v-else-if="cate_active == '1'">
                        <div class="list-item u-m-b-20 shop" v-for="item in search_res_list" :key="item.id">
                            <CompanyCard :origin="item"></CompanyCard>
                        </div>
                    </template>
                    
                </div>

            </div>
            <div class="list-page-box u-p-t-40 u-p-b-40">
                <el-pagination
                    v-model:current-page="curP"
                    v-model:page-size="pageSize" 
                    hide-on-single-page
                    background
                    layout="prev, pager, next, slot"
                    :total="search_res_total" 
                >
                    <span class="u-p-l-10">共 {{ search_res_total }} 条数据</span>
                </el-pagination>
            </div>
			
		</div>
	</div>
	<Footer-base></Footer-base>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, computed, watch, reactive, toRefs } from "vue";
import {cateStore} from '@/stores/cate'
const cate = cateStore()
const {cate_list, cate_list_all, cate_loading} = toRefs(cate)
import { useSettingsStore } from '@/stores/settings';
const settings = useSettingsStore();
import router from '@/router/guard'
// import {deepClone} from '@/utils/index'
const curP = ref(1)
const pageSize = ref(18) 
const $api = inject('$api');  
const params = computed(() => { 
    return {
        p: curP.value, 
        cate: cate_active.value,
        num: pageSize.value,
        terms: terms.value
    }
})
const terms = ref('')
const cate_active = ref('')   
// const sort_active = ref('')
// const sort_arr = ['asc', 'desc']
// const sort_tabs_list = ref([
//     {
//         name: '综合', 
//         type: 'sort',
//         key: '1',
//         value: '', 
//     },
//     {
//         name: '销量', 
//         type: 'sort',
//         key: '2',
//         value: '', 
//     },
//     {
//         name: '人气', 
//         type: 'sort',
//         key: '3',
//         value: '', 
//     },
//     {
//         name: '退货率', 
//         type: 'sort',
//         key: '4',
//         value: '', 
//     },
//     {
//         name: '上新时间', 
//         type: 'sort',
//         key: '5',
//         value: '', 
//     }, 
// ])
// const checkbox_tabs_list = ref([
//     {
//         name: '24H闪发',
//         value: 'tag_24h',
//     },
//     {
//         name: '视频商品',
//         value: 'have_video',
//     },
//     {
//         name: '新品',
//         value: 'tag_season',
//     },
// ])
// const checked_list = ref([])
// const price_arr = computed({
//     get() {
//         return [priceForm.price1, priceForm.price2 || 5000]
//     },
//     set(v) {
//         priceForm.price1 = v[0]
//         priceForm.price2 = v[1]
//     }
// })

// ref([0, 1000])
// const priceForm = reactive({
//     price1: '',
//     price2: '',
// })
const search_res_list = ref([])
const search_res_total = ref(0)
const loading = ref(false)
onMounted(async () => {
    // console.log(router.currentRoute.value.query)
    // if(cate_list.value.length == 0 && !cate_loading.value) {
    //     await cate.getCateData()
    // }
})
watch(
    () => router.currentRoute.value,
    async (n) => { 
        console.log(n)
        initParams() 
    },
    {  
        immediate: true,
        deep: true
    }
)
watch(
    () => params.value,
    async (n) => { 
        loading.value = true
        try {
            await getSearchData()
        } catch (error) {
            
        }
        loading.value = false
        
    },
    {  
        immediate: true,
        deep: true
    }
)
// watch(
//     () => price_arr.value,
//     (n) => {

//     },
//     {
//         deep: true
//     }
// )

async function getSearchData() {
    const res = await $api.web_search({params: params.value, loading: false})
    if(res.code == 1) {
        search_res_list.value = res.list
        search_res_total.value = +res.total
    }
}

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
function initParams() { 
    cate_active.value = router.currentRoute.value.query.cate 
    terms.value = router.currentRoute.value.query.terms 
	settings.setTitle(`${cate_active.value == '1'? '供应商' : '商品'}【${terms.value}】搜索结果`)
   
}

function sortTabsClick(tab) {
  console.log(tab )
}
const handleCheckedChange = (value: string[]) => {
    console.log(value)
}
</script>
<style >
    .el-menu--horizontal.el-menu--popup-container {
        border-bottom: none;
        
    }
    .el-menu--horizontal.el-menu--popup-container .el-menu--popup {
        display: flex;
    }
</style>
<style lang="scss" scoped> 
.price-box {
    position: relative;
    &:hover {
        .price-bar {
            display: block;
        }
        .el-button {
            display: block;
        }
    }
    .price-bar {
        position: absolute;
        display: none;
        left: 0;
        top: 100%;
        width: 100%;
        height: auto;
        background-color: #fff;
        @extend %box-sizing;
        z-index: 50;
        box-shadow: 0 10px 10px rgba(0,0,0,.1);
    }
    .el-button-box {
        width: 50px;
    }
    .el-button {
        display: none;
        width: 100%;
    } 
    .price-content {
        .el-input {
            width: 60px;
        }
    }
}
.tabs-menus-sort {
    background-color: #fff;
    ::v-deep {
        .el-tabs__content {
            display: none;
        }
        .el-tabs__header,
        .el-tabs,
        .el-tabs__item {
            border: none;
        }
    }
   
}
.list-w {
    .home-w {
        .list-main-box {
            min-height: 400px;
            .list {
                @include flex(x, start, start);
                flex-wrap: wrap;
                .list-item {
                    flex: 0 0 15%;
                    width: 15%;
                    margin-right: 2%;
                    &:nth-of-type(6n) {
                        margin-right: 0;
                    }
                    &.shop {
                        flex: 0 0 32%;
                        width: 32%; 
                        &:nth-of-type(3n) {
                            margin-right: 0;
                        }
                    }
                    
                }
            }
        }
        .list-page-box {
            // @include flex(x, center)
        }
    }
}
</style>
