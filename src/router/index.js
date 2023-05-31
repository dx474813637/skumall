//引入路由对象
import { createRouter, createWebHistory, createWebHashHistory, RouterView } from 'vue-router'

//vue2 mode history vue3 createWebHistory
//vue2 mode  hash  vue3  createWebHashHistory
//vue2 mode abstact vue3  createMemoryHistory

//路由数组的类型 RouteRecordRaw
// 定义一些路由
// 每个路由都需要映射到一个组件。
const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        name: 'index',
        meta: {
            title: '首页',
        },
        component: () => import('@/views/index/index.vue')
    },
    {
        path: '/list',
        name: 'list',
        meta: {
            title: '列表',
            cache: true,
        },
        component: () => import('@/views/list/list.vue')
    },
    // {
    //     path: '/home',
    //     component: () => import('@/views/home/home.vue')
    // }, 
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录',
            cache: true,
        },
        component: () => import('@/views/login/login.vue')
    },
    {
        path: '/reg',
        name: 'reg',
        meta: {
            title: '注册',
            cache: true,
        },
        component: () => import('@/views/reg/reg.vue')
    },
    {
        path: '/user',  //:id就是动态路由匹配
        name: 'user',
        component: () => import('@/views/user/user.vue'),
        // props:true  //传值1.props值为true时，将path里面的id传递给component里面的User.vue里面。 
        //下面是通过props传id和title。
        props: (route) => ({
            id: route.params.id,
            title: route.query.title
        }),
        children: [
            {
                path: 'product_edit/:id',
                name: 'product_edit',
                meta: {
                    title: '编辑商品', 
                },
                component: () => import('@/views/user/product_edit/product_edit.vue'),
            },
            {
                path: 'product_add',
                name: 'product_add',
                meta: {
                    title: '新增商品', 
                },
                component: () => import('@/views/user/product_edit/product_edit.vue'),
            },
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('@/views/error/404.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

//导出router
export default router
