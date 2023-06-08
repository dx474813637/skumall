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