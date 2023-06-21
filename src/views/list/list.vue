<template>
	<Header-base></Header-base>
    
	<div class="list-w">
		<div class="home-w">
            <div class="list-filters-box u-p-t-10 u-p-b-10">
                <div class="tabs-menus-cate">
                    <el-menu
                        :default-active="cate_active"
                        class="el-menu-demo"
                        mode="horizontal"
                        router
                        @select="handleSelect"
                        >
                        <template  v-for="item in cate_menus" >
                            <el-sub-menu  
                                v-if="item.children && item.children.length > 0" 
                                :index="item.index" 
                                :key="item.index"
                                >
                                <template #title> 
                                    <span class="menu-title" >{{item.name}}</span>
                                </template>
                                <el-menu-item 
                                    v-for="ele in item.children" 
                                    :index="ele.index" 
                                    :key="ele.index"  
                                    :route="{
                                        path: '/list',
                                        query: {
                                            cate: ele.index
                                        }
                                    }" 
                                    >
                                    
                                    <template #title>
                                        <view class="u-flex u-flex-between" >
                                            <view class="item-left">
                                                <span>{{ele.name}}</span>
                                            </view> 
                                        </view>
                                    </template>
                                    
                                </el-menu-item>
                            </el-sub-menu>
                            <el-menu-item v-else 
                                :index="item.index" 
                                :key="item.index" 
                                :route="{
                                    path: '/list',
                                    query: {
                                        cate: item.index
                                    }
                                }"> 
                                <span >{{item.name}}</span>
                            </el-menu-item>
                        </template>
                    </el-menu>
                </div>
                <div class="tabs-menus-sort u-flex u-flex-between u-p-l-10 u-p-t-10 u-p-b-10">
                    <div class="item">
                        <el-tabs v-model="sort_active" type="border-card" @tab-click="sortTabsClick">
                            <el-tab-pane 
                                v-for="item in sort_tabs_list" 
                                :name="item.key"
                                >
                                <template #label> 
                                    <span>{{ item.name }}</span>
                                    <el-icon>
                                        <i-ep-Sort></i-ep-Sort>
                                    </el-icon> 
                                </template>
                            </el-tab-pane> 
                        </el-tabs>
                    </div>
                    <div class="item u-flex">
                        <el-checkbox-group 
                            v-model="checked_list"
                            @change="handleCheckedChange"
                            >
                            <el-checkbox
                                v-for="item in checkbox_tabs_list"
                                :label="item.name" 
                                :key="item.value"
                                /> 
                        </el-checkbox-group>
                        <el-divider direction="vertical" />
                        <div class="price-box u-flex u-p-l-10">
                            <div class="item u-p-r-10">价格</div>
                            <div class="item u-flex price-content">
                                <el-input v-model="priceForm.price1" size="small" />
                                <span class="u-p-l-5 u-p-r-5">-</span>
                                <el-input v-model="priceForm.price2" size="small" />
                                <div class="el-button-box u-m-l-10 u-p-r-10">
                                    <el-button size="small" type="primary" >确定</el-button>
                                </div>
                                
                                
                            </div>
                            <div class="price-bar u-p-5 u-p-l-15 u-p-r-15">
                                <el-slider v-model="price_arr" range :max="5000" />
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="list-main-box u-p-t-10 u-p-b-10" v-loading="loading">
                <div class="list">
                    <div class="list-item u-m-b-10" v-for="item in 30" :key="item">
                        <product-card></product-card>
                    </div>
                </div>

            </div>
            <div class="list-page-box u-p-t-40 u-p-b-40">
                <el-pagination
                    v-model:current-page="curP"
                    v-model:page-size="pageSize"
                    small 
                    background
                    layout="total, prev, pager, next"
                    :total="1000" 
                />
            </div>
			
		</div>
	</div>
	<Footer-base></Footer-base>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, computed, watch, reactive } from "vue";
import router from '@/router/guard'
const curP = ref(1)
const pageSize = ref(20) 
const $api = inject('$api');  
const params = computed(() => { 
    return {
        p: curP.value, 
        cate: cate_active.value
    }
})
const cate_active = ref('1') 
const cate_menus = ref([
    {
        name: '全部',
        index: '1',
    },
    {
        name: '男鞋',
        index: '2',
        children: [
            {
                name: '皮鞋',
                index: '2-1',
            },
            {
                name: '低帮鞋',
                index: '2-2',
            },
            {
                name: '凉鞋',
                index: '2-3',
            },
            {
                name: '拖鞋',
                index: '2-4',
            },
            {
                name: '马丁靴',
                index: '2-5',
            },
            {
                name: '帆布鞋',
                index: '2-6',
            },
            {
                name: '健步鞋',
                index: '2-7',
            },
            {
                name: '高帮鞋',
                index: '2-8',
            },
            {
                name: '沙滩鞋',
                index: '2-9',
            },
            {
                name: '登山鞋',
                index: '2-10',
            },
        ]
    },
    {
        name: '休闲鞋',
        index: '3',
    },
    {
        name: '板鞋',
        index: '4',
    },
    {
        name: '女鞋',
        index: '5',
        children: [
            {
                name: '休闲鞋',
                index: '3-1',
            },
            {
                name: '板鞋',
                index: '3-2',
            },
            {
                name: '靴子',
                index: '3-3',
            },
            {
                name: '凉鞋',
                index: '3-4',
            },
            {
                name: '拖鞋',
                index: '3-5',
            },
            {
                name: '马丁靴',
                index: '3-6',
            },
            {
                name: '老爹鞋',
                index: '3-7',
            },
            {
                name: '高帮鞋',
                index: '3-8',
            },
            {
                name: '帆布鞋',
                index: '3-9',
            },
            {
                name: '松糕鞋',
                index: '3-10',
            },
        ]
    },
    {
        name: '单鞋',
        index: '6',
    },
    {
        name: '高跟鞋',
        index: '7',
    },
    {
        name: '运动鞋',
        index: '8',
        children: [
            {
                name: '足球鞋',
                index: '8-1',
            },
            {
                name: '徒步鞋',
                index: '8-2',
            },
            {
                name: '羽毛球鞋',
                index: '8-3',
            },
            {
                name: '运动休闲鞋',
                index: '8-4',
            },
            {
                name: '网球鞋',
                index: '8-5',
            },
            {
                name: '棒球鞋',
                index: '8-6',
            },
            {
                name: '排球鞋',
                index: '8-7',
            }, 
        ]
    },
    {
        name: '篮球鞋',
        index: '9',
    },
    {
        name: '跑步鞋',
        index: '10',
    },
    {
        name: '童鞋',
        index: '11',
        children: [
            {
                name: '婴幼鞋',
                index: '11-1',
            },
            {
                name: '学步鞋',
                index: '11-2',
            },
            {
                name: '雨鞋',
                index: '11-3',
            },
            {
                name: '舞蹈鞋',
                index: '11-4',
            },
            {
                name: '拖鞋',
                index: '11-5',
            },
            {
                name: '帆布鞋',
                index: '11-6',
            },
            {
                name: '板鞋',
                index: '11-7',
            },
            {
                name: '皮鞋',
                index: '11-8',
            }, 
        ]
    },
    {
        name: '凉鞋',
        index: '12',
    },
    {
        name: '运动鞋',
        index: '13',
    },
]) 
const sort_active = ref('')
const sort_arr = ['asc', 'desc']
const sort_tabs_list = ref([
    {
        name: '综合', 
        type: 'sort',
        key: '1',
        value: '', 
    },
    {
        name: '销量', 
        type: 'sort',
        key: '2',
        value: '', 
    },
    {
        name: '人气', 
        type: 'sort',
        key: '3',
        value: '', 
    },
    {
        name: '退货率', 
        type: 'sort',
        key: '4',
        value: '', 
    },
    {
        name: '上新时间', 
        type: 'sort',
        key: '5',
        value: '', 
    }, 
])
const checkbox_tabs_list = ref([
    {
        name: '24H闪发',
        value: 'tag_24h',
    },
    {
        name: '视频商品',
        value: 'have_video',
    },
    {
        name: '新品',
        value: 'tag_season',
    },
])
const checked_list = ref([])
const price_arr = computed({
    get() {
        return [priceForm.price1, priceForm.price2 || 5000]
    },
    set(v) {
        priceForm.price1 = v[0]
        priceForm.price2 = v[1]
    }
})

// ref([0, 1000])
const priceForm = reactive({
    price1: '',
    price2: '',
})
const loading = ref(false)
onMounted(async () => {
    // console.log(router.currentRoute.value.query)
    
})
watch(
    () => router.currentRoute.value.query,
    async (n) => { 
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
            await getProductData()
        } catch (error) {
            
        }
        loading.value = false
        
    },
    {  
        immediate: true,
        deep: true
    }
)
watch(
    () => price_arr.value,
    (n) => {

    },
    {
        deep: true
    }
)

async function getProductData() {
    const res = await $api.web_product({params: params.value, loading: false})
}

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
function initParams() {
    if(router.currentRoute.value.query.hasOwnProperty('cate')) { 
        cate_active.value = router.currentRoute.value.query.cate
    }
   
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
            min-height: 300px;
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
                }
            }
        }
        .list-page-box {
            // @include flex(x, center)
        }
    }
}
</style>
