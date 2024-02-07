<template>
	<Header-shop :info="shop_info"></Header-shop>
    
	<div class="list-w">
		<div class="home-w">
            <div class="company-box index-box u-m-b-30 u-m-t-30">
                <div class="box-title u-flex u-flex-center u-flex-items-end u-p-b-20"> 
                    <div class="item" style="width: 50%">
                        <el-divider>
                            <span class="title u-font-20">店铺推荐</span>
                        </el-divider>
                    </div> 
                </div>
                <div class="box-main ">  
                    <el-carousel height="300px" indicator-position="outside">
                        <el-carousel-item>
                            <div class="u-flex swiper-list u-flex u-flex-between u-p-l-20 u-p-r-20">
                                <div class="list-item " v-for="(item, index) in recommend_list" :key="index">
                                    <product-card-simple
                                        :origin="item"
                                    ></product-card-simple>
                                </div>
                            </div>
                            
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <div class="list-filters-box u-p-t-10 u-p-b-10">
                <div class="tabs-menus-cate">
                    <el-menu
                        :default-active="cate_active"
                        class="el-menu-demo"
                        mode="horizontal"
                        router
                        @select="handleSelect"
                        > 
                        <template  v-for="item in cate_list_all" >
                            <el-sub-menu  
                                v-if="item.children && item.children.length > 0" 
                                :index="`${item.id}`" 
                                :key="`${item.id}`"
                                >
                                <template #title> 
                                    <span class="menu-title" >{{item.name}}</span>
                                </template>
                                <el-menu-item 
                                    v-for="ele in item.children" 
                                    :index="ele.id" 
                                    :key="ele.id"  
                                    :route="{
                                        path: `/shop/${props.login}`,
                                        query: {
                                            cate: ele.id
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
                                :index="item.id" 
                                :key="item.id" 
                                :route="{
                                    path: `/shop/${props.login}`,
                                    query: {
                                        cate: item.id
                                    }
                                }"> 
                                <span >{{item.name}}</span>
                            </el-menu-item>
                        </template>
                    </el-menu>
                </div>
                <div class="tabs-menus-sort u-flex u-flex-between u-p-l-10 u-p-t-10 u-p-b-10" v-if="false">
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
                    <template v-if="!product_list || product_list.length == 0">
                        <div class="u-flex u-flex-center u-p-t-30" style="width: 100%; background-color: #fff;">
                            <el-empty description="列表为空" />
                        </div> 
                    </template>
                    <div class="list-item u-m-b-10" v-for="item in product_list" :key="item.id">
                        <product-card :origin="item"></product-card>
                    </div>
                </div>

            </div>
            <div class="list-page-box u-p-t-40 u-p-b-40">
                <el-pagination
                    v-model:current-page="curP"
                    v-model:page-size="pageSize" 
                    hide-on-single-page
                    background
                    layout="prev, pager, next, slot"
                    :total="product_total" 
                >
                    <span class="u-p-l-10">共 {{ product_total }} 条数据</span>
                </el-pagination>
            </div>
			
		</div>
	</div>
	<Footer-base></Footer-base>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, computed, watch, reactive, toRefs  } from "vue";
import router from '@/router/guard'
import {cateStore} from '@/stores/cate'
import { useSettingsStore } from '@/stores/settings';
const settings = useSettingsStore();
const cate = cateStore()
const { cate_list, cate_list_all, cate_loading } = toRefs(cate)
const props = defineProps({
    login: {
        type: String,
        default: ''
    }
})
const shop_info = ref({})
const curP = ref(1)
const pageSize = ref(24) 
const $api = inject('$api');  
const params = computed(() => { 
    return {
        p: curP.value, 
        cate: cate_active.value,
        num: pageSize.value,
        login: props.login
    }
})
const cate_active = ref('')  
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
const recommend_list = ref([])
const product_list = ref([])
const product_total = ref(0)
// ref([0, 1000])
const priceForm = reactive({
    price1: '',
    price2: '',
})
const loading = ref(false)
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

onMounted(async () => {
    // console.log(router.currentRoute.value.query)
    if(cate_list.value.length == 0 && !cate_loading.value) {
        await cate.getCateData()
    }
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
            await getShopData()
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

async function getShopData() {
    const res = await $api.web_login_shop({params: params.value, loading: false})
    if(res.code == 1) {
        shop_info.value = res.company 
	    res.company.company && settings.setTitle(res.company.company)
        product_list.value = res.list
        recommend_list.value = res.recommend.slice(0,6)
        product_total.value = +res.total 
    }
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
.swiper-list { 
    height: 100%;
    .list-item {
        flex: 0 0 15%;
        width: 15%;
        margin-right: 2%;
        &:nth-of-type(6n) {
            margin-right: 0;
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
.index-box {
		::v-deep {
			.el-divider__text {
				background-color: #f8f8f8;
			}
		}
		.box-title {
			.title {
				color: #000;
                font-weight: bold
			}
			.sub {
				color: $uni-text-color-grey;
			}
		}
		 .box-main {
            background-color: #fff;
         }
	}
</style>
