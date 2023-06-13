import axios from '@/request/index';

// query_product_list 一、融资产品列表
export const query_product_list = (data) => axios.get('Userapi/query_product_list', data)

// query_product_detail  二、融资产品详情 参数：product_id  融资产品ID 必填   (接口一获取)
export const query_product_detail = (data) => axios.get('Userapi/query_product_detail', data)

// pacc_detail  三(1)、预授信申请1 参数：product_id  融资产品ID 必填  
export const pacc_detail = (data) => axios.get('Userapi/pacc_detail', data)

// pacc    三(2)、预授信申请提交  
export const pacc = (data) => axios.get('Userapi/pacc', data)

// pacc_businessProvince 35个省级数据
export const pacc_businessProvince = (data) => axios.get('Userapi/pacc_businessProvince', data)

// pacc_query_list  四、授信申请列表     参数：p  页码 选填，默认1
//                     status  授信申请状态   选填 
export const pacc_query_list = (data) => axios.get('Userapi/pacc_query_list', data)

// pacc_query_detail  五、授信申请详情  参数：id    授信申请表ID     必填   接口四返回数据
export const pacc_query_detail = (data) => axios.get('Userapi/pacc_query_detail', data)

// pacc_query      六、授信申请状态更新 参数：pacc_id  hub授信ID     必填  接口五获取
export const pacc_query = (data) => axios.get('Userapi/pacc_query', data)

// query_loans_information     六(2)、查询可用余额 pacc_id  hub授信ID     必填  接口五获取
export const query_loans_information = (data) => axios.get('Userapi/query_loans_information', data)

// yiqianbao_start     七(1)、文件开始签约 参数：id    授信申请表ID     必填 contract_id  286/287   必填
export const yiqianbao_start = (data) => axios.get('Userapi/yiqianbao_start', data)

// yiqianbao_cancel       七(2)、 取消/撤销签约 参数：id    授信申请表ID     必填 contract_id  286/287   必填
export const yiqianbao_cancel = (data) => axios.get('Userapi/yiqianbao_cancel', data)


// query_signflows     七(3)、更新签约状态 signflows_state = 2更新签约状态     参数：id    授信申请表ID     必填contract_id  286/287   必填
export const query_signflows = (data) => axios.get('Userapi/query_signflows', data)
      

// order_bank_list   八、融资请求列表  rz_status 融资支付状态 选填   p  页码  选填，默认1
export const order_bank_list = (data) => axios.get('Userapi/order_bank_list', data)


// bank_buy_all      "我的"中返回金额 
export const bank_buy_all = (data) => axios.get('Userapi/bank_buy_all', data)

// order_bank_detail   九、融资请求详情    参数：id    融资支付ID       必填
export const order_bank_detail = (data) => axios.get('Userapi/order_bank_detail', data)

// loans_repayment_query   九(2)、还款信息查询     order_id  订单ID       必填
export const loans_repayment_query = (data) => axios.get('Userapi/loans_repayment_query', data)

// order_bank_query    十、融资请求状态更新    参数：order_id  订单ID       必填
export const order_bank_query = (data) => axios.get('Userapi/order_bank_query', data)

// rz_pay      十一、发起融资支付   融资支付订单只能是货到付款     参数：order_id  订单ID       必填
export const rz_pay = (data) => axios.get('Userapi/rz_pay', data)

// rz_check_tran   十二、融资支付订单 确认收货     参数：order_id  订单ID       必填
export const rz_check_tran = (data) => axios.get('Userapi/rz_check_tran', data)

// ------认证签约部分
//     先创建信息，然后去认证操作，最后认证成功

// account 十三、个人信息
export const account = (data) => axios.get('Userapi/account', data)

// create_account      十四、创建个人信息
export const create_account = (data) => axios.get('Userapi/create_account', data)
// 参数：name      姓名         必填
// idType    证件类型     必填
// idNumber  证件号       必填
// mobile    手机号码     选填
// email     电子邮箱     选填

// 证件类型
// CRED_PSN_CH_IDCARD 中国大陆身份证
// CRED_PSN_CH_TWCARD 台湾来往大陆通行证
// CRED_PSN_CH_MACAO  澳门来往大陆通行证
// CRED_PSN_CH_HONGKONG 香港来往大陆通行证
// CRED_PSN_PASSPORT 护照

// query_account   十五、更新个人信息
export const query_account = (data) => axios.get('Userapi/query_account', data)

// change_account      十六、修改个人信息
export const change_account = (data) => axios.get('Userapi/change_account', data)

// verify_account      十七(1)、发起个人认证
export const verify_account = (data) => axios.get('Userapi/verify_account', data)

// get_mobile_code     十七(2)、获取个人认证手机验证码 name-姓名-必填  mobile-手机号码-必填
export const get_mobile_code = (data) => axios.get('Userapi/get_mobile_code', data)

// verify_account_3        十七(3)、更新个人认证状态
export const verify_account_3 = (data) => axios.get('Userapi/verify_account_3', data)

// organizations       十八、企业信息
export const organizations = (data) => axios.get('Userapi/organizations', data)

// create_organizations        十九、创建企业信息
export const create_organizations = (data) => axios.get('Userapi/create_organizations', data)
// 参数：name      企业名称     必填
// idType    证件类型     系统已经固定成 CRED_ORG_USCC  社会统一信用代码 
// idNumber  社会统一信用代码      必填
// orgLegalName    法人姓名        必填
// orgLegalIdNumber  法人身份证号  必填


// query_organizations     二十、更新企业信息
export const query_organizations = (data) => axios.get('Userapi/query_organizations', data)

// change_organizations        二十一、修改企业信息    参数：name-企业名称-必填
export const change_organizations = (data) => axios.get('Userapi/change_organizations', data)

// create_verify_organizations     二十二、创建认证流程
export const create_verify_organizations = (data) => axios.get('Userapi/create_verify_organizations', data)

// transfer_random_amount      二十三(1)、发起随机金额打款认证 
export const transfer_random_amount = (data) => axios.get('Userapi/transfer_random_amount', data)
// 参数：name      企业名称     必填
//           bank 对公账号开户行总行名称  必填             接口二十三(2)
//           regional 对公账号开户行所在地对应的code 必填  接口二十三(3)
//           subbranch 对公账号开户行支行名称全称 必填     接口二十三(4)
//           cardNo  银行卡号  必填
//           mobile 通知短信手机号  必填

// transfer_random_amount_detail   二十三(2)、对公账号开户行总行名称  列表
export const transfer_random_amount_detail = (data) => axios.get('Userapi/transfer_random_amount_detail', data)

// get_regional    二十三(3)、对公账号开户行所在地   分为省市两档
export const get_regional = (data) => axios.get('Userapi/get_regional', data)

// get_bank_name       二十三(4)、对公账号开户行支行名称全称   参数：term  搜索银行关键词   必填  注：多个关键词需要用英文空格隔开，如：杭州 平安银行
export const get_bank_name = (data) => axios.get('Userapi/get_bank_name', data)


// query_transfer_process      二十四、查询随机金额打款进度
export const query_transfer_process = (data) => axios.get('Userapi/query_transfer_process', data)


// verify_random_amount        二十五、随机金额校验    参数：amount 校验金额        必填  单位元  接口二十三(1)随机打款金额
export const verify_random_amount = (data) => axios.get('Userapi/verify_random_amount', data)

// query_verify_organizations      二十六、查询企业认证状态
export const query_verify_organizations = (data) => axios.get('Userapi/query_verify_organizations', data)

// pacc_type_detail type=1授信记录 2签约记录 3成功记录
export const pacc_type_detail = (data) => axios.get('Userapi/pacc_type_detail', data)
