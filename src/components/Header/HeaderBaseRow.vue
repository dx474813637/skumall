<template> 
    <div class="header-top">
        <div class="home-w">
            <div class="top-left u-flex">
                <p class="u-p-r-10">您好！欢迎光临-{{ app_title }}</p>
                <template v-if="login">
                    <el-link class="u-font-12" type="primary" :underline="false" @click="router.push({name: 'user_index'})">{{ user_info.name }}</el-link>
                </template>
                <template v-else>
                    <a href="#/login/" class="login u-m-r-5">登录</a>
                    <a href="#/login/" class="reg u-p-l-5">免费注册</a>
                </template>
                
            </div>
            <div class="top-right ">
                <span class="item">
                    <el-link :underline="false" href="#/" target="_blank">选品首页</el-link>
                </span> 
                <span class="item">
                    <el-link :underline="false" href="#/user/cart" target="_blank">选品车</el-link>
                </span> 
                <span class="item">
                    <el-link :underline="false" href="#/user/" target="_blank">用户中心</el-link>
                </span>  
                <span class="item">
                    <el-link :underline="false" href="#/help" target="_blank">帮助中心</el-link>
                </span>  
            </div>
        </div>
    </div>  
</template>

<script setup lang='ts'>
import { onMounted, ref, toRefs } from 'vue'
import router from '@/router/guard';
import {baseStore} from '@/stores/main';
import {userStore} from '@/stores/user';
const base = baseStore() 
const user = userStore() 
const { app_title } = toRefs(base)
const { login, user_info } = toRefs(user) 
const url = ref('logo.png')
onMounted(async () => {
    // console.log(login)
    if(!user_info.name && localStorage.getItem('token')) {
        user.getUserData()
    }
})
</script>  
<style lang='scss' scoped> 
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
 
</style>