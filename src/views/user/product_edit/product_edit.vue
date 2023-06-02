<template>
    <el-form ref="formRef" :model="dynamicValidateForm" label-width="120px" :rules="rules" class="demo-dynamic">
        <el-form-item prop="name" label="商品名称">
            <el-input v-model="dynamicValidateForm.name" />
        </el-form-item>
        <el-form-item prop="cate" label="分类">
            <el-cascader 
                v-model="dynamicValidateForm.cate" 
                :options="cate_list"
                placeholder="请选择分类"
                :props="{
                    value: 'id',
                    label: 'name'
                }"
                style="width: 100%"
                >
                <template #default="{ node, data }">
                    <span>{{ data.name }}</span>
                    <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                </template>
            </el-cascader>
        </el-form-item>
        <el-form-item prop="price" label="价格">
            <el-input v-model="dynamicValidateForm.price" />
        </el-form-item>
        <el-form-item prop="pic" label="轮播图">
            <el-upload 
                ref="pic" 
                action=""  
                v-model:file-list="dynamicValidateForm.pic"
                list-type="picture-card" 
                :headers="configHeader"  
                :http-request="function (options: UploadRequestOptions) { return upload(options, dynamicValidateForm.pic) }"
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
                                @click="handleRemove(file, undefined, 'pic')">
                                <el-icon>
                                    <Delete />
                                </el-icon>
                            </span>
                        </span>
                    </div>
                </template>
            </el-upload>
        </el-form-item>
        <el-form-item prop="description" label="商品描述">
            <el-upload 
                ref="description" 
                action=""  
                v-model:file-list="dynamicValidateForm.description"
                list-type="picture-card" 
                :headers="configHeader"  
                :http-request="function (options: UploadRequestOptions) { return upload(options, 'dynamicValidateForm.description') }"
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
                                @click="handleRemove(file, undefined, 'description')">
                                <el-icon>
                                    <Delete />
                                </el-icon>
                            </span>
                        </span>
                    </div>
                </template>
            </el-upload>
        </el-form-item>
        <el-form-item prop="recommend_remark" label="商家推荐语">
            <el-input v-model="dynamicValidateForm.recommend_remark" />
        </el-form-item>
        <el-form-item prop="freight_id" label="运费模板">
            <el-cascader 
                v-model="dynamicValidateForm.freight_id" 
                :options="freightRef"
                placeholder="请选择运费模板"
                :props="{
                    value: 'value',
                    label: 'label'
                }"
                style="width: 100%"
                >
            </el-cascader>
        </el-form-item>
        <el-form-item prop="weight" label="重量">
            <el-input v-model="dynamicValidateForm.weight" />
        </el-form-item>
        <el-form-item prop="weight_unit" label="重量单位">
            <el-radio-group v-model="dynamicValidateForm.weight_unit">
                <el-radio label="0">kg</el-radio>
                <el-radio label="1">g</el-radio> 
            </el-radio-group>
        </el-form-item>
        <el-form-item prop="delivery_delay_day" label="承诺发货时间">
            <el-input v-model="dynamicValidateForm.delivery_delay_day" />
        </el-form-item>
        <!-- <el-form-item prop="info" label="富文本详情">
            <el-input v-model="dynamicValidateForm.info" />
        </el-form-item> -->
        <el-form-item prop="on" label="是否上架"> 
            <el-radio-group v-model="dynamicValidateForm.on">
                <el-radio label="1">上架</el-radio>
                <el-radio label="0">下架</el-radio> 
            </el-radio-group>
        </el-form-item>

        <el-form-item label="商品规格" prop="domains">
            <el-button :icon="CirclePlus" type="primary" plain @click.prevent="addDomain('')">添加新的规格</el-button>
            <el-button :icon="Refresh" type="danger" plain @click="render"
                v-if="dynamicValidateForm.domains.length > 0">生成价格与库存表单</el-button>
        </el-form-item>
        <el-form-item v-if="dynamicValidateForm.domains.length > 0">
            <el-tabs 
                v-model="domainsTabsValue" 
                type="border-card" 
                class="demo-tabs" 
                style="width: 100%;" 
                closable
                @tab-remove="removeTab"
                >
                <el-tab-pane 
                    v-for="(domain, index) in  dynamicValidateForm.domains" 
                    :key="domain.name"
                    :label="domain.label" 
                    :name="domain.name"
                    >
                     
                    <el-form-item 
                        label="" 
                        :prop="'domains.' + index + '.label'" 
                        :rules="{
                            required: true,
                            message: '规格名不能为空',
                            trigger: 'blur',
                        }">
                        <el-row style="width: 100%;" :gutter="10">
                            <el-col :span="8"> 
                                <el-input v-model="domain.label" placeholder="输入自定义规格名" /> 
                            </el-col>
                            <el-col :span="8">
                                <el-switch 
                                    v-model="domain.isMainKey"
                                    :name="domain.name"
                                    size="small"
                                    active-text="添加图片规格"
                                    /> 
                            </el-col>
                            
                        </el-row>
                    </el-form-item>
                    <div class="domain2Item-title">规格值</div>
                    <div class="domain2Item-box">
                        <div class="domain2Item u-m-t-8" v-for="(domainValue, i) in domain.values" :key="i">
                            <div class="domain2Item-inp">
                                <div class="item">
                                    <el-form-item 
                                        label="" 
                                        :prop="`domains.${index}.values.${i}.value`" 
                                        :rules="{
                                            required: true,
                                            message: '规格值不能为空',
                                            trigger: 'blur',
                                        }">
                                         <el-input v-model="domainValue.value" placeholder="输入规格值" />
                                    </el-form-item>

                                   
                                </div>
                                <div class="item remove-btn u-m-l-5">
                                    <div @click.prevent="removeDomain(domainValue, index + '')">
                                        <el-icon :size="16" color="#999">
                                            <i-ep-Delete />
                                        </el-icon>
                                    </div> 
                                </div> 
                            </div>
                            <div class="domain2Item-upload u-m-t-8" v-show="domain.isMainKey">
                                <el-upload   
                                    :ref="(el) => setUploadRef(el, i, uploadRefs1)" 
                                    action="" 
                                    :class="{
                                        limit: domainValue.files.length > 0
                                    }"  
                                    v-model:file-list="domainValue.files"
                                    list-type="picture-card" 
                                    :headers="configHeader" 
                                    :limit="1"
                                    :on-exceed="function (files, uploadFiles) { return handlePictureExceed(files, uploadFiles, domainValue.files) }"
                                    :http-request="function (options: UploadRequestOptions) { return upload(options, domainValue.files) }"
                                    :before-upload="beforeUpload"> 
                                    <el-icon size="16">
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
                                                    @click="handleRemove(file, i, uploadRefs1)">
                                                    <el-icon>
                                                        <Delete />
                                                    </el-icon>
                                                </span>
                                            </span>
                                        </div>
                                    </template>
                                </el-upload>
                            </div>
                        </div>
                        <div class="domain2Item u-m-t-8" >
                            <div class="domain2Item-inp">
                                <el-button type="primary" :icon="CirclePlus" plain
                                    @click.prevent="addDomain(String(index))">新增规格值输入框</el-button>
                            </div>
                        </div>
                    </div>  
                </el-tab-pane>
            </el-tabs>
        </el-form-item>
        <el-form-item v-for="(domains2Price, index) in dynamicValidateForm.domains2Price" :key="index">
            <div class="domains2Price-rows">
                <div class="item ">
                    <el-upload 
                        :ref="(el) => setUploadRef(el, index, uploadRefs2)" 
                        action="" 
                        :class="{
                            limit: domains2Price.img
                        }"  
                        v-model:file-list="domains2Price.fileList"
                        list-type="picture-card" 
                        :headers="configHeader" 
                        :limit="1"
                        :on-exceed="function (files, uploadFiles) { return handlePictureExceed(files, uploadFiles, domains2Price.files) }"
                        :http-request="function (options: UploadRequestOptions) { return upload(options, `domains2Price.${index}.files`) }"
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
                                        @click="handleRemove(file, index, uploadRefs2)">
                                        <el-icon>
                                            <Delete />
                                        </el-icon>
                                    </span>
                                </span>
                            </div>
                        </template>
                    </el-upload>
                </div>
                <div class="item u-flex-1 u-p-l-10" style="flex: 0 0 calc(100% - 65px)">
                    <el-row style="width: 100%;" :gutter="10">
                        <el-col :span="24">
                            <span v-for="(ele, i) in dynamicValidateForm.domains" :key="i" class="u-p-r-10">
                                {{ `【${ele.label}】${domains2Price.sku[ele.label]}` }}
                            </span>

                        </el-col>
                    </el-row>
                    <el-row style="width: 100%;" :gutter="10">
                        <el-col :span="12">
                            <el-form-item :prop="'domains2Price.' + index + '.price'" :rules="{
                                required: true,
                                message: '价格不能为空',
                                trigger: 'blur',
                            }">
                                <el-input v-model="domains2Price.price" placeholder="价格">
                                    <template #prepend>价格</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :prop="'domains2Price.' + index + '.stock'" :rules="{
                                required: true,
                                message: '库存不能为空',
                                trigger: 'blur',
                            }">
                                <el-input v-model="domains2Price.stock" placeholder="库存">
                                    <template #prepend>库存</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </div>

        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(formRef)">发布</el-button>
            <el-button @click="resetForm(formRef)">Reset</el-button>
        </el-form-item>
    </el-form>

    <el-dialog v-model="dialogVisible">
        <img w-full style="width: 100%" :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
</template>
  
<script lang="ts" setup>
import { reactive, ref, inject, toRefs  } from 'vue'
import { genFileId, ElMessage } from 'element-plus'
import type { FormInstance, UploadFile, UploadRequestOptions, UploadRawFile, UploadProps, FormRules } from 'element-plus'
import {
    CloseBold,
    Delete, Plus, ZoomIn, CirclePlus, Refresh, Switch
} from '@element-plus/icons-vue'
import { baseStore } from '@/stores/main'
import { cateStore } from '@/stores/cate'
import toSpecPrices from '@/utils/toSpecPrices' 
import { deepClone } from '@/utils'
const { configHeader } = baseStore()
const cate = cateStore()
const { cate_list } = toRefs(cate)
const $api: any = inject('$api')
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const formRef = ref<FormInstance>()
const freightRef = ref([
    {
        label: '包邮',
        value: '0'
    }
])
let uploadRefs1: any = []
let uploadRefs2: any = []
const dynamicValidateForm = reactive<{
    domains: DomainItem[]
    domains2Price: Domain2PricesItem[]
    name: string
    cate: string
    price: string
    pic: array
    description: array
    recommend_remark: string
    freight_id: string
    weight: string
    weight_unit: string
    delivery_delay_day: string
    info: string
    on: string
    // zt: string
    // spec_prices: string
    // specs: string
}>({
    domains: [],
    domains2Price: [],
    name: '',
    cate: '',
    price: '',
    pic: [],
    description: [],
    recommend_remark: '',
    freight_id: '0',
    weight: '',
    weight_unit: '0',
    delivery_delay_day: '',
    info: '',
    on: '0',
    // zt: '',
    // spec_prices: '',
    // specs: '',
})
const rules = reactive<FormRules>({
    name: [
        {
            required: true,
            message: '商品名称不能为空',
            trigger: ['change', 'blur'],
        },
    ],
    cate: [
        {
            required: true,
            message: '分类不能为空',
            trigger: ['change', 'blur'],
        },
    ],
    price: [
        {
            required: true,
            message: '价格不能为空',
            trigger: ['change', 'blur'],
        },
    ],
    pic: [
        {
            required: true,
            message: '轮播图不能为空',
            trigger: ['change', 'blur'],
        },
    ], 
    recommend_remark: [
        {
            required: true,
            message: '商家推荐语不能为空',
            trigger: ['change', 'blur'],
        },
    ], 
    weight: [
        {
            required: true,
            message: '重量不能为空',
            trigger: ['change', 'blur'],
        },
    ], 
    delivery_delay_day: [
        {
            required: true,
            message: '承诺发货时间不能为空',
            trigger: ['change', 'blur'],
        },
    ],
    description: [
        {
            required: true,
            message: '轮播图不能为空',
            trigger: ['change', 'blur'],
        }
    ],
    domains: [
        {
            required: true,
            message: '商品规格不能为空',
            trigger: ['change', 'blur'],
        }
    ]
})

let domainIndex = 0
const domainsTabsValue = ref('')
// const domainsTabs:Array<any> = ref([]) 
cate.getCateData()
interface DomainItem {
    key: number | string
    values: any
    label: string
    title: string
    name: string
    isMainKey: boolean
    valuesIndex: number
}
interface Domain2PricesItem {
    sku: Object
    img: string
    stock: number
    price: number
}
const setUploadRef = (el: any, index: string, prop) => {
    if (el) { 
        prop[index] = el
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
        item.valuesIndex += 1;
        (dynamicValidateForm.domains as any)[index].values.push({ 
            value: `自定义规格值${item.name}-${item.valuesIndex}`,
            files: [],
            key: item.valuesIndex,
            parentKey: item.key
        })
    }
    else {
        // addTab('')
        const newTabName = `${++domainIndex}`
        let len = dynamicValidateForm.domains.length;
        dynamicValidateForm.domains.push({
            key: domainIndex,
            values: [
                {
                    value: `自定义规格值${domainIndex}-1`,
                    files: [],
                    key: 1,
                    parentKey: domainIndex
                }
            ],
            label: `自定义规格名${domainIndex}`,
            title: `自定义sku${domainIndex}`,
            name: newTabName,
            isMainKey: false,
            valuesIndex: 1,
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
async function upload(param: any , propName) {
    // console.log(index)
    // console.log(param, index)
    const formData = new FormData()
    formData.append('file', param.file)
    const res = await $api.upimg(formData)
    // console.log(res)
    if (res.code == 1) {
        propName[0].url = res.list[0];  
        ElMessage.success('图片上传成功')
        return true
    }
    return false
}
const handleRemove = (file: UploadFile, index: string, propName ) => {
    // console.log(uploadRefs[index])
    if(typeof(index) != "undefined") {
        propName[index].clearFiles(); 
    }else {
        console.log(file)
        let i = propName.findIndex(ele => ele.url == file.url)
        dynamicValidateForm.pic.splice(i, 1)
    }
    ElMessage.success('图片移除成功')
}

const handlePictureCardPreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url!
    dialogVisible.value = true
}
async function handlePictureExceed(files: UploadFile, uploadFiles, propName) {
    console.log('handlePictureExceed')
    const res = await upload({ file: files[0] }, propName)
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
    // console.log(rawFile.type)
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
    formEl.validate(async (valid) => {
        if (valid) {
            console.log('submit!')
            console.log(dynamicValidateForm)
            let params = formParams2apiParams()
            console.log(params)
            await submitApi(params)
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
    dynamicValidateForm.domains2Price = [];
    uploadRefs2 = []
    let arr = dynamicValidateForm.domains.map(ele => {
        return ele.values.map(item => {
            return {
                value: item.value,
                title: ele.label
            }
        })
    })
    let SpecPrices: any = [];
    let SpecPricesItem = {};
    toSpecPrices(arr, 0, SpecPrices, SpecPricesItem)
    // console.log(SpecPrices)
    dynamicValidateForm.domains2Price = SpecPrices.map((ele: any) => {
        return {
            sku: ele,
            img: "",
            fileList: [],
            stock: 0,
            price: 0,
        }
    })
    console.log(dynamicValidateForm)
}
async function submitApi(data) { 
    const res = await $api.save_product({
        ...data
    })
    if(res.code == 1) {
        ElMessage.success(res.msg)
    }
}

function formParams2apiParams() {
    let formParams = deepClone(dynamicValidateForm);
    formParams.pic = formParams.pic.map(ele => ele.url).join('|')
    formParams.description = formParams.description.map(ele => ele.url).join('|')
    formParams.cate = formParams.cate[formParams.cate.length - 1]
    formParams.spec_prices = JSON.stringify(formParams.domains2Price.map(ele => {
        ele.fileList = ''
        return {
            ...ele
        }
    }))
    formParams.specs = formParams.domains.map(ele => {
        let right = ele.values.map(item => item.value).join(',')
        return `${ele.label}|${right}`
    }).join('^')
    formParams.domains = ''
    formParams.domains2Price = ''
    return formParams
}

</script>
  
<style lang='scss' scoped>
.domains2Price-rows {
    @include flex(x, start, start);
    width: 100%;
}

::v-deep {
    .el-upload--picture-card {
        --el-upload-picture-card-size: 65px;
        // background-color: var(--el-color-primary-light-9);
    }

    .limit .el-upload--picture-card {
        display: none;
    }

    .el-upload-list--picture-card .el-upload-list__item {
        --el-upload-list-picture-card-size: 65px;
        
    }

}
.domain2Item-box {
    @include flex(x, start, start);
    flex-wrap: wrap;
    width: 100%;
    .domain2Item {
        flex: 0 0 33%;
        .domain2Item-inp {
            width: 100%;
            @include flex(x);
            .item {
                flex: 1;
                &.remove-btn {
                    flex: 0 0 40px; 
                    &>div {
                        @include flex(x, start, center);
                        cursor: pointer;
                        &:hover {
                            .el-icon {
                                color: $uni-color-error;
                            }
                        }
                    }
                }
            }
        }
    }

}
.domains2Price-rows { 
    ::v-deep {
        .el-upload-list--picture-card .el-upload-list__item {
            margin: 0;
        }
    }
}
.tabs-item {
    @include flex(x)
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