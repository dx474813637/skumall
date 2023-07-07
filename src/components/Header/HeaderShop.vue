<template>
    <header class="header" id="header">
        <HeaderBaseRow></HeaderBaseRow>
        <div class="header-main">
            <div class="home-w u-flex u-flex-between">
                <div class="main-logo u-flex u-flex-1">
                    
                    <template v-if="props.info.login">
                        <a href="#/" title="我要选品">
                            <!-- <img :src="props.info.img"  class="logo" alt="我要选品"> -->
                            <el-image :src="props.info.img" fit="cover" class="logo" >
                                <template #placeholder>
                                    <div class="u-flex u-flex-center"> 
                                        <el-image src="/logo.png" class="logo" fit="contain" /> 
                                    </div>
                                </template>
                                <template #error>
                                    <div class="u-flex u-flex-center"> 
                                        <el-image src="/logo.png" class="logo" fit="contain" /> 
                                    </div>
                                </template>
                            </el-image>
                        </a>
                        <div class="shop-info u-m-l-20">
                            <div class="shop-name u-font-16">{{ props.info.company }}</div>
                            <div class="shop-sub u-flex">
                                <el-text type="info" size="small">地址：</el-text>
                                <el-text size="small">{{ props.info.address }}</el-text>
                                <el-popover
									placement="bottom-start" 
									:width="200"
									trigger="hover" 
									v-if="props.info.ewm"
								>
									<el-image style="width: 100%; height: 180px;" :src="props.info.ewm"></el-image>
									<template #reference>
										<div class="u-m-l-10">
											<el-icon size="12" color="#f90">
												<i-ep-Iphone />
											</el-icon>
											<el-text size="small" class="u-p-3" type="warning">抖店</el-text>
										</div>
										
									</template>
								</el-popover>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <a href="#/" title="我要选品">
                            <img src="/logo.png"  class="logo" alt="我要选品">
                        </a>
                    </template>
                    
                </div>
                <div class="main-search u-flex u-flex-items-center">
                    <div class="search-w u-flex-1">
                        <div class="search-keys u-flex">
                            <div class="item" v-for="item in keyList" :key="item.value">
                                <div class="key-w u-font-12" :class="{active: keyActive == item.value}" @click="keyActive = item.value">
                                    {{ item.name }}
                                </div>
                            </div>
                        </div>
                        <div class="u-flex">
                            <div class="search-row u-p-l-8 u-m-r-10" :style="{borderTopLeftRadius: keyActive == '0'? '0px' : ''}">
                                <el-input v-model="kw" placeholder="输入关键字检索" size="small" class="input-with-select"></el-input>
                                <el-button 
                                    color="#007aff" 
                                    dark   
                                    size="small"
                                    @click="router.push({name: 'search_list', query: {cate: keyActive, terms: kw}})"
                                >
                                    <el-icon size="16">
                                        <i-ep-search></i-ep-search>
                                    </el-icon>
                                    <span>搜全站</span>
                                </el-button>
                            </div> 
                            <!-- <el-button 
                                color="#007aff" 
                                plain   
                                size="small"
                                style="height: 32px;"
                                >
                                <el-icon size="16">
                                    <i-ep-search></i-ep-search>
                                </el-icon>
                                <span>搜全站</span>
                            </el-button> -->
                        </div>
                       
                    </div> 
                </div>
            </div>
        </div> 
        
        <div class="header-nav">
            <div class="home-w"> 
                <div class="item u-flex-1 u-m-r-30">
                    <div class="nav-right-w u-flex u-flex-between">
                        <div class="nav-w">
                            <div class="nav-item active">
                                <p>首页</p>
                            </div>
                            <div class="nav-item">
                                <p>全部商品</p>
                            </div>
                            <!-- <div class="nav-item">
                                <p>最新上架</p>
                            </div>
                            <div class="nav-item">
                                <p>最新下架</p>
                            </div>
                            <div class="nav-item">
                                <p>热卖推荐</p>
                            </div>  -->
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang='ts'>
import { ref, toRefs } from 'vue'
import router from '@/router/guard';
import {baseStore} from '@/stores/main';
const props = defineProps({
    info: {
        type: Object,
        default: () => ({})
    }
})
const base = baseStore() 
const { app_title } = toRefs(base)
const kw = ref('') 
const keyActive = ref('0') 
const keyList = ref([
    {
        name: '商品',
        value: '0'
    }, 
    // {
    //     name: 'SKU编码',
    //     value: 'sku'
    // }
])
</script>  
<style lang='scss' scoped>
::v-deep .input-with-select {
    background-color: transparent;
    .el-input__wrapper {
        box-shadow: none; 
    } 
}
.input-with-select {
    // height: 40px;
}

.search-in-select {
    width: 115px;
}
.search-keys {  
    .item {
        .key-w {
            color: #666; 
            border-radius: 5px 5px 0 0;
            line-height: 22px;
            padding: 0 12px; 
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
                height: 90px;
            }

            .main-logo {
                // flex: 0 0 300px;

                .logo {
                    height: 45px;
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
            background-color: var(--el-color-primary-light-9);
            .home-w {
                @include flex(x);
            }
            .item {
                .nav-left-w { 
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
                            &.active {
                                background-color: $uni-color-primary;
                                color: #fff;
                            }
                            p {
                                padding: 8px 20px;
                            }
                        }
                    }
                }
            }
        }
    }
}
.shop-info {
    .shop-name {
        color: #000;
        font-weight: bold;
    }
}
</style>