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
                        <template  v-for="item in cate_list" > 
                            <el-menu-item 
                                :index="item.id"  
                                :route="{
                                    path: '/news_list',
                                    query: {
                                        cate: item.id
                                    }
                                }"> 
                                <span >{{item.name}}</span>
                            </el-menu-item>
                        </template>
                    </el-menu>
                </div> 
            </div>
            <div class="list-main-box u-p-t-10 u-p-b-10" v-loading="loading">
                <div class="list">
                    <template v-if="!news_list || news_list.length == 0">
                        <div class="u-flex u-flex-center u-p-t-30" style="width: 100%; background-color: #fff;">
                            <el-empty description="列表为空" />
                        </div> 
                    </template>
                    <div class="list-item u-m-b-10" v-for="item in news_list" :key="item.id">
                        <NewsCard :origin="item"></NewsCard>
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
                    :total="news_total" 
                >
                    <span class="u-p-l-10">共 {{ news_total }} 条数据</span>
                </el-pagination>
            </div>
			
		</div>
	</div>
	<Footer-base></Footer-base>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, computed, watch, reactive, toRefs } from "vue";
// import {cateStore} from '@/stores/cate'
// const cate = cateStore()
// const {cate_list, cate_list_all, cate_loading} = toRefs(cate)
import router from '@/router/guard'
import {deepClone} from '@/utils/index'
const curP = ref(1)
const pageSize = ref(18) 
const $api = inject('$api');  
const params = computed(() => { 
    return {
        p: curP.value, 
        cate: cate_active.value,
        num: pageSize.value
    }
})
const cate_active = ref('')   
const cate_list = ref([
    {
        name: '全部',
        id: ''
    },
    {
        name: '公告',
        id: '公告'
    },
    {
        name: '资讯',
        id: '资讯'
    }
])


const news_list = ref([])
const news_total = ref(0)
const loading = ref(false)
onMounted(async () => {
    // console.log(router.currentRoute.value.query)
    if(cate_list.value.length == 0 && !cate_loading.value) {
        await cate.getCateData()
    }
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
            await getNewsData()
        } catch (error) {
            
        }
        loading.value = false
        
    },
    {  
        immediate: true,
        deep: true
    }
) 
async function getNewsData() {
    const res = await $api.web_news({params: params.value, loading: false})
    if(res.code == 1) {
        news_list.value = res.list
        news_total.value = +res.total
    }
}

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
function initParams() { 
    cate_active.value = router.currentRoute.value.query.cate 
   
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
                // @include flex(x, start, start);
                // flex-wrap: wrap;
                .list-item {
                    // flex: 0 0 15%;
                    // width: 15%;
                    // margin-right: 2%;
                    // &:nth-of-type(6n) {
                    //     margin-right: 0;
                    // }
                }
            }
        }
        .list-page-box {
            // @include flex(x, center)
        }
    }
}
</style>
