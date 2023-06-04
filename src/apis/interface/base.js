import axios from '@/request/index';

// 10001 66f7iMFW6859I2reEiTsm7wIZQWhevpdvu2XggRIuUnH/zEbybV1fMs
// 选品中心  用户后台appid。
// https://doudian.y.netsun.com/Userapi/

// syblogin   生意宝账号登录 参数login passwd msgcode role=13卖家,14买家
// 有账号密码登录  账号验证码登录  账号验证码注册
export const syblogin = (data) => axios.get('Userapi/syblogin', data) 
// msgcode  验证码获取 参数login（手机号不能是账号）
export const msgcode = (data) => axios.get('Userapi/msgcode', data) 

// product 商品列表 参数p 
export const product = (data) => axios.get('Userapi/product', data) 
// product_detail 商品详情 参数id
export const product_detail = (data) => axios.get('Userapi/product_detail', data) 
// login_sku sku列表
export const login_sku = (data) => axios.get('Userapi/login_sku', data) 
// sku_detail sku详情 参数id
export const sku_detail = (data) => axios.get('Userapi/sku_detail', data) 
// save_sku 保存sku 参数id name sku 有id更新没有id新增
export const save_sku = (data) => axios.get('Userapi/save_sku', data) 
// pid_sku 单个商品某个规格的库存 参数pid sku json格式的字符串  { '颜色': '红色', '尺码': 'S' } 这个接口好像后台用不到，前台详情里面的。
export const pid_sku = (data) => axios.get('Userapi/pid_sku', data) 
// upimg 上传图片
export const upimg = (data, config) => axios.post('Userapi/upimg', data, config) 
// cate_list 分类
export const cate_list = (data) => axios.get('Userapi/cate_list', data) 

// save_product 保存商品 
    // 参数：`id 有id更新没有id新增`,`name`, `cate分类id`, `price`, `pic`商品轮播图, `description商品描述，目前只支持图片。多张图片用|分开。
    // 这个是抖店的详情`, `recommend_remark商家推荐语`, `freight_id运费模板id，传0表示包邮`, `weight重量`, 
    // `weight_unit重量单位，0-kg, 1-g`, `delivery_delay_day承诺发货时间，单位是天`, `info富文本详情`, 
    // `zt`, `on上架1下架0`，spec_prices=json格式的sku specs=颜色|红色,黑色^尺码|S,M，
    // 这两个参数就在新增时接受，编辑时不接口。如果只编辑库存，直接在详情接口里面根据库存列表编辑，不需要编辑商品信息。
export const save_product = (data, config) => axios.post('Userapi/save_product', data, config) 
// spec_prices的格式
// [
//     {
//         "sku":{
//             "颜色":"红色",
//             "尺码":"S"
//             },
//         "img":"图片地址",
//         "stock":11,
//         "price":100,
//     },
//     {
//         "sku":{
//             "颜色":"红色",
//             "尺码":"M"
//             },
//         "img":"图片地址",
//         "stock":12,
//         "price":120,
//     }
// ]

// 弃用 save_stock 保存某一个规格的库存和价格 参数id 库存id stock price img
export const save_stock = (data) => axios.get('Userapi/save_stock', data) 