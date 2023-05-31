<template>
    <el-form ref="formRef" :model="dynamicValidateForm" label-width="120px" class="demo-dynamic">
        <el-form-item prop="email" label="Email" :rules="[
            {
                required: true,
                message: 'Please input email address',
                trigger: 'blur',
            },
            {
                type: 'email',
                message: 'Please input correct email address',
                trigger: ['blur', 'change'],
            },
        ]">
            <el-input v-model="dynamicValidateForm.email" />
        </el-form-item>
        <!-- <div class="domains-box u-m-b-20" v-for="(domain, index) in dynamicValidateForm.domains" :key="domain.key">
             
            <el-form-item>
                <el-row style="width: 100%;" :gutter="10">
                    <el-col :span="8" style="text-align: right;color: #999;">
                        <span>sku{{ index + 1 }}图片</span>
                    </el-col>
                    <el-col :span="16">
                        <el-upload :ref="(el) => setUploadRef(el, index)" action="" list-type="picture-card"
                            :headers="configHeader" :limit="1"
                            :on-exceed="function (files, uploadFiles) { return handlePictureExceed(files, uploadFiles, index) }"
                            :http-request="function (options: UploadRequestOptions) { return upload(options, index) }"
                            :before-upload="beforeUpload">
                            <el-icon>
                                <Plus />
                            </el-icon>

                            <template #file="{ file }">
                                <div>
                                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                                    <span class="el-upload-list__item-actions">
                                        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                            <el-icon><zoom-in /></el-icon>
                                        </span>
                                        <span v-if="!disabled" class="el-upload-list__item-delete"
                                            @click="handleRemove(file, index)">
                                            <el-icon>
                                                <Delete />
                                            </el-icon>
                                        </span>
                                    </span>
                                </div>
                            </template>
                        </el-upload>
                    </el-col>
                </el-row>

            </el-form-item>
        </div> -->
        
        <el-form-item> 
            <el-button :icon="CirclePlus" type="primary" plain @click.prevent="addDomain('')">添加新的自定义表单</el-button> 
            <el-button :icon="Refresh" type="danger" plain @click="render" v-if="dynamicValidateForm.domains.length > 0">生成自定义规格库存表单</el-button>
        </el-form-item>
        <el-form-item v-if="dynamicValidateForm.domains.length > 0"> 
            <el-tabs v-model="domainsTabsValue" type="border-card" class="demo-tabs" style="width: 100%;" closable @tab-remove="removeTab">
                <el-tab-pane v-for="(domain, index) in  dynamicValidateForm.domains" :key="domain.name" :label="domain.label" :name="domain.name">
                    <el-form-item 
                        :label="domain.title" 
                        :prop="'domains.' + index + '.label'" 
                        :rules="{
                            required: true,
                            message: '自定义内容不能为空',
                            trigger: 'blur',
                        }"
                        >
                        <el-row style="width: 100%;" :gutter="10">
                            <el-col :span="8">
                                <el-row style="width: 100%;"> 
                                    <el-input v-model="domain.label" placeholder="输入自定义规格标题" /> 
                                </el-row>
                            </el-col>
                            <el-col :span="16">
                                <el-row class="u-m-b-10" :gutter="10" v-for="(domainValue, i) in domain.values" :key="i">
                                    <el-col :span="22">
                                        <el-input v-model="domainValue.value" placeholder="输入自定义规格属性" />
                                    </el-col>
                                    <el-col :span="2" v-if="domain.values.length > 1">
                                        <el-button type="danger" :icon="CloseBold" circle
                                            @click.prevent="removeDomain(domainValue, index + '')" size="small" />
                                    </el-col>
                                </el-row>

                                <el-row :gutter="10">
                                    <el-col :span="22">
                                        <el-button type="primary" :icon="CirclePlus" plain
                                            @click.prevent="addDomain(String(index))">新增规格属性</el-button>
                                    </el-col>
                                </el-row>

                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-tab-pane>
            </el-tabs>
        </el-form-item>    
        <el-form-item>
            <el-button type="primary" @click="submitForm(formRef)">Submit</el-button> 
            <el-button @click="resetForm(formRef)">Reset</el-button> 
        </el-form-item>
    </el-form>

    <el-dialog v-model="dialogVisible">
        <img w-full style="width: 100%" :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
</template>
  
<script lang="ts" setup>
import { reactive, ref, inject } from 'vue'
import { genFileId, ElMessage } from 'element-plus'
import type { FormInstance, UploadFile, UploadRequestOptions, UploadRawFile, UploadProps } from 'element-plus'
import {
    CloseBold, 
    Delete, Plus, ZoomIn, CirclePlus, Refresh
} from '@element-plus/icons-vue'
import { baseStore } from '@/stores/main'
import toSpecPrices from '@/utils/toSpecPrices'
const { configHeader } = baseStore()
const $api: any = inject('$api')
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const formRef = ref<FormInstance>()
const uploadRefs: any = []
const dynamicValidateForm = reactive<{
    domains: DomainItem[]
    domains2Price: Domain2PricesItem[]
    email: string
}>({
    domains: [],
    domains2Price: [],
    email: '',
})
let domainIndex = 0
const domainsTabsValue = ref('')
// const domainsTabs:Array<any> = ref([])
const spec_prices = ref([])

interface DomainItem {
    key: number | string
    values: any
    label: string 
    title: string
    name: string
}
interface Domain2PricesItem {
    sku: Object  
    img: string
    stock: number | string
    price: number | string
}
const setUploadRef = (el: any, index: string) => {
    if (el) {
        uploadRefs[index] = el
    }
}
const removeDomain = (item: DomainItem, index: string | undefined) => {
    if (index) {
        const i = (dynamicValidateForm.domains as any)[index].values.indexOf(item)
        if (i !== -1) {
            (dynamicValidateForm.domains as any)[index].values.splice(i, 1)
        }
    }
    else {
        const i = dynamicValidateForm.domains.indexOf(item)
        if (i !== -1) {
            dynamicValidateForm.domains.splice(i, 1)
        }
        // tabs.forEach((tab, index) => {
        //     if (tab.name === targetName) {
        //         const nextTab = tabs[index + 1] || tabs[index - 1]
        //         if (nextTab) {
        //         activeName = nextTab.name
        //         }
        //     }
        //  })
    }

}

const addDomain = (index: string | undefined) => {
    if (index) {
        let item = dynamicValidateForm.domains[index]
        let len = item.values.length;
        (dynamicValidateForm.domains as any)[index].values.push({ value: `自定义属性值${item.name}-${len + 1}` })
    }
    else {
        // addTab('')
        const newTabName = `${++domainIndex}`
        let len = dynamicValidateForm.domains.length;
        dynamicValidateForm.domains.push({
            key: Date.now(),
            values: [
                {
                    value: `自定义属性值${len + 1}-1`,
                }
            ],
            label: `自定义标题${domainIndex}`, 
            title: `自定义sku${domainIndex}`,
            name: newTabName, 
        })
        domainsTabsValue.value = newTabName
    }

} 
 
const removeTab = (targetName: string) => {
  const tabs = dynamicValidateForm.domains
  let activeName = domainsTabsValue.value 
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.name
        }
      }
    })
  }

  domainsTabsValue.value = activeName
  dynamicValidateForm.domains = tabs.filter((tab) => tab.name !== targetName)
}
async function upload(param: any, index: string) {
    console.log(param, index)
    const formData = new FormData()
    formData.append('file', param.file)
    const res = await $api.upimg(formData)
    console.log(res)
    if (res.code == 1) {
        (dynamicValidateForm.domains as any)[index].img = res.list[0]
        ElMessage.success('图片上传成功')
        return true
    }
    return false
}
const handleRemove = (file: UploadFile, index: string) => {
    console.log(uploadRefs[index])
    uploadRefs[index].clearFiles();
    (dynamicValidateForm.domains as any)[index].img = ''
    ElMessage.success('图片移除成功')
}

const handlePictureCardPreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url!
    dialogVisible.value = true
}
async function handlePictureExceed(files: UploadFile, uploadFiles, index: string) {
    // console.log(files, uploadFiles)
    const res = await upload({ file: files[0] }, index)
    if (res) {
        // console.log(uploadRefs)
        uploadRefs[index].clearFiles()
        const file = files[0] as UploadRawFile
        file.uid = genFileId()
        uploadRefs[index]!.handleStart(file)
    }
}
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
    //   if (rawFile.type !== 'image/jpeg' ) {
    console.log(rawFile.type)
    if (!/(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(rawFile.type)) {
        ElMessage.error('图片格式有误！请检查！')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('图片大小请勿超过2MB！')
        return false
    }
    return true
}
// function handlePictureSuccess(response, file, fileList, index) {
//     console.log(fileList, index )
// }
// const handleDownload = (file: UploadFile) => {
//     console.log(file)
// }
function submitForm(formEl: FormInstance | undefined) {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

function render() {
    console.log(toSpecPrices(dynamicValidateForm.domains.map(ele => ele.values), 0, [], []))
}

</script>
  
<style lang='scss' scoped>
::v-deep {
    .el-upload--picture-card {
        --el-upload-picture-card-size: 100px;
        // background-color: var(--el-color-primary-light-9);
    }

    .el-upload-list--picture-card .el-upload-list__item {
        --el-upload-list-picture-card-size: 100px
    }
}

.domains-box {
    padding: 20px 0;
    border-radius: 10px;
    transition: all .3s;
    border: 1px dashed #eee;

    &:hover {
        background-color: #f8f8f8;
        border-color: $uni-color-primary;
    }
}
</style>