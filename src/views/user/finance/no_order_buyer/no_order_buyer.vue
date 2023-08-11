<!--  -->
<template>
	<div class="u-p-10" style="box-sizing: border-box;">
		<el-form
			:model="form"
			:rules="rules"
			ref="userForm"
			label-width="140px"
		>
			<el-form-item label="公司名称" prop="company">
				<el-input v-model="form.company"></el-input>
			</el-form-item>
			<el-form-item label="营业执照" prop="reg_pic">
				<el-upload 
					ref="reg_pic" 
					action=""  
					:class="{
						limit: form.filesList.length == 1
					}"  
					v-model:file-list="form.filesList"
					list-type="picture-card" 
					:headers="configHeader"  
					:http-request="(options) => upload(options, form.filesList) "
					:before-upload="(rawFile) => beforeUpload(rawFile, 5)"
					:limit="1"
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
									@click="handleRemove(file, undefined, 'filesList')">
									<el-icon>
										<i-ep-Delete />
									</el-icon>
								</span>
							</span>
						</div>
					</template>
				</el-upload>
			</el-form-item> 
			<el-form-item label="统一社会信用代码" prop="platform_reg">
				<el-input v-model="form.platform_reg"></el-input>
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
import { ElNotification, ElMessage } from "element-plus";
import { baseStore } from '@/stores/main'
const { configHeader, beforeUpload, getImageBase64_readFile } = baseStore()
const finance = useFinanceStore();
const { no_order_buyer, no_order_buyer_loading, tooclePic } = toRefs(finance);
const $api: any = inject("$api");
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

onMounted(async () => {
	await finance.getno_order_buyer(true)
});

const form = reactive({
	company: "", 
	platform_reg: "", 
	remark: "", 
	reg_pic: "",
	filesList: [],
	id: ''
});
const userForm = ref();
const rules = {
	company: [
		{
			required: true,
			message: "请输入公司名称",
			trigger: "blur",
		},
	],
	platform_reg: [
		{
			required: true,
			message: "请输入您统一社会信用代码",
			trigger: "blur",
		},
	],
};
watch(
	() => no_order_buyer.value,
	(n) => {
		if(n.hasOwnProperty('id')) { 
			form.company = n.company
			form.platform_reg = n.platform_reg
			form.remark = n.remark
			form.reg_pic = n.reg_pic
			form.filesList = n.filesList
			form.id = n.id 
		}
	},
	{
		deep: true
	}
) 

function submitForm(formName) { 
	formName.validate(async (valid) => {
		if (valid) {
			let res = await $api.no_order_buyer_change({ 
				platform_reg: form.platform_reg, 
				remark: form.remark, 
				id: form.id, 
				company: form.company,
				reg_pic: form.filesList[0]?.url.replace(tooclePic.value, ''),  
			});
			if (res.code != 1) return;
			ElMessage.success(res.msg);
			finance.getno_order_buyer(true)
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
