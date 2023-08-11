<!--  -->
<template>
	<div class="u-p-10" style="box-sizing: border-box;">
		<el-form
			:model="form"
			:rules="rules"
			ref="userForm"
			label-width="240px"
		>
			
			<el-form-item label="融资产品ID" prop="product_id">
				<el-cascader
					style="width: 100%"
					placeholder="请选择（可输入关键字筛选）"
					:options="product_list"
					v-model="form.product_id"
					:props="{
						label: 'name',
						value: 'product_id',
					}"
					filterable
				/>
			</el-form-item>
			<el-form-item label="收款方公司名称" prop="company">
				<el-input v-model="form.company"></el-input>
			</el-form-item>
			<el-form-item label="收款方公司统一社会信用代码" prop="company_reg">
				<el-input v-model="form.company_reg"></el-input>
			</el-form-item>
			<el-form-item label="收款方银行账户名称" prop="name">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="收款方银行总行名称" prop="bank_name">
				<el-cascader
					style="width: 100%"
					placeholder="请选择（可输入关键字筛选）"
					:options="bank_list"
					v-model="form.bank_name"
					:props="{
						label: 'name',
						value: 'name',
					}"
					filterable
				/>
			</el-form-item>
			<el-form-item label="收款方银行卡号" prop="cardNo">
				<el-input v-model="form.cardNo"></el-input>
			</el-form-item>
			<el-form-item label="收款方银行账户开户行名称" prop="subbranch">
				<el-select
					style="width: 100%"
					v-model="form.subbranch" 
					filterable
					remote 
					clearable
					placeholder="输入银行关键字筛选列表，如：“平安 杭州” 地区名+空格+银行关键字的组合"
					remote-show-suffix
					:remote-method="(query:String) => debounce(remoteMethod, 800, false, query)"
					:loading="loading"
					loading-text="正在请求数据中"
					no-data-text="无匹配数据"
					@change="onBankChange"
				>
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					/>
				</el-select>
			</el-form-item>
			<el-form-item label="收款方开户行银行编码" prop="cnapsCode">
				<el-input readonly v-model="form.cnapsCode" placeholder="请先选择“收款方银行账户开户行名称”"></el-input>
			</el-form-item>
			<el-form-item label="用户审核状态" prop="state">
				<el-switch 
					v-model="form.state" 
					active-value="1"
					active-text="激活" 
					/>
			</el-form-item>
			<el-form-item label="借款人ID" prop="id" v-if="props.id">
				<el-input v-model="form.id" readonly></el-input>
			</el-form-item>
			<el-form-item label="来往交易图片" prop="pic_list" v-if="!props.id">
				<el-upload 
					ref="pic_list" 
					action=""  
					:class="{
						limit: form.pic_list.length == 2
					}"  
					v-model:file-list="form.pic_list"
					list-type="picture-card" 
					:headers="configHeader"  
					:http-request="(options) => upload(options, form.pic_list) "
					:before-upload="beforeUpload"
					:limit="2"
					>
					<el-icon>
						<i-ep-Plus />
					</el-icon>

					<template #file="{ file }">
						<div>
							<img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
							<span class="el-upload-list__item-actions">
								<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
									<el-icon><i-ep-ZoomIn /></el-icon>
								</span>
								<span v-if="!disabled" class="el-upload-list__item-delete"
									@click="handleRemove(file, undefined, 'pic_list')">
									<el-icon>
										<i-ep-Delete />
									</el-icon>
								</span>
							</span>
						</div>
					</template>
				</el-upload>
			</el-form-item> 
			<el-form-item label="备注" prop="remark">
				<el-input v-model="form.remark"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm(userForm)"
					>提交</el-button
				>
				<!-- <el-button @click="resetForm('form')">重置</el-button> -->
			</el-form-item>
		</el-form>
	</div>
    <el-dialog v-model="dialogVisible">
        <img w-full style="width: 100%" :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, inject, onMounted, toRefs, watch } from "vue";
import { useFinanceStore } from "@/stores/finance"; 
import router from "@/router/guard";
import debounce from "@/utils/debounce"
const finance = useFinanceStore();
const { bank_list, no_order_buyer } = toRefs(finance);
import { userStore } from "@/stores/user";
import { ElNotification, ElMessage } from "element-plus";
import { baseStore } from '@/stores/main'
const { configHeader, beforeUpload, getImageBase64_readFile } = baseStore()
const user = userStore();
const { cpy_info } = toRefs(user);
const $api: any = inject("$api");
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const props = defineProps({
	id: {
		type: String,
		default: ''
	}
})
const options = ref<ListItem[]>([]); 
const product_list = ref([])
const loading = ref(false);

onMounted(async () => { 
	checkNoOrderBuyerState()

	if(props.id) {
		await getDetail()
	}
	getBankProduct()
	if (bank_list.value.length == 0) {
		finance.getBankListData();
	}
});

const getBankProduct = async () => {
	const res = await $api.query_product_list({ loading: false })
	if (res.code == 1) {
		product_list.value = res.list.data 
	}
}
const form = reactive({
	product_id: "", 
	company: "", 
	company_reg: "", 
	name: "",
	bank_name: "",
	cardNo: "",
	subbranch: "",
	cnapsCode: "",
	state: "1",
	id: "",
	remark: "",
	pic_list: [], 
	pic1: "",
	pic2: "",
	pic3: "",
	pic4: "",
	pic5: "",
});
const userForm = ref();
const rules = {
	product_id: [
		{
			required: true,
			message: "请输入融资产品ID",
			trigger: ["blur", "change"],
		},
	], 
	company: [
		{
			required: true,
			message: "请输入公司名称",
			trigger: ["blur", "change"],
		},
	], 
	company_reg: [
		{
			required: true,
			message: "请输入收款方公司统一社会信用代码",
			trigger: ["blur", "change"],
		},
	], 
	name: [
		{
			required: true,
			message: "请输入收款方银行账户名称",
			trigger: ["blur", "change"],
		},
	], 
	bank_name: [
		{
			required: true,
			message: "请输入收款方银行总行名称",
			trigger: ["blur", "change"],
		},
	], 
	cardNo: [
		{
			required: true,
			message: "请输入收款方银行卡号",
			trigger: ["blur", "change"],
		},
	], 
	subbranch: [
		{
			required: true,
			message: "请输入收款方银行账户开户行名称",
			trigger: ["blur", "change"],
		},
	], 
	cnapsCode: [
		{
			required: true,
			message: "请输入收款方开户行银行编码",
			trigger: ["blur", "change"],
		},
	],  
};
async function getDetail() {
	const res = await $api.no_order_white_sell_detail({params: {id: props.id}})
	if(res.code == 1) {
		form.product_id = [res.list.product_id]
		form.company = res.list.company 
		form.company_reg = res.list.company_reg 
		form.name = res.list.name
		form.bank_name = [res.list.bank_name]
		form.cardNo = res.list.cardNo
		form.subbranch = res.list.subbranch
		form.cnapsCode = res.list.cnapsCode
		form.state = res.list.state
		form.id = res.list.id
		form.remark = res.list.remark   
		res.list.pic1 && form.pic_list.push({url: res.list.pic1}) 
		res.list.pic2 && form.pic_list.push({url: res.list.pic2}) 
		res.list.pic3 && form.pic_list.push({url: res.list.pic3}) 
		res.list.pic4 && form.pic_list.push({url: res.list.pic4}) 
		res.list.pic5 && form.pic_list.push({url: res.list.pic5}) 
	}
}
function submitForm(formName) {
	console.log(form)
	formName.validate(async (valid) => {
		if (valid) {
			let res = await $api.no_order_white_sell_change({ 
				...form, 
				product_id: form.product_id[0],
				bank_name: form.bank_name[0],
				id: props.id, 
				pic1: form.pic_list[0].url,
				pic2: form.pic_list[1].url,
			});
			if (res.code != 1) return;
			ElMessage.success(res.msg); 
			router.replace({name: 'no_order_white_sell_list'})
		} else {
			console.log("error submit!!");
			return false;
		}
	});
}
async function upload(param: any , propName ) {
    console.log(param) 
    const formData = new FormData()
    formData.append('file', param.file)
	try {
		const res = await getImageBase64_readFile(param.file)
		// console.log(res)
		propName[propName.length - 1].url = res;  
		// console.log(form)
		// ElMessage.success('图片上传成功') 
	} catch (error) {
		return false
	}
	return true
    
    
}
const handleRemove = (file: UploadFile, index: string, propName, propName2, quick = false ) => { 
    if(typeof(index) != "undefined") {
        propName[index].clearFiles(); 
        propName2.filesList = [] 
    }else {
        console.log(file)
        let i = form[propName].findIndex(ele => ele.url == file.url)
        form[propName].splice(i, 1)
    }
    // ElMessage.success('图片移除成功')
}
const handlePictureCardPreview = (file) => {
    dialogImageUrl.value = file.url!
    dialogVisible.value = true
}

const remoteMethod = async (query: string) => { 
	query = query.trim()
	if (query) {
		loading.value = true;
		const res = await $api.get_bank_name({params: {term: query}, loading: false})
		loading.value = false;
		if(res.code == 1) {
			options.value = res.list.map(ele => ({...ele, label: ele.bank_name, value: ele.bank_name}))
		}
	} else {
		options.value = [];
	}
};
function onBankChange(val) {
	console.log(val)
	let bank_no = options.value.filter(ele => ele.value == val)[0].bank_no;
	form.cnapsCode = bank_no
}

async function checkNoOrderBuyerState() {
	if(!no_order_buyer.value.hasOwnProperty('id')) {
		await finance.getno_order_buyer(true)
	}
	if(!no_order_buyer.value.hasOwnProperty('id') || no_order_buyer.value.state != '1') {
		ElMessageBox.confirm('您的无订单融资借款人信息还未审核通过，暂时无法新增白名单', '消息确认',
			{
				confirmButtonText: '跳转查看无订单融资借款人信息',
				cancelButtonText: '我已知晓',
				type: 'warning',
				closeOnClickModal: false,
				closeOnPressEscape: false,
			})
			.then(() => {
				router.push({name: 'no_order_buyer'})
			})
			.catch(() => {
				// catch error
			})
	}
	 
}
</script>
<style lang="scss" scoped>
 
::v-deep {
	.el-upload--picture-card { 
		--el-upload-picture-card-size: 80px;
	}
	.el-upload-list--picture-card .el-upload-list__item {
		--el-upload-list-picture-card-size: 80px;
	}
	.el-upload-list--picture-card .el-upload-list__item-actions span+span {
		margin-left: 8px
	}
	.limit {
        .el-upload--picture-card {
            display: none;
        }
        .el-upload-list--picture-card {
            display: flex;
        }
        .el-upload-list--picture-card .el-upload-list__item {
            margin: 0
        }
    }

} 
</style>
