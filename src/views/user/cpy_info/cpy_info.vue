<!--  -->
<template>
	<div class="u-p-10" style="box-sizing: border-box;">
		<el-form
			:model="userInfo"
			:rules="rules"
			ref="userForm"
			label-width="100px"
		>
			<el-form-item label="公司名称" prop="company">
				<el-input v-model="userInfo.company"></el-input>
			</el-form-item>
			<el-form-item label="Logo" prop="img">
				<el-upload 
					ref="img" 
					action=""  
					:class="{
						limit: userInfo.img.length == 1
					}"  
					v-model:file-list="userInfo.img"
					list-type="picture-card" 
					:headers="configHeader"  
					:http-request="(options) => upload(options, userInfo.img) "
					:before-upload="beforeUpload"
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
									@click="handleRemove(file, undefined, 'img')">
									<el-icon>
										<i-ep-Delete />
									</el-icon>
								</span>
							</span>
						</div>
					</template>
				</el-upload>
			</el-form-item>
			<el-form-item label="二维码" prop="ewm">
				<el-upload 
					ref="ewm" 
					action=""  
					:class="{
						limit: userInfo.ewm.length == 1
					}"  
					v-model:file-list="userInfo.ewm"
					list-type="picture-card" 
					:headers="configHeader"  
					:http-request="(options) => upload(options, userInfo.ewm) "
					:before-upload="beforeUpload"
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
									@click="handleRemove(file, undefined, 'ewm')">
									<el-icon>
										<i-ep-Delete />
									</el-icon>
								</span>
							</span>
						</div>
					</template>
				</el-upload>
			</el-form-item>
			<el-form-item label="介绍" prop="info">
				<el-input v-model="userInfo.info"></el-input>
			</el-form-item>
			<el-form-item label="公司地址" prop="address">
				<el-input v-model="userInfo.address"></el-input>
			</el-form-item>
			<el-form-item label="联系人" prop="contacts">
				<el-input v-model="userInfo.contacts"></el-input>
			</el-form-item> 
			<el-form-item label="联系电话" prop="phone">
				<el-input v-model="userInfo.phone"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm(userForm)"
					>提交</el-button
				>
				<!-- <el-button @click="resetForm('userInfo')">重置</el-button> -->
			</el-form-item>
		</el-form>
	</div>
    <el-dialog v-model="dialogVisible">
        <img w-full style="width: 100%" :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, inject, onMounted, toRefs, watch } from "vue";
import { userStore } from "@/stores/user";
import { ElNotification, ElMessage } from "element-plus";
import { baseStore } from '@/stores/main'
const { configHeader, beforeUpload } = baseStore()
const user = userStore();
const { cpy_info } = toRefs(user);
const $api: any = inject("$api");
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
onMounted(() => {
	user.getCpyData(true);
});
watch(
	() => user.cpy_info,
	(val) => {
		console.log(val);
		userInfo.id = val.id;
		userInfo.company = val.company;
		userInfo.img = val.img ? [{url: val.img}] : [];
		userInfo.info = val.info;
		userInfo.phone = val.phone;
		userInfo.contacts = val.contacts; 
		userInfo.address = val.address;
		userInfo.ewm = val.ewm ? [{url: val.ewm}] : [];
	},
	{ deep: true }
);
const userInfo = reactive({
	company: "",
	img: [],
	info: "",
	phone: "",
	contacts: "", 
	address: "",
	ewm: [],
});
const userForm = ref();
const rules = {
	company: [
		{
			required: true,
			message: "请输入您的姓名",
			trigger: "blur",
		},
	],
	phone: [
		{
			required: true,
			message: "请输入您的手机",
			trigger: "blur",
		},
	],
};
function submitForm(formName) {
	formName.validate(async (valid) => {
		if (valid) {
			let res = await $api.save_company({ 
				...userInfo, 
				img: userInfo.img[0]?.url, 
				ewm: userInfo.ewm[0]?.url 
			});
			if (res.code != 1) return;
			ElMessage.success(res.msg);
			user.getCpyData();
		} else {
			console.log("error submit!!");
			return false;
		}
	});
}
async function upload(param: any , propName ) {
    // console.log(propName) 
    const formData = new FormData()
    formData.append('file', param.file)
    const res = await $api.upimg(formData)
    // console.log(res)
    if (res.code == 1) { 
        propName[propName.length - 1].url = res.list[0];  
        ElMessage.success('图片上传成功')
        return true
    }
    return false
}
const handleRemove = (file: UploadFile, index: string, propName, propName2, quick = false ) => { 
    if(typeof(index) != "undefined") {
        propName[index].clearFiles(); 
        propName2.filesList = [] 
    }else {
        console.log(file)
        let i = userInfo[propName].findIndex(ele => ele.url == file.url)
        userInfo[propName].splice(i, 1)
    }
    ElMessage.success('图片移除成功')
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
