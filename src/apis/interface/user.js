import axios from '@/request/index';

// `my_card`个人信息
export const my_card = (data) => axios.get('Userapi/my_card', data) 

// `edit_card`个人信息
export const edit_card = (data, config) => axios.post('Userapi/edit_card', data, config) 
// `addresss_list` 地址列表 参数p
export const addresss_list = (data) => axios.get('Userapi/addresss_list', data) 
// `address_detail` 地址详情 参数address_id
export const address_detail = (data) => axios.get('Userapi/address_detail', data) 
// `regional_list` 地区列表  在编辑地址时regional字段需要用到。
export const regional_list = (data) => axios.get('Userapi/regional_list', data) 
// `addressDetail` 地区列表  在编辑地址时regional字段需要用到。
export const addressDetail = (data) => axios.get('Userapi/addressDetail', data) 

// `address_change` 地址修改 
// 		参数
// 		name      收件人姓名       必填
// 		mobile    收件人手机号码   必填
// 		regional  收件地区(数字) 这里用到地区列表接口   必填
// 		address   收件详细地址     必填
// 		remark    备注             选填
// 		address_id  地址列表中的地址ID值  选填  修改时原有数据时需要带上，否则是新添加数据
// 		auto  0 1
export const address_change = (data) => axios.get('Userapi/address_change', data) 


// `create_order` 生成订单 参数pid_array  address_id
// json格式，每一条记录包含： cid表示旺铺ID，pid商品ID，num表示购买的商品数量
export const create_order = (data) => axios.get('Userapi/create_order', data) 
// `order_list` 订单列表 参数p  type  订单类型 选填(系统默认4全部订单)  1待付款2待发货3待收货4全部订单
export const order_list = (data) => axios.get('Userapi/order_list', data) 
// `order_detail` 订单详情 参数order_id
export const order_detail = (data) => axios.get('Userapi/order_detail', data) 