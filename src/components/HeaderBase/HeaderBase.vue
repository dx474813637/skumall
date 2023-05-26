<template>
    <header class="header" id="header">
        <div class="header-top">
            <div class="home-w">
                <div class="top-left">
                    <p class="u-p-r-10">您好！欢迎光临-衢链通</p>
                    <a href="login.html" target="_blank" class="login u-m-r-5">登录</a>
                    <a href="reg.html" target="_blank" class="reg u-p-l-5">免费注册</a>
                </div>
                <div class="top-right ">
                    <span class="item">合作入驻</span>
                    <span class="item">智能门店招商</span>
                    <span class="item">客服：15957197946</span>
                    <i-ep-plus />
                </div>
            </div>
        </div>
        <div class="header-main">
            <div class="home-w">
                <div class="main-logo">
                    <a href="/" title="衢链通"><img src="http://zc.toocle.com//Public/attached/2022/08/22/6302e8d2c9965.jpg"
                            class="logo" alt="衢链通"></a>
                </div>
                <div class="main-search u-flex-1">
                    <div class="search-w u-flex-1">
                        <div class="search-row u-p-l-8 u-p-r-4">
                            <el-input v-model="kw" placeholder="输入关键字检索商品" class="input-with-select"></el-input>
                            <el-button 
                                color="#007aff" 
                                dark
                                round 
                                :icon="Search"
                            >搜索</el-button>
                        </div>
                        <div class="search-hot u-font-12 u-p-l-20">
                            <a href="search.html?terms=轴承" class="item text-danger ">轴承</a>
                            <a href="search.html?terms=深沟球" class="item  ">深沟球</a>
                            <a href="search.html?terms=6300" class="item  ">6300</a>
                            <a href="search.html?terms=花纹板" class="item  ">花纹板</a>
                            <a href="search.html?terms=工字钢" class="item  ">工字钢</a>
                            <a href="search.html?terms=深沟球轴承" class="item  ">深沟球轴承</a>
                            <a href="search.html?terms=圆锥滚子轴承" class="item  ">圆锥滚子轴承</a>
                        </div>
                    </div>
                    <div class="main-user u-p-b-15">
                        <div class="item bg-white pt-1 shop-card">
                            <div class="shop-card-header dx-flex text-danger">
                                <i-ep-phone />
                                <span class="shop-name u-m-l-10">客服：15957197946</span>

                            </div>
                            <div class="shop-card-sub u-font-12 u-m-t-4">

                                <div class="item-info">
                                    <i-ep-clock />
                                    <span class=" u-m-l-15">周一至周五8:00-17:00</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="header-nav">
            <div class="home-w">
                <div class="item">
                    <div class="nav-left-w">
                        <div class="nav-left-header">
                            <i-ep-Paperclip />
                            <p>行业分类</p>
                        </div>
                    </div>
                </div>
                <div class="item u-flex-1 u-m-l-10">
                    <div class="nav-right-w">
                        <div class="nav-w">
                            <div class="nav-item">
                                <p>首页</p>
                            </div>
                            <div class="nav-item">
                                <p>平台市场</p>
                            </div>
                            <div class="nav-item">
                                <p>平台商城</p>
                            </div>
                            <div class="nav-item">
                                <p>行情中心</p>
                            </div>
                            <div class="nav-item">
                                <p>资讯中心</p>
                            </div>
                            <div class="nav-item">
                                <p>供应链金融</p>
                            </div>
                            <div class="nav-item">
                                <p>产业链</p>
                            </div>
                            <div class="nav-item">
                                <p>风险评级</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang='ts'>
import { onMounted, onBeforeMount, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const kw = ref('')
// const select = ref('')
onBeforeMount(() => {
    console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
    console.log('3.-组件挂载到页面之后执行-------onMounted')
})
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

header {
    color: $uni-text-color-grey;

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
                        padding: 0 5px;
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
                @include flex(x);

                .search-w {
                    .search-row {
                        overflow: hidden; 
                        @include flex(x);
                        border: 1px solid $uni-border-color;
                        border-radius: 30px;
                        transition: all .3s;
                        &:hover {
                            border-color: $uni-color-primary;
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
                    .nav-left-header {
                        @extend %box-sizing;
                        @include flex(x);
                        width: 200px;
                        background-color: $uni-color-primary;
                        color: #fff;
                        border-radius: 5px 5px 0 0 ;
                        padding: 5px;
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
                            p {
                                padding: 5px 12px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>