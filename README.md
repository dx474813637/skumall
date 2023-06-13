=============>以wangpu项目为基础原型 重构

一、融资产品列表
    query_product_list
    
    
    返回json数据格式
        
        {"code":404,"exp":"yiqianbao_state_error"}  请先进行签约实名认证  接口十三
        {"code":200,"exp":"success",
         "data":[
         {"id":"1",
         "product_id":"3",                         ----融资产品ID
         "name":"\u6d59\u5546\u4e2a\u4eba\u8d37",  ----产品名
         "bank_name":"\u6d59\u5546\u94f6\u884c",   ----所属银行
         "credit_term":"12",                       ----授信期限 数字
         "credit_mode":"month",                    ----授信期限 单位
         "max_amount":"1000000",                   ----单户最高额度  单位元
         "loan_term":"12",                         ----贷款期限 数字  单位使用credit_mode参数
         "annualized":"5.5%",                      ----银行利率(年化)
         "status":"1",                             ----产品状态  1激活
         "remark":"\u6d59\u5546\u6d4b\u8bd5\uff08CZB03\uff09",  ---- 银行备注
         ......}
         {"id":"2"......},
         ]
        }
        
二、融资产品详情
    query_product_detail
    
    参数：product_id  融资产品ID 必填   (接口一获取)

    返回json数据格式   参考接口一参数解释
        {"id":"2",
         "zxrz_login":"wzh_loan",
         "product_id":"1",
         "display":"1",
         "zxrz_remark":"",
         "name":"\u820d\u4e50\u6d661",
         "bank_name":"\u6d66\u53d1\u94f6\u884c",
         "credit_term":"3",
         "credit_mode":"month",
         "max_amount":"",
         "loan_term":"",
         "annualized":"",
         "status":"1",
         "remark":"333","post_ip":"115.236.68.66",
         "poster_id":"manage_loan","ctime":"2023-02-27 13:54:36","post_time":"2023-03-28 10:26:16",
         "yiqianbao_state":"2"    ----在详情中发起授信申请时 需要 yiqianbao_state = 2  
        }

三(1)、预授信申请1
    pacc_detail
    
    参数：product_id  融资产品ID 必填  
    
    返回json数据格式
        {"product_id":"1",
         "imtoken":"883bb2e6b61e005f1af388f46c61fa86",  ----绑定码
         "bank_zxrz_product":    ----融资产品详情  参考接口一参数解释
            {"id":"2",
             "zxrz_login":"wzh_loan",
             "product_id":"1",
             "display":"1",
             "zxrz_remark":"",
             "name":"\u820d\u4e50\u6d661",
             "bank_name":"\u6d66\u53d1\u94f6\u884c","credit_term":"3","credit_mode":"month",
             "max_amount":"","loan_term":"","annualized":"","status":"1","remark":"333",
             ......
             },
          "platform_company":"\u6d59\u6c5f\u7f51\u76db\u878d\u8d44\u62c5\u4fdd\u6709\u9650\u516c\u53f8", ----公司名称
          "platform_reg":"91330000076212341B",        ----社会信用代码
          "platform_person":"\u5b59\u5fb7\u826f",     ----法定代表人姓名
          "platform_is_card":"330121197211258016"     ----法人身份证
          "have_bank_pacc_status":"1"         ----前一条授信状态等于1，2 您的预授信已申请，正在处理中，请勿重复提交。
                                              ----前一条授信状态等于5，6 您的预授信已通过，请勿重复提交。
         }

三(2)、预授信申请提交
    pacc
    
    参数：product_id  融资产品ID 必填
          platform_company 公司名称      必填  使用接口三(1)返回数据  用户不能自己填写
          platform_reg     社会信用代码  必填  使用接口三(1)返回数据  用户不能自己填写
          platform_person  法定代表人姓名 必填 使用接口三(1)返回数据  用户不能自己填写
          platform_is_card 法人身份证     必填 使用接口三(1)返回数据  用户不能自己填写
          platform_mobile  法人手机  必填
          imtoken'         绑定码  如果接口三(1)有返回则必填   使用接口三(1)返回数据  用户不能自己填写
          amount           申请金额（元） 必填
          termMonth        与核心企业合作月数 必填
          transAmt         上年度销售收入（元） 必填
          businessProvince 经营场所所在省份 必填  直接发送文字
          address          联系地址(公司具体联系地址)
          
          35个省级数据
          "北京市","天津市","河北省","山西省","内蒙古自治区","辽宁省" ,"吉林省" ,"黑龙江省" ,"上海市" ,"江苏省" ,"浙江省" ,"安徽省" ,"福建省" ,"江西省" ,"山东省" ,"河南省" ,"湖北省" ,"湖南省" ,"广东省" ,"广西壮族自治区","海南省" ,"重庆市" ,"四川省" ,"贵州省" ,"云南省" ,"西藏自治区","陕西省" ,"甘肃省" ,"青海省" ,"宁夏回族自治区" ,"新疆维吾尔自治区,"台湾省","香港特别行政区" ,"澳门特别行政区" 

          
    
    返回json数据格式
        {"code":201,"exp":"have_bank_pacc","error_msg":null}   您的预授信已申请或已通过，请勿重复提交
        {"code":202,"exp":"platform_company_null","error_msg":null}     公司名称为空
        {"code":203,"exp":"platform_reg_null","error_msg":null}         社会信用代码为空
        {"code":204,"exp":"platform_person_null","error_msg":null}
        {"code":205,"exp":"platform_is_card_null","error_msg":null}
        {"code":206,"exp":"platform_mobile_null","error_msg":null}
        {"code":207,"exp":"product_id_null","error_msg":null}
        {"code":208,"exp":"amount_null","error_msg":null}
        {"code":209,"exp":"termMonth_null","error_msg":null}
        {"code":210,"exp":"transAmt_null","error_msg":null}
        {"code":211,"exp":"businessProvince_null","error_msg":null}
        {"code":212,"exp":"address_null","error_msg":null}
        {"code":404,"exp":"ERROR","error_msg":"error_msg"}  授信申请失败，error_msg返回失败原因
        {"code":200,"exp":"SUCCESS","error_msg":null}       授信申请成功


35个省级数据
pacc_businessProvince

35个省级数据
          "北京市","天津市","河北省","山西省","内蒙古自治区","辽宁省" ,"吉林省" ,"黑龙江省" ,"上海市" ,"江苏省" ,"浙江省" ,"安徽省" ,"福建省" ,"江西省" ,"山东省" ,"河南省" ,"湖北省" ,"湖南省" ,"广东省" ,"广西壮族自治区","海南省" ,"重庆市" ,"四川省" ,"贵州省" ,"云南省" ,"西藏自治区","陕西省" ,"甘肃省" ,"青海省" ,"宁夏回族自治区" ,"新疆维吾尔自治区,"台湾省","香港特别行政区" ,"澳门特别行政区" 


四、授信申请列表
    pacc_query_list
    
    参数：p  页码             选填，默认1
          status  授信申请状态   选填  
              <{if $list[sec].status==1}><span class="">授信申请中</span>
              <{else if $list[sec].status==2}><span class="">授信已递交</span>
              <{else if $list[sec].status==4}><span class="">授信失败</span>
              <{else if $list[sec].status==5}><span class="">授信通过，签约中</span>
              <{else if $list[sec].status==6}><span class="">授信通过，贷款企业已签约</span>
              <{else if $list[sec].status==7}><span class="">授信通过，签约通过</span>
              <{else if $list[sec].status==8}><span class="">授信通过，贷款账户已激活</span>
              <{/if}>
    
    返回json数据格式
          {"curr_page":1,
           "page_record":1,       ----每页显示数量
           "status":null,         ----授信申请状态
           "pw_curr_page":1,      ----当前页面
           "pw_page_total":20,
           "pw_prev":0,
           "pw_next":2,
           "list":[{        ----列表数据
               "id":"20",               ----授信申请表ID
               "login":"sktsyh",
               "product_id":"3",
               "pacc_id":"21",
               "status":"8",            ----授信申请状态
               "amount":"110000",       ----申请额度 单位元
               "termMonth":"36",
               "transAmt":"2002011",
               "credit_amount":"30000.00",      ----审批额度 单位元
               "credit_beginDate":"2023-02-03", ----授信开始日
               "credit_endDate":"2024-02-02",   ----授信截止日
               "credit_termMonth":"12",         ----授信期限
               "credit_mode"::"month",          
               "bank_product_name":"bank_product_name"  ----银行产品名
               
          

五、授信申请详情
    pacc_query_detail
    
    参数：id    授信申请表ID     必填   接口四返回数据
     
    返回json数据格式   
        {"id":"20",                  ----授信申请表ID
         "login":"sktsyh",
         "product_id":"3",
         "pacc_id":"21",             ----hub授信ID
         "status":"8",               ----授信申请状态
         "pic_bankofsun":"http:\/\/upload.dev.bankofsun.cn\//642285d9a526d.jpeg",    ----微信二维码图片
         "platform_company":"\u676d\u5dde\u6d59\u7f51\u5546\u52a1\u6709\u9650\u516c\u53f8",
         "platform_reg":"9131000064221569XT",
         "platform_person":"\u751f\u610f\u4e00",
         "platform_is_card":"510101199301290017",
         "platform_mobile":"14552985661",
         "imtoken":"883bb2e6b61e005f1af388f46c61fa86",
         "amount":"110000",                    
         "termMonth":"36",
         "transAmt":"2002011",
         "businessProvince":"\u6d59\u6c5f\u7701",
         "address":"\u897f\u6e56\u533a",
         "remark":"3.28\u4e0b \u6d4b",
         "credit_amount":"30000.00",
         "credit_beginDate":"2023-02-03",
         "credit_endDate":"2024-02-02",
         "credit_termMonth":"12",
		 "errorText":"风险评级未通过",      ----授信失败原因
         ......
         "bank_zxrz":{                      ----融资产品详情  参考接口一参数解释
             "product_id":"3",
             "name":"\u6d59\u5546\u4e2a\u4eba\u8d37",  ----银行产品
             "bank_name":"\u6d59\u5546\u94f6\u884c",
             "credit_term":"12",
             "credit_mode":"month",
             "max_amount":"1000000",
             "loan_term":"12",
             "annualized":"5.5%",
             "status":"1",
             "remark":"\u6d59\u5546\u6d4b\u8bd5\uff08CZB03\uff09",
         },
         ----授信申请状态大于等于5，才会有file_286，file_287
         "file_286":{  ----《最高额担保服务协议书》
             "id":"5",
             "pdf_http":"http:\/\/upload.dev.bankofsun.cn\//6422869566199.pdf",   ----未签约文件
             "contract_id":"286",                                                 ----文件类型  286 最高额担保服务协议书
             "signflows_id":"247",                          ----签约流程ID  此ID大于0，表示已有签约流程
             "signflows_state":"3",                         ----签约状态 0-未提交 1-已创建 2-已开启 3-已归档(签约完成)
             "file_url":"http:\/\/upload.dev.channel.netsun.com/1423249945_success.pdf", ----签约成功文件地址  签约状态为3才有值
             "sign_ctime":"2023-03-28 14:29:55",            ----签约时间
             "remark":"",
             ......
         },
         "file_287":{《专项服务协议》
             "id":"6",
             "pdf_http":"http:\/\/upload.dev.bankofsun.cn\//64228696b6a5b.pdf",
             "contract_id":"287",                                               ----文件类型  287 专项服务协议
             ......
         }
        }


六、授信申请状态更新
    pacc_query
    
    参数：pacc_id  hub授信ID     必填  接口五获取
    
    
    返回json数据格式
          {"code":201,"exp":"pacc_id_null","error_msg":null}    pacc_id为空
          {"code":404,"exp":"ERROR","error_msg":"error_msg}     状态更新失败，原因error_msg
          {"code":200,"exp":"SUCCESS","error_msg":null}         状态更新成功，可以重新获取接口五数据

六(2)、查询可用余额
   query_loans_information
    
    参数：
          pacc_id  hub授信ID     必填  接口五获取
    
    
    返回json数据格式
          {"code":201,"exp":"ERROR","error_msg":error_msg}      pacc_id为空
          {"code":404,"exp":"ERROR","error_msg":"error_msg}     查询失败，原因error_msg
          {"code":200,"exp":"SUCCESS","money":money}            查询成功，余额 money  单位元


七(1)、文件开始签约
    yiqianbao_start
    
    参数：id    授信申请表ID     必填
          contract_id  286/287   必填
    
    返回json数据格式
         {"code":201,"exp":"pacc_null"}    授信申请不存在
         {"code":202,"exp":"file_null"}    授信申请签约文件不存在
         {"code":203,"exp":"pacc_status_null"}  授信申请状态错误
         {"code":404,"exp":"ERROR","error_msg":error_msg}  开始签约失败，原因error_msg
         {"code":200,"exp":"SUCCESS"}           开始签约成功
         
七(2)、取消/撤销签约   
    yiqianbao_cancel
    
    signflows_state = 1可以进行取消签约操作
    signflows_state = 2撤销签约操作
    
    参数：id    授信申请表ID     必填
          contract_id  286/287   必填
    
    返回json数据格式
         {"code":201,"exp":"pacc_null"}    授信申请不存在
         {"code":202,"exp":"state_error"}  签约状态不支持取消/撤销签约操作
         {"code":203,"exp":"signflows_id_error"}  文件签约流程错误
         {"code":404,"exp":"ERROR","error_msg":error_msg}  取消/撤销签约失败，原因error_msg
         {"code":200,"exp":"SUCCESS"}           取消/撤销签约成功

七(3)、更新签约状态
    query_signflows
    
    signflows_state = 2更新签约状态
    
    参数：
          id    授信申请表ID     必填
          contract_id  286/287   必填
    
    返回json数据格式
         {"code":201,"exp":"pacc_id_error"}       授信申请不存在
         {"code":202,"exp":"signflows_id_error"}  签约流程错误
         {"code":404,"exp":"ERROR","error_msg":error_msg}  更新签约失败，原因error_msg
         {"code":200,"exp":"SUCCESS"}           更新签约成功

八、融资请求列表
    order_bank_list
    
    参数：rz_status 融资支付状态 选填
          p  页码             选填，默认1
    
    返回json数据格式
    {"login":"sktsyh",
     "rz_status":null,
     "curr_page":1,
     "page_record":"1",
     "pw_page_total":13,
     "list":[              ----数据列表
         {"id":"13",                       ----融资支付ID
          "order_id":"1000943",            ----订单ID
          "loans_id":"94",                 ----融资ID
          "bank_product_id":"3",           ----融资产品ID
          "login":"sktsyh",                                                                           ----买家账号
          "buy_company":"\u6d59\u6c5f\u7f51\u76db\u878d\u8d44\u62c5\u4fdd\u6709\u9650\u516c\u53f8",   ----买家公司名
          "sell_login":"ceshi1123",                                                                   ----卖家账号
          "sell_company":"\u6d59\u6c5f\u7f51\u76db\u878d\u8d44\u62c5\u4fdd\u6709\u9650\u516c\u53f8",  ----卖家公司名
          "payee":"wzh_loan",
          "payee_service_login":"z00001",
          "price":"20",                               ----融资支付金额
          "pay_type":"2",                             
          "status":"1",                               ----订单支付状态 1等待支付5支付成功6支付失败
          "pay_time":"0000-00-00 00:00:00",           ----支付时间
          "rz_status":"4",    ----融资支付状态 1融资申请中 2流程暂停 3财务已拒绝 4放款机构已同意 5放款机构已拒绝 6提款成功 7提款失败
                                       融资支付状态等于2，可以重新发起融资支付请求  接口十一
          "remark":null,
          "errorText":"",     ----融资支付错误提示
          "product_name":"\u4ea7\u54c1\u6dfb\u52a0\u56fe\u7247,"   ----订单商品
          ......}]
      }
 
###======== bank_buy_all "我的"中返回金额
		 
		{"code":201,"exp":"login_null"}    账号不能为空
				{"code":202,"exp":"account_error"} 个人未认证
				{"code":203,"exp":"organizations_error","account":""} 企业未认证，返回个人认证信息
				{"code":204,"exp":"bank_pacc_error","account":"account","organizations":"organizations"} 
											无审批通过的授信，返回个人+企业认证信息
				{"code":205,"exp":"bank_bind_error","account":"account","organizations":"organizations","bank_pacc":"bank_pacc"} 
											无zxrz账号绑定信息或者无账号绑定信息，返回个人+企业认证信息+授信信息
				{"code":200,"exp":"success","account":"account","organizations":"organizations","bank_pacc":"bank_pacc","maxLoanAmount":"maxLoanAmount"} 
											成功，返回个人+企业认证信息+授信信息+可用余额
				
				account 参数参考十三、个人信息
				organizations 十八、企业信息
				bank_pacc 五、授信申请详情
				maxLoanAmount  可用余额  单位:元
		
九、融资请求详情
    order_bank_detail
    
    参数：id    融资支付ID       必填
    
    返回json数据格式
        {"id":"13",
         "order_id":"1000943",
         "loans_id":"94",
         "bank_product_id":"3",
         "login":"sktsyh",
         "buy_company":"\u6d59\u6c5f\u7f51\u76db\u878d\u8d44\u62c5\u4fdd\u6709\u9650\u516c\u53f8",
         "sell_login":"ceshi1123",
         "sell_company":"\u6d59\u6c5f\u7f51\u76db\u878d\u8d44\u62c5\u4fdd\u6709\u9650\u516c\u53f8",
         "payee":"wzh_loan",
         "payee_service_login":"z00001",
         "price":"20",
         "pay_type":"2",
         "status":"1",
         "pay_time":"0000-00-00 00:00:00",
         "rz_status":"4",
         "remark":null,
         "errorText":"",
		 "repaymentInfoList":{  ----  如果是浙商银行  <{if $bank_zxrz.bank_name == "浙商银行" }>      --2023.4.14新加
		               [
		                  {   
		                   "totalAmount":"310.44",   ---- 如果$repaymentInfoList[0]['totalAmount'] > 0  表示已经还款
		                   "amount":"310.00",
		                   ......
		                   },
		               ]
		           }
         "order":{             ----订单详情  参考 用户订单相关接口文档中的  接口三、订单详情
             "id":"1000943",
             "login":"sktsyh",
             "buy_name":"\u5e73\u5b89\u6d4b\u8bd5\u4e13\u752816",
             "sell_login":"ceshi1123",
             "c_name":"\u676d\u5dde\u6709\u610f\u601d\u6d4b\u8bd5\u6709\u9650\u516c\u53f81",
             "cid":"65180",
             "product_names":"\u4ea7\u54c1\u6dfb\u52a0\u56fe\u7247,"
             ......
           },
          "bank_zxrz":{       ----融资产品详情信息  参考 接口一
              "id":"1","zxrz_login":"wzh_loan","product_id":"3","display":"1",
              "zxrz_remark":"",
              "name":"\u6d59\u5546\u4e2a\u4eba\u8d37",
              "bank_name":"\u6d59\u5546\u94f6\u884c",
              "credit_term":"12",
              "credit_mode":"month",
              "max_amount":"1000000",
              "loan_term":"12",
              "annualized":"5.5%",
              "status":"1",
              "remark":"\u6d59\u5546\u6d4b\u8bd5\uff08CZB03\uff09",
              ......
              },
          "bank_account":{    ----卖家银行账号信息
              "subbranch":"\u6d4b\u8bd5\u5f00\u6237\u884c\u540d\u79f0",  ----受托支付账户开户行
              "cardNo":"1122332023016",                                  ----受托支付账户开户行       
              ......
              },
          "bank_pacc":{      ----授信申请详情  参考  接口五
              "id":"20",
              "pic_bankofsun":"http:\/\/upload.dev.bankofsun.cn\/hub\/czb_qr_code\/2023\/03\/28\/6d\/642285d9a526d.jpeg",
              "platform_company":"\u676d\u5dde\u6d59\u7f51\u5546\u52a1\u6709\u9650\u516c\u53f8",
              "platform_reg":"9131000064221569XT",
              "platform_person":"\u751f\u610f\u4e00",
              "platform_is_card":"510101199301290017",
              "platform_mobile":"14552985661",
              ......
              }
          }
九(2)、还款信息查询 
    loans_repayment_query
    
    参数：
          order_id  订单ID       必填
    
    返回json数据格式
         {"code":201,"exp":"order_error","error_msg":null} 订单错误
         {"code":404,"exp":"ERROR","error_msg":error_msg}  查询失败，原因error_msg
         {"code":200,"exp":"SUCCESS","error_msg":null}     查询成功

十、融资请求状态更新
    order_bank_query
    
    参数：order_id  订单ID       必填
    
    返回json数据格式
         {"code":201,"exp":"order_error","error_msg":null} 订单错误
         {"code":404,"exp":"ERROR","error_msg":error_msg}  状态更新失败，原因error_msg
         {"code":200,"exp":"SUCCESS","error_msg":null}     状态更新失败成功


十一、发起融资支付   融资支付订单只能是货到付款
    rz_pay
    
    参数：order_id  订单ID       必填
    
    返回json数据格式
        {"code":201,"exp":"order_state_error","error_msg":null}   订单状态错误
        {"code":202,"exp":"bank_pacc_error","error_msg":null}     买家授信申请未审核通过
        {"code":203,"exp":"bank_buy_sell_error","error_msg":null} 卖家受托支付账户未审核通过
        {"code":204,"exp":"bank_bind_error","error_msg":null}     zxrz账号未设置业务(hub)账号
        {"code":205,"exp":"bank_bind_buy_error","error_msg":null} 买家未绑定hub
        {"code":206,"exp":"maxLoanAmount_zero","error_msg":null}  融资可用余额不足
        {"code":404,"exp":"ERROR","error_msg":error_msg}          融资支付失败，原因error_msg
        {"code":200,"exp":"SUCCESS","error_msg":null}             资支付成功
        


十二、融资支付订单 确认收货
    rz_check_tran
    
    参数：order_id  订单ID       必填
    
    返回json数据格式
        {"code":201,"exp":"state_error"}    订单状态错误
        {"code":202,"exp":"pay_tool_error"} 订单支付工具错误
        {"code":404,"exp":"failed"} 确认收货失败
        {"code":200,"exp":"successful"}     确认收货成功


------认证签约部分
    先创建信息，然后去认证操作，最后认证成功

十三、个人信息
    account
    
    参数：
    
    返回json数据格式
        {"id":"12",
         "login":"sktsyh",
         "account_id":"10000061",            ----E签宝个人信息ID
         "name":"\u6c88\u51ef\u5a77",        ----姓名
         "idType":"CRED_PSN_CH_IDCARD",      ----证件类型  
                     CRED_PSN_CH_IDCARD 中国大陆身份证
					 CRED_PSN_CH_TWCARD 台湾来往大陆通行证
                     CRED_PSN_CH_MACAO  澳门来往大陆通行证
                     CRED_PSN_CH_HONGKONG 香港来往大陆通行证
                     CRED_PSN_PASSPORT 护照

         "idNumber":"3302**********2326",    ----证件号码
         "mobile":"135****0052",             ----手机号码
         "email":"",
         "state":"2",                        ----认证状态  0未创建 1未认证 2已认证 3已注销
         "ctime":"2021-06-11 08:19:35",      ----创建时间
         "post_time":"2023-02-10 11:09:34",
         "sinopay_type":"B",             ----sinopay类型，如果有sinopay_type，B能认证个人成功之后再去认证企业，C只能认证个人
         "organizations_id":"20000051"   ----企业认证信息ID  如果ID小于等于0表示  您还未认证企业，认证企业 
         }

十四、创建个人信息
    create_account
    
    参数：name      姓名         必填
          idType    证件类型     必填
          idNumber  证件号       必填
          mobile    手机号码     选填
          email     电子邮箱     选填

    证件类型
    CRED_PSN_CH_IDCARD 中国大陆身份证
    CRED_PSN_CH_TWCARD 台湾来往大陆通行证
    CRED_PSN_CH_MACAO  澳门来往大陆通行证
    CRED_PSN_CH_HONGKONG 香港来往大陆通行证
    CRED_PSN_PASSPORT 护照
    
    返回json数据格式
        {"code":201,"exp":"name_null","error_msg":null}     姓名为空
        {"code":202,"exp":"idType_null","error_msg":null}   证件类型为空
        {"code":203,"exp":"idNumber_null","error_msg":null} 证件号为空
        {"code":404,"exp":"ERROR","error_msg":"error_msg"}  创建失败，原因error_msg
        {"code":200,"exp":"SUCCESS","error_msg":null}       创建成功

十五、更新个人信息
    query_account
    
    参数：
    
    返回json数据格式
        {"code":201,"exp":"account_null","error_msg":null}  个人信息不存在，请先创建个人信息
        {"code":404,"exp":"ERROR","error_msg":"error_msg"}  更新操作失败，原因error_msg
        {"code":200,"exp":"SUCCESS","error_msg":null}       更新操作成功

十六、修改个人信息
    change_account
    
    参数：name      姓名         必填
          mobile    手机号码     选填
          email     电子邮箱     选填
    
    返回json数据格式
        {"code":201,"exp":"name_null","error_msg":null}     姓名为空
        {"code":202,"exp":"state_error","error_msg":null}   个人信息状态错误，只有状态为1未认证才能修改
        {"code":404,"exp":"ERROR","error_msg":"error_msg"}  修改失败，原因error_msg
        {"code":200,"exp":"SUCCESS","error_msg":null}       修改成功
    
十七(1)、发起个人认证
    verify_account
    
    参数：name      姓名         必填
          mobile    手机号码     必填
          code    手机验证码     必填  接口十七(2)获取
    
    返回json数据格式
        {"code":201,"exp":"account_null","error_msg":null}  个人信息不存在，请先创建个人信息
        {"code":404,"exp":"ERROR","error_msg":"error_msg"}  发起认证失败，原因error_msg
        {"code":200,"exp":"SUCCESS","error_msg":null}       发起认证成功

十七(2)、获取个人认证手机验证码
    get_mobile_code
    
    参数：name      姓名         必填
          mobile    手机号码     必填
          
    返回json数据格式
        {"code":201,"exp":"account_null","error_msg":null}  个人信息不存在，请先创建个人信息
        {"code":404,"exp":"ERROR","error_msg":"error_msg"}  获取验证码失败，原因error_msg
        {"code":200,"exp":"SUCCESS","error_msg":null}       获取验证码成功

十七(3)、更新个人认证状态
    verify_account_3
    
    参数：
          
    返回json数据格式
        {"code":201,"exp":"account_null","error_msg":null}  个人信息不存在，请先创建个人信息
        {"code":404,"exp":"ERROR","error_msg":"error_msg"}  更新失败，原因error_msg
        {"code":200,"exp":"SUCCESS","error_msg":null}       更新成功


十八、企业信息
    organizations
    
    参数：
          
    返回json数据格式
        {"id":"27",    
        "login":"sktsyh",
        "account_id":"10000061",
        "organizations_id":"20000051",         ----E签宝公司信息ID
        "name":"\u6d59\u6c5f\u7f51\u76db",     ----公司名称
        "idType":"CRED_ORG_USCC",              ----证件类型   统一社会信用代码
        "idNumber":"91330000076212341B",       ----统一社会信用代码
        "orgLegalName":"\u5b59\u5fb7\u826f",   ----法人姓名
        "orgLegalIdNumber":"3301**********8016",----法人身份证
        "state":"2",                           ----认证状态  0未创建 1未认证 2已认证 3已注销
        "organizations_auth_record_id":"25",   ----企业认证流程ID
        "auth_record_state":"2",               ----企业认证流程0待认证  1认证发送中  2认证成功 3 认证失败 4 认证中
        "deadline":"0000-00-00 00:00:00",
        "ctime":"2021-06-11 08:52:38",         ----创建时间
        "post_time":"2022-06-10 16:12:09",     
        "account_state":"2"                    ----个人认证状态  0未创建 1未认证 2已认证 3已注销  只有个人认证通过之后才能认证企业
        }


十九、创建企业信息
    create_organizations
    
    参数：name      企业名称     必填
          idType    证件类型     系统已经固定成 CRED_ORG_USCC  社会统一信用代码 
          idNumber  社会统一信用代码      必填
          orgLegalName    法人姓名        必填
          orgLegalIdNumber  法人身份证号  必填
    
    返回json数据格式
        {"code":201,"exp":"name_null","error_msg":null}             企业名称为空
        {"code":202,"exp":"account_state_error","error_msg":null}   个人还未认证通过
        {"code":204,"exp":"idNumber_null","error_msg":null}         社会统一信用代码为空
        {"code":205,"exp":"orgLegalName_null","error_msg":null}     法人姓名为空
        {"code":206,"exp":"orgLegalIdNumber_null","error_msg":null} 法人身份证为空
        {"code":404,"exp":"ERROR","error_msg":"error_msg"}          创建失败，原因error_msg
        {"code":200,"exp":"SUCCESS","error_msg":null}               创建成功

二十、更新企业信息
    query_organizations
    
    参数：
    
    返回json数据格式
        {"code":404,"exp":"ERROR","error_msg":"error_msg"}  更新操作失败，原因error_msg
        {"code":200,"exp":"SUCCESS","error_msg":null,"state":"2"}       更新操作成功，最新认证状态state

二十一、修改企业信息
    change_organizations
    
    参数：name      企业名称     必填
    
    返回json数据格式
        {"code":201,"exp":"name_null","error_msg":null}             企业名称为空
        {"code":202,"exp":"organizations_state_error","error_msg":null}  信息状态错误，只有状态为1未认证才能修改
        {"code":404,"exp":"ERROR","error_msg":"error_msg"}    修改失败，原因error_msg
        {"code":200,"exp":"SUCCESS","error_msg":null}         修改成功

二十二、创建认证流程
    create_verify_organizations
    
    参数：
    
    返回json数据格式
        {"code":201,"exp":"organizations_error","error_msg":null}   企业信息为空，请先创建企业信息
        {"code":404,"exp":"ERROR","error_msg":"error_msg"}    创建失败，原因error_msg
        {"code":200,"exp":"SUCCESS","error_msg":null}         创建成功
    

二十三(1)、发起随机金额打款认证  
    transfer_random_amount
    
    参数：name      企业名称     必填
          bank 对公账号开户行总行名称  必填             接口二十三(2)
          regional 对公账号开户行所在地对应的code 必填  接口二十三(3)
          subbranch 对公账号开户行支行名称全称 必填     接口二十三(4)
          cardNo  银行卡号  必填
          mobile 通知短信手机号  必填
    
    返回json数据格式
        {"code":201,"exp":"name_null","error_msg":null}             企业名称为空
        {"code":202,"exp":"bank_null","error_msg":null}             对公账号开户行总行名称
        {"code":203,"exp":"regional_null","error_msg":null}         对公账号开户行所在地为空
        {"code":204,"exp":"subbranch_null","error_msg":null}        对公账号开户行支行名称全称为空
        {"code":205,"exp":"cardNo_null","error_msg":null}           银行卡号为空
        {"code":206,"exp":"mobile_null","error_msg":null}           通知短信手机号为空
        {"code":207,"exp":"organizations_auth_record_id_null","error_msg":null}    认证流程未创建，请先创建
        {"code":404,"exp":"ERROR","error_msg":"error_msg"}    打款认证操作失败，原因error_msg
        {"code":200,"exp":"SUCCESS","error_msg":null}         打款认证操作成功
        


二十三(2)、对公账号开户行总行名称  列表
    transfer_random_amount_detail
    
    参数：
    
    返回json数据格式
    {"bank_list":[
        {"id":"104",
        "name":"\u978d\u5c71\u94f6\u884c",  ----总行名称 
        "state":"1",
        ......
        },]
    }
        
二十三(3)、对公账号开户行所在地   分为省市两档
    get_regional
    
    参数：
    
    返回json数据格式
        {"items":[{"code":"11","name":"\u5317\u4eac"},{"code":"12","name":"\u5929\u6d25"}......],
         "items11":[{"code":"1101","name":"\u5317\u4eac\u5e02"}],
         "items1101":[{"code":"110101","name":"\u4e1c\u57ce\u533a"},{"code":"110102","name":"\u897f\u57ce\u533a"},],
         "items12":[{"code":"1201","name":"\u5929\u6d25\u5e02"}],
         "items1201":[{"code":"120101","name":"\u548c\u5e73\u533a"},{"code":"120102","name":"\u6cb3\u4e1c\u533a"},],
         ......
        }

二十三(4)、对公账号开户行支行名称全称   
    get_bank_name
    
    参数：term  搜索银行关键词   必填  注：多个关键词需要用英文空格隔开，如：杭州 平安银行
    
    返回json数据格式
        [
         {"bank_name":"\u5e73\u5b89\u94f6\u884c\u676d\u5dde\u6c5f\u5357\u5c0f\u5fae\u4f01\u4e1a\u4e13\u8425\u652f\u884c"},
         {"bank_name":"\u5e73\u5b89\u94f6\u884c\u676d\u5dde\u51e4\u8d77\u652f\u884c"},
         {"bank_name":"\u5e73\u5b89\u94f6\u884c\u676d\u5dde\u94b1\u6c5f\u5c0f\u5fae\u4f01\u4e1a\u4e13\u8425\u652f\u884c"},
         ......
        ]

二十四、查询随机金额打款进度
    query_transfer_process
    
    参数：
    
    返回json数据格式
      {"code":404,"exp":"ERROR","errorMsg":"errorMsg"}  查询失败，原因errorMsg
      {"code":200,
       "exp":"SUCCESS",
       "info":{
           "process":"ORGANFINISHED",    ----打款进度标识 
               process == "INIT"  完成企业信息比对，但未发起打款
							 process == "PAID" 打款申请完成
							 process == "PAID_FAILED" 打款失败
							 process == "PAID_SUCCESS" 打款成功
							 process == "ORGANFINISHED" 打款回填成功，企业认证完成
           "cardNo":"15000098085684",    ----发起时打款对公账号信息
           "subbranch":"\u5e73\u5b89\u94f6\u884c", ---- 对公账号所在银行名称
           "bankName":"\u5e73\u5b89\u94f6\u884c",
           "foresee":"06-14",            ----预计最晚到款日期
           "message":"\u6253\u6b3e\u7533\u8bf7\u6210\u529f",   ----打款进度附件描述信息
           "bizFlowNo":"2021061620853410"        ----交易流水号
           ......
          }
         }

二十五、随机金额校验 
    verify_random_amount
    
    参数：amount 校验金额        必填  单位元  接口二十三(1)随机打款金额
    
    返回json数据格式
        {"code":201,"exp":"organizations_auth_record_id_error","error_msg":null}   认证流程未创建，请先创建
        {"code":404,"exp":"ERROR","error_msg":"error_msg"}    金额校验失败，原因error_msg
        {"code":200,"exp":"SUCCESS","error_msg":null}         金额校验成功

二十六、查询企业认证状态
    query_verify_organizations
    
    参数：
          
    返回json数据格式
        {"code":404,"exp":"ERROR","error_msg":"error_msg"}  查询状态失败，原因error_msg
        {"code":200,"exp":"SUCCESS","error_msg":null,"auth_record_state":"2"}       查询状态成功,最新状态值auth_record_state

=======================>