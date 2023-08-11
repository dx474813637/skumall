<template>
    <header class="header" id="header">
        <HeaderBaseRow></HeaderBaseRow>
        <div class="header-main">
            <div class="home-w">
                <div class="main-logo">
                    <a href="#/" title="我要选品"><img src="/logo.png"
                            class="logo" alt="我要选品"></a>
                </div>
                <div class="main-search u-flex-1 u-flex u-flex-items-center">
                    <div class="search-w u-flex-1">
                        <div class="search-keys u-flex">
                            <div class="item" v-for="item in keyList" :key="item.value">
                                <div class="key-w" :class="{active: keyActive == item.value}" @click="keyActive = item.value">
                                    {{ item.name }}
                                </div>
                            </div>
                        </div>
                        <div class="search-row u-p-l-8 " :style="{borderTopLeftRadius: keyActive == '0'? '0px' : ''}">
                            <el-input v-model="kw" placeholder="输入关键字检索" class="input-with-select" @keyup.enter="handleSearch" ></el-input>
                            <el-button 
                                color="#007aff" 
                                dark  
                                size="large"
                                @click="handleSearch"
                            >
                                <el-icon size="16">
                                    <i-ep-search></i-ep-search>
                                </el-icon>
                                <span>搜索</span>
                            </el-button>
                        </div>
                        <div class="search-hot u-font-12 u-p-l-5 u-p-t-20">
                            <!-- <a href="search.html?terms=轴承" class="item text-danger ">轴承</a>
                            <a href="search.html?terms=深沟球" class="item  ">深沟球</a>
                            <a href="search.html?terms=6300" class="item  ">6300</a>
                            <a href="search.html?terms=花纹板" class="item  ">花纹板</a>
                            <a href="search.html?terms=工字钢" class="item  ">工字钢</a>
                            <a href="search.html?terms=深沟球轴承" class="item  ">深沟球轴承</a>
                            <a href="search.html?terms=圆锥滚子轴承" class="item  ">圆锥滚子轴承</a> -->
                        </div>
                    </div>
                    <div class="main-user u-p-t-10">
                        <div class="item bg-white pt-1 shop-card">
                            <div class="shop-card-header dx-flex text-danger" @click="router.push({name: 'cart'})">
                                <el-icon size="20">
                                    <i-ep-ShoppingCart />
                                </el-icon>
                               
                                <span class="shop-name u-m-l-10">我的选品车</span>

                            </div>
                            <!-- <div class="shop-card-sub u-font-12 u-m-t-4">

                                <div class="item-info">
                                    <i-ep-clock />
                                    <span class=" u-m-l-15">周一至周五8:00-17:00</span>
                                </div>
                            </div> -->

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="header-nav u-font-16">
            <div class="home-w">
                <div class="item">
                    <div class="nav-left-w">
                        <div class="nav-left-header">
                            <i-ep-Paperclip />
                            <p>行业分类</p>
                        </div>
                        <div class="nav-left-more" v-if="router.currentRoute.value.name != 'index'">
                            <menu-cate></menu-cate>
                        </div>
                    </div>
                </div>
                <div class="item u-flex-1 u-m-l-20 u-m-r-30">
                    <div class="nav-right-w u-flex u-flex-between">
                        <div class="nav-w">
                            <div class="nav-item" @click="router.push({name: 'list'})">
                                <p>全部商品</p>
                            </div>
                            <div class="nav-item" @click="router.push({name: 'list'})">
                                <p>热销</p>
                            </div>
                            <div class="nav-item" @click="router.push({name: 'list'})">
                                <p>新品</p>
                            </div>
                            <div class="nav-item" @click="router.push({name: 'list'})">
                                <p>品牌</p>
                            </div>
                            <div class="nav-item" @click="router.push({name: 'list'})">
                                <p>促销专区</p>
                            </div> 
                        </div>
                        <el-divider direction="vertical" />
                        <div class="nav-w">
                            <div class="nav-item" v-for="(item) in memu_list" :key="item.id">
                                <p>
                                    <router-link
                                        v-if="item.cate == '1'" 
                                        tag="a" 
                                        target="_blank" 
                                        :to="{
                                            name: 'web_danye',
                                            params: {
                                                id: item.id
                                            },
                                            query: {
                                                title: item.name
                                            }
                                        }"
                                        >{{ item.name }}</router-link> 
                                    <a
                                        v-else-if="item.cate == '2'"  
                                        target="_blank" 
                                        :href="item.url"
                                        >{{ item.name }}</a> 
                                </p>
                            </div>
                            <!-- <div class="nav-item" @click="router.push({name: 'rank'})">
                                <p>供应商排行榜</p>
                            </div>
                            <div class="nav-item" @click="router.push({name: 'rank'})">
                                <p>商品排行榜</p>
                            </div>
                            <div class="nav-item" @click="router.push({name: 'list'})">
                                <p>快捷融资</p>
                            </div>  -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang='ts'>
import { onMounted, ref, watch, toRefs } from 'vue'
import router from '@/router/guard';
import {cateStore} from '@/stores/cate';
// import {userStore} from '@/stores/user';
const cate = cateStore() 
const { memu_list } = toRefs(cate)
// const user = userStore() 
const props = defineProps({
    cate: {
        type: String,
        default: '0'
    },
    terms: {
        type: String,
        default: ''
    },
})
// const { app_title } = toRefs(base)
// const { login, user_info } = toRefs(user)
const kw = ref('') 
const keyActive = ref('0') 
const keyList = ref([
    {
        name: '商品',
        value: '0'
    },
    {
        name: '供应商',
        value: '1'
    },
    // {
    //     name: 'SKU编码',
    //     value: 'sku'
    // }
])
watch(
    () => props.cate,
    (n) => {
        keyActive.value = n || '0'
    },
    {
        immediate: true
    }
)
watch(
    () => props.terms,
    (n) => {
        kw.value = n 
    },
    {
        immediate: true
    }
)
const url = ref('logo.png')
onMounted(() => {
    console.log(url.value)
})
function handleSearch() {
    router.push({path: '/search_list', query: {cate: keyActive.value, terms: kw.value}})
} 
</script>  
<style lang='scss' scoped>
::v-deep .input-with-select {
    background-color: transparent;
    .el-input__wrapper {
        box-shadow: none; 
    } 
}
.input-with-select {
    height: 40px;
}

.search-in-select {
    width: 115px;
}
.search-keys {  
    .item {
        .key-w {
            color: #666; 
            border-radius: 5px 5px 0 0;
            line-height: 30px;
            padding: 0 12px;
            font-size: 14px;
            cursor: pointer;
            transition: all .3s;
            &:hover {
                color: $uni-color-primary;
            }
            &.active {
                color: #fff;
                background-color: $uni-color-primary;
            }
        }
    }
}
header {
    color: $uni-text-color-grey;
    background: #fff;
    &.header {
        .header-top {
            background-color: #fafafa;
            font-size: 12px;
            border-bottom: 1px solid #e7e7e7;

            .home-w {
                @include flex(x, between);
                height: 40px;

                .top-left {
                    @include flex(x);

                    .login {
                        cursor: pointer;
                        color: $uni-color-primary;
                    }

                    .reg {
                        border-left: 1px solid #ddd;
                        cursor: pointer;
                    }
                }

                .top-right {

                    &>a,
                    >span {
                        padding: 0 8px;
                    }
                    .el-link {
                        padding: 0 5px
                    }

                }
            }
        }

        .header-main {
            .home-w {
                @include flex(x);
                height: 130px;
            }

            .main-logo {
                flex: 0 0 300px;

                .logo {
                    height: 55px;
                }
            }

            .main-search {
                // @include flex(x);

                .search-w {
                    .search-row {
                        overflow: hidden; 
                        @include flex(x);
                        border: 2px solid $uni-color-primary;
                        border-radius: 5px;
                        transition: all .3s;
                        &:hover {
                            border-color: $uni-color-primary;
                        }
                        .el-button {
                            height: 100%;
                            border-radius: 0;
                        }
                    } 

                    .search-hot {
                        padding-top: 5px;
                        .item {
                            margin-right: 8px;
                            color: #999;
                            &:first-child {
                                 color: $uni-color-error;
                            }
                           
                        }
                    }
                }
            }

            .main-user {
                flex: 0 0 300px;
                @include flex(x, center);

                .shop-card-header {
                    @include flex(x);
                    color: $uni-color-error;
                    cursor: pointer;
                    .shop-name {
                        font-weight: bold
                    }
                }

                .shop-card-sub {
                    .item-info {
                        @include flex(x);
                    }
                }
            }
        }
        .header-nav {
            border-bottom: 2px solid $uni-color-primary;
            .home-w {
                @include flex(x);
            }
            .item {
                .nav-left-w { 
                    position: relative;
                    .nav-left-header {
                        @extend %box-sizing;
                        @include flex(x);
                        width: $header-menus-w;
                        background-color: $uni-color-primary;
                        color: #fff;
                        border-radius: 5px 5px 0 0 ;
                        padding: 8px;
                        cursor: pointer;
                        padding-left: 15px;
                        position: relative;
                        &:hover {
                            &:after {
                                background-color: rgba(0,0,0,0.1);
                            }
                        }
                        &:after {
                            content: '';
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            background-color: rgba(0,0,0,0);
                            transition: all .3s;
                            border-radius: 5px 5px 0 0 ;
                        }
                        p {
                            padding-left: 15px
                        }
                    }
                    .nav-left-more {
                        @extend %box-sizing;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        width: 100%;
                        display: none;
                        background-color: #fff;
                        z-index: 50;
                        box-shadow: 0 5px 10px rgba(0,0,0,.1);
                        border-radius: 0 0 8px 8px;
                        padding: 10px;
                        border-top: 2px solid $uni-color-primary;
                    }
                    &:hover {
                        .nav-left-more {
                            display: block
                        }
                    }
                }
                .nav-right-w {
                    .nav-w {
                        @include flex(x);
                        color: $uni-text-color;
                        .nav-item {
                            cursor: pointer; 
                            &:hover {
                                color: $uni-color-primary;
                            }
                            p {
                                padding: 8px 12px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>