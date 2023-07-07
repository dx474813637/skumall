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
        path: '/shop/:login',
        name: 'shop',
        meta: {
            title: '店铺',
            cache: true,
        }, 
        props:true, 
        component: () => import('@/views/shop/shop.vue')
    },
    {
        path: '/search_list',
        name: 'search_list',
        meta: {
            title: '搜索结果', 
        }, 
        component: () => import('@/views/search_list/search_list.vue')
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
    {
        path: '/product/:id',
        name: 'product',
        meta: {
            title: '商品详情',
            cache: true,
        },
        props:true, 
        component: () => import('@/views/product/product.vue')
    },
    {
        path: '/news_list',
        name: 'news_list',
        meta: {
            title: '公告/资讯', 
        }, 
        component: () => import('@/views/news_list/news_list.vue')
    },
    {
        path: '/news/:id',
        name: 'news',
        meta: {
            title: '公告/资讯详情',
            cache: true,
        },
        props:true, 
        component: () => import('@/views/news/news.vue')
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
        },
        props: (route) => ({
            role: route.query.role ? route.query.role : '13', 
        }),
        component: () => import('@/views/login/login.vue')
    },
    {
        path: '/reg',
        name: 'reg',
        meta: {
            title: '注册', 
        },
        props: (route) => ({
            role: route.query.role ? route.query.role : '13', 
        }),
        component: () => import('@/views/login/login.vue')
    },
    {
        path: '/rank',
        name: 'rank',
        meta: {
            title: '排行榜',
            cache: true,
        },
        component: () => import('@/views/rank/rank.vue')
    },
    {
        path: '/user',  //:id就是动态路由匹配
        name: 'user',
        meta: { 
            isAuth: true,
        },
        redirect: '/user/index',
        component: () => import('@/views/user/user.vue'),
        // props:true  //传值1.props值为true时，将path里面的id传递给component里面的User.vue里面。 
        //下面是通过props传id和title。
        // props: (route) => ({
        //     id: route.params.id,
        //     title: route.query.title
        // }),
        children: [
            {
                path: 'index',
                name: 'user_index',
                meta: {
                    title: '个人中心', 
                },
                component: () => import('@/views/user/index/index.vue'),
            },
            {
                path: 'cart',
                name: 'cart',
                meta: {
                    title: '采购车', 
                },
                component: () => import('@/views/user/cart/cart.vue')
            },
            {
                path: 'product_list',
                name: 'product_list',
                meta: {
                    title: '商品管理', 
                },
                component: () => import('@/views/user/product_list/product_list.vue'),
            },
            {
                path: 'product_edit/:id',
                name: 'product_edit',
                meta: {
                    title: '编辑商品', 
                },
                props:true, 
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
            {
                path: 'sku_list',
                name: 'sku_list',
                meta: {
                    title: 'SKU管理', 
                },
                component: () => import('@/views/user/sku_list/sku_list.vue'),
            }, 
            {
                path: 'address_list',
                name: 'address_list',
                meta: {
                    title: '地址管理', 
                },
                component: () => import('@/views/user/address_list/address_list.vue'),
            }, 
            {
                path: 'order_list',
                name: 'order_list',
                meta: {
                    title: '订单管理', 
                },
                component: () => import('@/views/user/order_list/order_list.vue'),
            }, 
            {
                path: 'order_create',
                name: 'order_create',
                meta: {
                    title: '订单创建', 
                }, 
                component: () => import('@/views/user/order_create/order_create.vue'),
            }, 
            {
                path: 'order/:id',
                name: 'order',
                meta: {
                    title: '订单详情', 
                },
                props:true, 
                component: () => import('@/views/user/order/order.vue'),
            }, 
            {
                path: 'info',
                name: 'user_info',
                meta: {
                    title: '个人名片', 
                },
                component: () => import('@/views/user/info/info.vue'),
            },
            {
                path: 'cpy_info',
                name: 'cpy_info',
                meta: {
                    title: '企业信息', 
                },
                component: () => import('@/views/user/cpy_info/cpy_info.vue'),
            },
            {
                path: 'finance',
                name: 'finance',
                meta: {
                    title: '融资中心', 
                    isFinanceAuth: true,
                },
                component: () => import('@/views/user/finance/finance.vue'),
                children: [
                    {
                        path: 'finance_account',
                        name: 'finance_account',
                        meta: {
                            title: '认证信息', 
                        },
                        props: true,
                        component: () => import('@/views/user/finance/account/account.vue'),
                    },
                    {
                        path: 'user_apply',
                        name: 'user_apply',
                        meta: {
                            title: '个人认证表单', 
                        },
                        component: () => import('@/views/user/finance/user_apply/user_apply.vue'),
                    },
                    {
                        path: 'user_verify',
                        name: 'user_verify',
                        meta: {
                            title: '个人验证', 
                        },
                        component: () => import('@/views/user/finance/user_verify/user_verify.vue'),
                    },
                    {
                        path: 'company_apply',
                        name: 'company_apply',
                        meta: {
                            title: '企业认证表单', 
                        },
                        component: () => import('@/views/user/finance/company_apply/company_apply.vue'),
                    },
                    {
                        path: 'company_verify',
                        name: 'company_verify',
                        meta: {
                            title: '企业验证', 
                        },
                        component: () => import('@/views/user/finance/company_verify/company_verify.vue'),
                    },
                    {
                        path: 'query_product_list',
                        name: 'query_product_list',
                        meta: {
                            title: '融资产品列表', 
                        },
                        component: () => import('@/views/user/finance/query_product_list/query_product_list.vue'),
                    },
                    {
                        path: 'query_product/:id',
                        name: 'query_product',
                        meta: {
                            title: '融资产品详情', 
                        },
                        props: true,
                        component: () => import('@/views/user/finance/query_product/query_product.vue'),
                    },
                    {
                        path: 'pacc_query_edit/:id',
                        name: 'pacc_query_edit',
                        meta: {
                            title: '预授信申请表单', 
                        },
                        props: true,
                        component: () => import('@/views/user/finance/pacc_query_edit/pacc_query_edit.vue'),
                    },
                    {
                        path: 'pacc_query_list',
                        name: 'pacc_query_list',
                        meta: {
                            title: '授信申请列表', 
                        },
                        component: () => import('@/views/user/finance/pacc_query_list/pacc_query_list.vue'),
                    },
                    {
                        path: 'pacc_query/:id',
                        name: 'pacc_query',
                        meta: {
                            title: '授信申请详情', 
                        },
                        props: true,
                        component: () => import('@/views/user/finance/pacc_query/pacc_query.vue'),
                    },
                    {
                        path: 'order_bank_list',
                        name: 'order_bank_list',
                        meta: {
                            title: '融资请求列表', 
                        },
                        component: () => import('@/views/user/finance/order_bank_list/order_bank_list.vue'),
                    },
                    {
                        path: 'order_bank/:id',
                        name: 'order_bank',
                        meta: {
                            title: '融资请求详情', 
                        },
                        props: true,
                        component: () => import('@/views/user/finance/order_bank/order_bank.vue'),
                    },
                    // {
                    //     path: 'pacc_type_detail/:type',
                    //     name: 'pacc_type_detail',
                    //     meta: {
                    //         title: '授信签约详情', 
                    //     },
                    //     props: true,
                    //     component: () => import('@/views/user/finance/pacc_type_detail/pacc_type_detail.vue'),
                    // },
                ]
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
