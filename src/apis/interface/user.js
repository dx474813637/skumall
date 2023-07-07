import axios from '@/request/index';

// `my_card` 买卖方名片
export const my_card = (data) => axios.get('Userapi/my_card', data)  
// `edit_card` 编辑买卖方名片
export const edit_card = (data, config) => axios.post('Userapi/edit_card', data, config) 

// my_company 卖家企业信息
export const my_company = (data, config) => axios.post('Userapi/my_company', data, config) 
// save_company 编辑卖家企业信息 `company`公司名称, `img`logo, `info`介绍, `phone`联系电话, `address`地址, contacts联系人 ewm二维码图片
export const save_company = (data, config) => axios.post('Userapi/save_company', data, config) 


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
// `order_list` 订单列表  参数type 1待付款 2待收货 3已完成 role=1 买家的订单列表 不传或传其他值 卖家的订单列表 p页数
export const order_list = (data) => axios.get('Userapi/order_list', data) 
// `order_detail` 订单详情 参数order_id
export const order_detail = (data) => axios.get('Userapi/order_detail', data)  
 
// `orderConfirm` 订单详情 参数order_id
export const orderConfirm = (data) => axios.get('Userapi/orderConfirm', data)  
 
// rz_pay 融资支付  order_id
export const rz_pay = (data) => axios.get('Userapi/rz_pay', data) 
 
// 订单状态  0 待付款 1付款成功 2待收货 3订单完成 
// 4评分完成 5支付中 6支付失败
// 状态0或6的时候能发起支付 
// 1的时候在卖家端出现发货 
// 2的时候在买家端出现确认收货 
// 3的时候买家端出现评分
 
// change_order_status  改变订单状态（收货/发货） 参数order_id 
export const change_order_status = (data) => axios.get('Userapi/change_order_status', data) 


// order_score 订单评分 参数order_id score 1-5
export const order_score = (data) => axios.get('Userapi/order_score', data) 
// login_role 角色权限
export const login_role = (data) => axios.get('Userapi/login_role', data) 
