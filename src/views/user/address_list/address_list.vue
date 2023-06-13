<template>
	<div class="u-p-10">
		<el-button 
			type="primary" 
			plain  
			@click="handleShowAddBox"
			>新增地址</el-button>
	</div>
	<template v-if="list.length > 0">
		<div class="content-list-wrap u-flex u-flex-wrap u-flex-items-start">
			<div class="list-item" v-for="item in list" :key="item.id">
				<el-card shadow="hover" class="box-card">
					<template #header>
						<div class="header-w u-flex u-flex-between u-flex-items-end">
							<div class="h-item u-flex">
								<div class="header-name">{{item.name}}</div> 
							</div>
							<div class="h-item card-btns u-flex u-flex-between">
								<!-- <div class="h-i-btn set-default-btns" v-if="item.auto != '1'">
									<el-button type="text" class="u-p-0" @click="setDefaultAddr(item)">设为默认地址</el-button>
								</div> -->
								<div class="h-i-btn " >
									<el-switch 
										size="large" 
										inline-prompt
										v-model="item.auto" 
										active-color="#ff0000" 
										:active-value="1" 
										:inactive-value="0"
										active-text="默认地址"
										inactive-text="设置默认" 
										:loading="addrLoading" 
										:before-change="() => beforeAutoAddressChange(item)"
										/> 
								</div>
								<div class="h-i-btn">
									<el-button type="text" class="u-p-0" @click="editAddr(item)">编辑</el-button>
								</div>
								<!-- <div class="h-i-btn">
									<el-popconfirm placement="bottom-end" title="确认删除该收货地址？" class="u-p-0"
										@confirm="deletAddr(item)">
										<el-button slot="reference" class="u-p-0" type="text">删除</el-button>
									</el-popconfirm>

								</div> -->

							</div>
						</div>

					</template>
					<div class="item card-content">
						<!-- <el-row type="flex">
							<el-col class="label" :span="5">收货人</el-col>
							<el-col :span="19">{{item.name}}</el-col>
						</el-row> -->
						<el-row type="flex">
							<el-col class="label" :span="5">所在地区</el-col>
							<el-col :span="19">{{item.regional_name}}</el-col>
						</el-row>
						<el-row type="flex">
							<el-col class="label" :span="5">详细地址</el-col>
							<el-col :span="19">{{item.address}}</el-col>
						</el-row>
						<el-row type="flex">
							<el-col class="label" :span="5">联系电话</el-col>
							<el-col :span="19">{{item.mobile}}</el-col>
						</el-row>
					</div>
				</el-card>
			</div>
		</div>
		
	</template>
	
	<template v-else>
		<div class="u-flex u-flex-center u-p-t-40 u-p-b-40">
			<el-empty description="列表为空"></el-empty>
		</div>
	</template>
	<div class="list-page-box u-p-t-20 u-p-b-20">
        <el-pagination
            v-model:current-page="curP"
            v-model:page-size="pageSize"
            small
            background
            layout="prev, pager, next, slot"
            :total="total" 
        >
            <span class="u-p-l-10">共 {{ total }} 条数据</span>
        </el-pagination>
    </div> 
	<el-dialog title="编辑收货地址" v-model="dialogFormVisible" @close="handleResetForm(ruleForm)" @open="() => {ruleForm.clearValidate()}">
		<el-form :model="addrForm" :rules="rules" ref="ruleForm" label-width="100px">
			<el-form-item label="收货人" prop="name">
				<el-input v-model="addrForm.name"></el-input>
			</el-form-item>
			<el-form-item label="联系方式" prop="mobile">
				<el-input v-model="addrForm.mobile"></el-input>
			</el-form-item>
			<el-form-item label="所在地区" prop="regional_name"> 
				<el-cascader 
					style="width: 100%;"
					v-model="addrForm.regional_name" 
					@change="value=> console.log(value)"
					:options="regional_list"   
					placeholder="请选择"
					:props="{
						value: 'id',
						label: 'value',
						children: 'childs'
					}"
				></el-cascader>
			</el-form-item>
			<el-form-item label="详细地址" prop="address">
				<el-input type="textarea" v-model="addrForm.address"></el-input>
			</el-form-item>
			<el-form-item label="设为默认" prop="auto">
				<el-switch 
					v-model="addrForm.auto"
					:active-value="1"
					:inactive-value="0"
					></el-switch>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="handleChangeDialogShow(ruleForm)">取 消</el-button>
			<el-button type="primary" @click="submitForm(ruleForm)">确 定</el-button>
		</div>
	</el-dialog>

</template>

<script setup lang='ts'>
import { reactive, ref, inject, nextTick, onMounted, toRefs  } from 'vue'
import { ElNotification, ElMessage } from 'element-plus' 
import { cateStore } from '@/stores/cate'
const cate = cateStore()
const { regional_list } = toRefs(cate)

const $api: any = inject('$api')
let list = ref([])
const curP = ref(1);
const pageSize = ref(20)
const total = ref(0); 
const addressLoading = ref(false)
const dialogFormVisible = ref(false)
async function getData() {
	const res = await $api.addresss_list({params: {
		p: curP.value,
	} });
	if(res.code == 1) {
		list.value = res.list.list.filter(ele => ele.id != -1);
		total.value = res.list.pw_rec_total;
	}
}
const addrForm = reactive({
	name: '',
	mobile: '',
	id: '',
	regional_name: '',
	address: '',
	auto: 0,
})
const rules = {
	name: [{
		required: true,
		message: '请输入收货人姓名',
		trigger: ['blur', 'change']
	}],
	mobile: [{
		required: true,
		message: '请输入手机号',
		trigger: ['blur', 'change']
	}],
	regional_name: [{
		required: true,
		message: '请选择地区',
		trigger: ['blur', 'change']
	}],
	address: [{
		required: true,
		message: '请输入详细地址',
		trigger: ['blur', 'change']
	}],
}
onMounted(async () => {
	cate.getRegionalData()
	await getData() 
})
const ruleForm = ref()
const addressChange = async (item) => {
	return await $api.address_change({
		params: {
			...item,
			auto: 1 - item.auto,
			address_id: item.id
		}
	})
}
const beforeAutoAddressChange = async (item) => {
    addressLoading.value = true  
	let flag = item.auto == 0? true: false
    return new Promise(async (resolve, reject)=>{
        // console.log(item)
        let res = await addressChange(item) 
        addressLoading.value = false
        if(res.code == 1) {  
			if(flag) {
				let i = list.value.findIndex(ele => ele.auto == 1 && ele.id != item.id); 
				list.value[i].auto = 0
			}
            ElNotification({
                title: '系统消息',
                message: res.msg,
                type: 'success',
                position: 'bottom-right',
            })
            return resolve(true)
        }else { 
            ElNotification({
                title: '系统消息',
                message: res.msg,
                type: 'success',
                position: 'bottom-right',
            })
            return resolve(false)
        } 
    })
    
}



const handleResetForm = (formName) => {
	// console.log(formName)
	renderFormData({
		regional: ""
	})
	formName.clearValidate()
	nextTick(() => {
		formName.clearValidate()
	})
	
}

function renderFormData(data) {
	let regional = data.regional //.toString(); 
	let newArr = []
	for (let i = 0; i < regional.length ;) {
		newArr.push(regional.slice(0,i+=2))
	} 
	addrForm.id = data.id
	addrForm.mobile = data.mobile
	addrForm.name = data.name
	addrForm.regional_name = newArr
	addrForm.address = data.address
	addrForm.auto = data.auto 
}
function editAddr(data) {
	renderFormData(data)
	handleChangeDialogShow(ruleForm)
}
function handleChangeDialogShow(formName) {
	dialogFormVisible.value = !dialogFormVisible.value
	if (!dialogFormVisible.value) {
		handleResetForm(formName)
	}
}
function submitForm(formName) {
	formName.validate(async (valid) => {
		if (valid) { 
			let res = await handleChangeAddr()
			if(res.code != 1) return;
			ElMessage.success(res.msg) 
			handleChangeDialogShow(formName)
			await getData()
		} else {
			console.log('error submit!!');
			return false;
		}
	});
}
async function handleChangeAddr() {
	let addr = addrForm
	return await $api.address_change({
		params: {
			name: addr.name,
			mobile: addr.mobile,
			regional: addr.regional_name[addr.regional_name.length - 1],
			address: addr.address,
			address_id: addr.id,
			auto: addr.auto ,
		},
	})
}
function handleShowAddBox() {
	renderFormData({
		regional: "",
	})
	handleChangeDialogShow()
}
</script>
<style lang='scss' scoped>
.content-list-wrap {
	@extend %box-sizing;
	padding: 10px 10px;

	.list-item {
		width: 49%;
		flex: 0 0 49%;
		margin-bottom: 1%;

		&:nth-of-type(2n) {
			margin-left: 2%;
		}

		.box-card {
			.set-default-btns {
				display: none;

				.el-button {
					color: #ff0000;
				}
			}

			&:hover {
				.set-default-btns {
					display: block;
				}
			}
		}

		.header-w {
			height: 28px;

			.header-name {
				font-size: 1.2rem;
			}
		}
	}
} 
.h-i-btn {
	padding: 0;
	margin-left: 10px;
	height: 100%;

	&:first-child {
		margin-left: 0;
	}
}

.card-content {
	.el-row {
		padding-bottom: 8px;
		font-size: 15px;

		.label {
			color: #888;
			font-size: 14px;
		}
	}
}
</style>