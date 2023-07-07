<template>
    <el-form 
        ref="formRef" 
        :model="dynamicValidateForm" 
        label-width="120px" 
        :rules="rules" 
        class="demo-dynamic u-p-20"
        label-position="top"
        scroll-to-error
        inline-message
        >
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
                filterable
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
                :http-request="(options) => upload(options, dynamicValidateForm.pic) "
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
                :http-request="(options) => upload(options, dynamicValidateForm.description) "
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
                :options="freight_list"
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
        <el-form-item prop="attribute" > 
            <template #label>
                <div class="u-flex">
                    <div class="u-m-r-10">商品详细属性自定义</div>
                    <el-button size="small" type="primary" plain @click="handleAddAttributeItem">新增自定义</el-button>
                </div>
            </template>
            <el-row :gutter="20" class="u-m-b-10" style="width: 100%;"
                v-for="(item, index) in dynamicValidateForm.attribute"
                :key="item.id"
                > 
                <el-col :span="8" class="u-flex u-flex-items-start">
                    <el-button
                        type="danger"
                        class="u-m-r-10" 
                        plain 
                        @click="handleRemoveAttributeItem(item.id)" 
                        v-show="dynamicValidateForm.attribute.length != 1"
                        >移除</el-button>
                    <el-form-item 
                        class="u-flex-1"
                        label="" 
                        :prop="'attribute.' + index + '.name'" 
                        :rules="{
                            required: true,
                            message: '自定义属性名不能为空',
                            trigger: ['blur', 'change'],
                        }">
                        <el-input v-model="item.name" placeholder="自定义属性名" v-trim />    
                    </el-form-item>
                    
                </el-col>
                <el-col :span="16">
                    <el-form-item  
                        label="" 
                        :prop="'attribute.' + index + '.value'" 
                        :rules="{
                            required: true,
                            message: '自定义属性值不能为空',
                            trigger: ['blur', 'change'],
                        }">
                        <el-input v-model="item.value" placeholder="自定义属性值" v-trim />  
                    </el-form-item>
                    
                </el-col>
            </el-row>
        </el-form-item>

        <el-form-item label="商品规格" prop="domains"> 
            <div class="u-flex u-flex-between u-m-b-15" style="width: 100%;">
                <div class="u-flex">
                    <el-button :icon="CirclePlus" type="primary" plain @click.prevent="addDomain('')">添加新的规格</el-button>
                    <el-button :icon="FolderOpened" type="warning" plain @click.prevent="dialogVisible2 = true">引用规格模板</el-button>
                     
                    
                </div> 
                <div >
                    <!-- <el-text type="warning" tag="i">
                        <el-icon class="u-p-r-5"><i-ep-Warning /></el-icon>
                        引用规格模板会初始化价格与库存表格数据！
                    </el-text> -->
                </div>
            </div>
            
            <el-tabs 
                v-if="dynamicValidateForm.domains.length > 0"
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
                    lazy
                    >
                    <template #label>
                        <div class="tabs-item">
                            <span>{{ domain.label }}</span>
                            <el-icon class="u-m-l-5" v-show="domain.isMainKey" color="#b961ed" size="16">
                                <i-ep-PictureFilled />
                            </el-icon>
                            
                        </div>
                    </template> 
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
                                <el-input v-model="domain.label" placeholder="输入自定义规格名" @focus="setOldText($event)" @blur="render({prop: 'text', positionArr: [index, -1]})" /> 
                            </el-col>
                            <el-col :span="8">
                                <el-switch 
                                    v-model="domain.isMainKey"
                                    :name="domain.name"
                                    size="small"
                                    active-text="添加图片规格"
                                    @change="(val) => mainKeyChange(val, domain, index)" 
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
                                         <el-input v-model="domainValue.value" placeholder="输入规格值" @blur="render({prop: 'text', positionArr: [index, i]})" />
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
                            <div class="domain2Item-upload u-m-t-8 table-box" v-show="domain.isMainKey">
                                <el-upload   
                                    :ref="(el) => setUploadRef(el, i, uploadRefs1)" 
                                    action="" 
                                    :class="{
                                        limit: domainValue.filesList.length == 1
                                    }"  
                                    v-model:file-list="domainValue.filesList"
                                    list-type="picture-card" 
                                    :headers="configHeader" 
                                    :limit="1"
                                    :on-exceed="(files, uploadFiles) => handlePictureExceed(files, uploadFiles, domainValue.filesList) "
                                    :http-request="(options) => upload(options, domainValue.filesList, i)"
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
                                                    @click="handleRemove(file, i, uploadRefs1, dynamicValidateForm.domains[0].values[i], true)">
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
        <el-form-item label="价格与库存" prop="domains2Price" >
            <el-table
                :data="dynamicValidateForm.domains2Price"
                :span-method="objectSpanMethod"
                border
                style="width: 100% " 
                max-height="60vh"
                > 
                <el-table-column 
                    width="240"
                    v-for="item in dynamicValidateForm.domains"
                    :key="item.name"
                    :prop="item.label" 
                    :label="item.label"
                    />
                <el-table-column label="预览图" width="80px" fixed="right" >
                    <template #default="{ row, $index }">
                        <div class="table-box">
                            <el-upload 
                                :ref="(el) => setUploadRef(el, $index, uploadRefs2)" 
                                action="" 
                                :class="{
                                    limit: row.filesList.length == 1
                                }"  
                                v-model:file-list="row.filesList"
                                list-type="picture-card" 
                                :headers="configHeader" 
                                :limit="1"
                                :on-exceed="(files, uploadFiles) => handlePictureExceed(files, uploadFiles, row.filesList)"
                                :http-request="(options) => upload(options, row.filesList) "
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
                                                @click="handleRemove(file, $index, uploadRefs2, row)">
                                                <el-icon>
                                                    <Delete />
                                                </el-icon>
                                            </span>
                                        </span>
                                    </div>
                                </template>
                            </el-upload>
                        </div>
                        
                    </template>
                    
                </el-table-column>
                <el-table-column prop="price" label="价格" fixed="right" width="150" >
                    <template #header >
                        <div class="u-flex">
                            <div class="item" style="white-space: nowrap;">价格</div>
                            <div class="item u-m-l-5" v-show="!quickEditForm.price.show">
                                <el-button type="warning" plain size="small" link @click="() => {quickEditForm.price.show = true}">
                                    <div class="u-flex">
                                        <i-ep-Edit />
                                        <span >批量编辑</span>
                                    </div>
                                </el-button>
                            </div>
                            <div class="item u-p-l-5 u-p-r-5 u-flex" v-show="quickEditForm.price.show">
                                <el-input size="small" v-model="quickEditForm.price.value" style="max-width: 80px; min-width: 50px" />
                                <div class="u-m-l-5">
                                    <el-button type="success" size="small" link  @click="quickEdit('price')">
                                        <i-ep-Select />
                                    </el-button>
                                </div>
                                <div class="u-m-l-5"> 
                                    <el-button type="danger" size="small" link  @click="() => {quickEditForm.price.show = false}">
                                        <i-ep-CloseBold />
                                    </el-button>
                                </div>
                                
                                
                            </div>
                        </div>
                        
                    </template>
                    <template #default="{ row, $index }">
                        <el-form-item :prop="'domains2Price.' + $index + '.price'" :rules="{
                                required: true,
                                message: '价格不能为空',
                                trigger: 'blur',
                            }">
                                <el-input v-model="row.price" placeholder="价格" />
                            </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop="stock" label="库存" fixed="right" width="150" >
                    <template #header >
                        <div class="u-flex">
                            <div class="item" style="white-space: nowrap;">库存</div>
                            <div class="item u-m-l-5" v-show="!quickEditForm.stock.show">
                                <el-button type="warning" plain size="small" link @click="() => {quickEditForm.stock.show = true}">
                                    <div class="u-flex">
                                        <i-ep-Edit />
                                        <span >批量编辑</span>
                                    </div>
                                </el-button>
                            </div>
                            <div class="item u-m-l-5 u-flex" v-show="quickEditForm.stock.show">
                                <el-input size="small" v-model="quickEditForm.stock.value" style="max-width: 80px; min-width: 50px" />
                                <div class="u-m-l-5">
                                    <el-button type="success" size="small" link  @click="quickEdit('stock')">
                                        <i-ep-Select />
                                    </el-button>
                                </div>
                                <div class="u-m-l-5"> 
                                    <el-button type="danger" size="small" link  @click="() => {quickEditForm.stock.show = false}">
                                        <i-ep-CloseBold />
                                    </el-button>
                                </div>
                                
                                
                            </div>
                        </div>
                        
                    </template>
                    <template #default="{ row, $index }">
                        <el-form-item :prop="'domains2Price.' + $index + '.stock'" :rules="{
                                required: true,
                                message: '库存不能为空',
                                trigger: 'blur',
                            }">
                                <el-input v-model="row.stock" placeholder="库存" />
                            </el-form-item>
                    </template>

                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(formRef)">发布</el-button>
            <el-button @click="resetForm(formRef)">Reset</el-button>
        </el-form-item>
    </el-form>

    <el-dialog v-model="dialogVisible">
        <img w-full style="width: 100%" :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
    <el-dialog v-model="dialogVisible2" title="商品规格模板" width="70%" > 
        <table-sku
            isRadioGroup
            maxHeight="50vh"
            @setCurrentRow="setCurrentRow"
        ></table-sku> 
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible2 = false">退出</el-button>
                <el-tooltip 
                    effect="dark"
                    content="该操作会初始化价格与库存数据"
                    placement="top-end" 
                    >
                    <el-button type="primary" @click="skuTableConfirm">选择该模板</el-button> 
                </el-tooltip>
            </span>
        </template>
    </el-dialog>
</template>
  
<script lang="ts" setup>
import { reactive, ref, inject, toRefs, watch, nextTick  } from 'vue'
import { genFileId, ElMessage } from 'element-plus'
import type { FormInstance, UploadFile, UploadRequestOptions, UploadRawFile, UploadProps, FormRules, TableColumnCtx  } from 'element-plus'
import {
    Delete, Plus, ZoomIn, CirclePlus, FolderOpened 
} from '@element-plus/icons-vue'
import router from '@/router/guard'
import { baseStore } from '@/stores/main'
import { cateStore } from '@/stores/cate'
import toSpecPrices from '@/utils/toSpecPrices' 
import { deepClone, isNumber } from '@/utils' 
import useProductSku from '@/hook/useProductSku'
const {
    skuTable2domains,
    sku2domains
} = useProductSku()
const { configHeader } = baseStore()
const cate = cateStore()
const { cate_list, freight_list } = toRefs(cate)
const $api: any = inject('$api')
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const dialogVisible2 = ref(false)
const disabled = ref(false)
const formRef = ref<FormInstance>()
// const freightRef = ref([
//     {
//         label: '包邮',
//         value: '0'
//     }
// ])
const props = defineProps({
    id: {
        type: String,
        default: ''
    }, 
}); 
let uploadRefs1: any = []
let uploadRefs2: any = []
const dynamicValidateForm = reactive<{
    domains: DomainItem[]
    domains2Price: Domain2PricesItem[]
    name: string
    cate: string
    price: string
    pic: Array<any>
    description: Array<any>
    attribute: Array<any>
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
    attribute: []
    // zt: '',
    // spec_prices: '',
    // specs: '',
})
const detail_spec_prices = ref('')
const currentRow = ref()
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
    ],
    domains2Price: [
        {
            required: true,
            message: '价格库存表不能为空',
            trigger: ['change', 'blur'],
        }
    ]
})
const quickEditForm = reactive({
    price: {
        show: false,
        value: ''
    },
    stock: {
        show: false,
        value: ''
    },
})  
let uploadImgIndex = ref(-1)

watch(
    () => props.id,
    (newVal ) => {
        // console.log('id:' +newVal );
        if(!newVal) return
        getProductData()
    },
    {immediate: true}
)
watch(
    () => [ 
        // ...dynamicValidateForm.domains.map(ele => ele.label) ,
        // ...dynamicValidateForm.domains.map(ele => ele.values.map(item => item.value)) 
        ...dynamicValidateForm.domains.map(ele => ele.valuesIndex) 
    ],
    (newVal, oldVal) => {
        console.log('deep watch; render valuesIndex');
        render({type: 'all'});
        setDomains2PriceData()
    },
    {
        deep: true
    }
)  
watch(
    () => dynamicValidateForm.domains2Price,
    (newVal, oldVal) => { 
        detail_spec_prices.value = newVal
        // setOldPrice('set price')
    }, 
    {
        deep: true
    }
)
watch(
    () => dynamicValidateForm.attribute,
    (newVal, oldVal) => { 
        if(newVal.length == 0) {
            handleAddAttributeItem()
        }
    }, 
    {
        deep: true
    }
)

interface SpanMethodProps {
//   row: User
//   column: TableColumnCtx<any>
  rowIndex: number
  columnIndex: number
}
const objectSpanMethod = ({ 
  rowIndex,
  columnIndex,
}: SpanMethodProps) => {
  if (columnIndex === 0) {  
    let len = dynamicValidateForm.domains.slice(1).reduce((sum, item) => sum * item.values.length, 1) 
    if (rowIndex % len === 0) {
      return {
        rowspan: len,
        colspan: 1,
      }
    } else {
      return {
        rowspan: 0,
        colspan: 0,
      }
    }
  }
} 
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
            (dynamicValidateForm.domains as any)[index].values.splice(i, 1);
            (dynamicValidateForm.domains as any)[index].valuesIndex --
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
            filesList: [],
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
                    filesList: [],
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
async function upload(param: any , propName, index:any) {
    // console.log(propName) 
    const formData = new FormData()
    formData.append('file', param.file)
    const res = await $api.upimg(formData)
    // console.log(res)
    if (res.code == 1) {
        if(typeof index != 'undefined') {
            uploadImgIndex.value = index
            render({prop:'img', positionArr: [0, index]})
        }
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
        // if(quick) {
        //     uploadImgIndex.value = +index
        //     render({prop:'img', positionArr: [0, index]})
        // }
    }else {
        console.log(file)
        let i = dynamicValidateForm[propName].findIndex(ele => ele.url == file.url)
        dynamicValidateForm[propName].splice(i, 1)
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

function render({type, prop, positionArr}={} ) {  
    // console.log(type, prop, positionArr)
    if(type != 'all') {  
        let item = dynamicValidateForm.domains[positionArr[0]]
        if(positionArr[1] == -1) {  
            let keys = dynamicValidateForm.domains[positionArr[0]].values.map(ele => `${ele.parentKey},${ele.key}`) 
            // console.log(keys)
            dynamicValidateForm.domains2Price.forEach((ele, i) => { 
                if(prop == 'text') {
                    let keysIndex = -1
                    keysIndex = keys.findIndex(item => ele.keys.includes(item))
                    let keys2 = keys[keysIndex].slice(-1)
                    let value = dynamicValidateForm.domains[positionArr[0]].values.filter(item => item.key == keys2)[0].value
                    ele[dynamicValidateForm.domains[positionArr[0]].label] = value 
                    ele.sku[dynamicValidateForm.domains[positionArr[0]].label] = value 
                    delete ele.sku[oldDomainLable.value]
                    delete ele[oldDomainLable.value]
                } 
            })
        }else {
            item = item.values[positionArr[1]]
            let keystr = `${item.parentKey},${item.key}` 
            let textIndex 
            dynamicValidateForm.domains2Price.forEach((ele, index) => {
                if(ele.keys.includes(keystr)) {
                    if(prop == 'text') {
                        // ele.label = item.value 
                        ele[dynamicValidateForm.domains[positionArr[0]].label] = item.value 
                        ele.sku[dynamicValidateForm.domains[positionArr[0]].label] = item.value 
                    }
                    if(prop == 'img') {
                        ele.filesList = item.filesList
                    }
                    
                }
            }) 
        } 
    }
    else { 
        dynamicValidateForm.domains2Price = [];
        // uploadRefs2 = [] 
        let arr = dynamicValidateForm.domains.map((ele, i) => {
            return ele.values.map(item => {
                let base =  {
                    value: item.value,
                    title: ele.label,
                    key: item.key,
                    parentKey: item.parentKey, 
                }
                if(ele.isMainKey) {  
                    base.filesList = item.filesList 
                }
                return base
            })
        })  
        let SpecPrices: any = [];
        let SpecPricesItem = {};
        // console.log(arr)
        toSpecPrices(arr, 0, SpecPrices, SpecPricesItem)
        // console.log(SpecPrices)
        dynamicValidateForm.domains2Price = SpecPrices.map((ele: any) => {
            let base =  {
                sku: ele, 
                ...ele,
                filesList: [],
                stock: 0,
                price: 0,
                keys: ele.keys.join('|'), 
            }
            if(ele.hasOwnProperty('filesList')) {
                base.filesList = ele.filesList
            }
            return base
        })
    }
    console.log(dynamicValidateForm)
}

const oldDomainLable = ref('')
function setOldText(e) { 
    oldDomainLable.value = e.target.value 
}

async function submitApi(data) { 
    const res = await $api.save_product({
        ...data
    })
    if(res.code == 1) {
        ElMessage.success(res.msg)
        router.push({
            name: 'product_list'
        })
    }
}

function formParams2apiParams() {
    let formParams = deepClone(dynamicValidateForm);
    formParams.pic = formParams.pic.map((ele:any) => ele.url).join('|')
    formParams.description = formParams.description.map((ele:any) => ele.url).join('|')
    formParams.cate = formParams.cate[formParams.cate.length - 1]
    let tar = formParams.domains2Price.map((ele:any) => { 
        let obj = {
            sku: deepClone(ele.sku),
            img: ele.filesList[0]?.url,
            stock: ele.stock,
            price: ele.price,
        }
        delete obj.sku.filesList 
        delete obj.sku.keys 
        return obj
    })
    // console.log(tar)
    formParams.spec_prices = JSON.stringify(tar)
    formParams.specs = formParams.domains.map((ele:any) => {
        let right = ele.values.map((item:any) => item.value).join(',')
        return `${ele.label}|${right}`
    }).join('^')
    formParams.domains = ''
    formParams.domains2Price = ''
    if(props.id) formParams.id = props.id
    formParams.attribute = JSON.stringify(formParams.attribute.map((ele:any) => ({name: ele.name, value: ele.value})))
    return formParams
}

function mainKeyChange(value, domain, index) {
    // console.log(value, domain)
    if(value && dynamicValidateForm.domains.length != 1 ) {  
        dynamicValidateForm.domains.forEach((ele,index) => {
            if(domain.key != ele.key) { 
                ele.isMainKey = false
            }
        })
        if(index>0) {
            dynamicValidateForm.domains.splice(index, 1) 
            nextTick(() => {
                dynamicValidateForm.domains.unshift(domain)  
            })
        } 
    }
    // console.log(dynamicValidateForm.domains)
}
function quickEdit(key) {
    dynamicValidateForm.domains2Price.forEach(ele => ele[key] = quickEditForm[key].value)
    quickEditForm[key].show = false
}
function setCurrentRow({value}) {
    currentRow.value = value
}
function skuTableConfirm() {
    console.log(currentRow.value); 
    let {arr, newTabName} = skuTable2domains(currentRow.value.sku)   
    domainsTabsValue.value = newTabName
    domainIndex = arr.length 
    dynamicValidateForm.domains = arr
    dialogVisible2.value = false;
}

async function getProductData () {
    const res = await $api.product_detail({params: {id: props.id}})
    if(res.code == 1) {
        let {arr, newTabName} = sku2domains(res.list.sku);
        let data = res.list 
        dynamicValidateForm.name = data.name 
        dynamicValidateForm.cate = data.cate 
        dynamicValidateForm.delivery_delay_day = data.delivery_delay_day 
        dynamicValidateForm.freight_id = data.freight_id 
        dynamicValidateForm.on = data.on 
        dynamicValidateForm.price = data.price 
        dynamicValidateForm.recommend_remark = data.recommend_remark 
        dynamicValidateForm.weight = data.weight 
        dynamicValidateForm.weight_unit = data.weight_unit  
        dynamicValidateForm.attribute = data.attribute.map((ele:any, index:any) => ({...ele, id: index}))  
        dynamicValidateForm.domains = arr
        dynamicValidateForm.description = data.description.split('|').map((ele:any) => ({url: ele})) 
        dynamicValidateForm.pic = data.pic.split('|').map((ele:any) => ({url: ele}))   
        domainsTabsValue.value = newTabName;
        domainIndex = newTabName
        detail_spec_prices.value = res.spec_prices
    }
}

function setDomains2PriceData() { 
    if(!detail_spec_prices.value) return
    let arr = deepClone(detail_spec_prices.value); 
    // console.log('set', arr)
    dynamicValidateForm.domains2Price.forEach(ele => {
        let i = -1
        let count = 0
        let isOld = false
        arr.some((item, index) => { 
            count++
            let flag = true
            let keyname = 'specs'
            if(!item.hasOwnProperty('id')) {
                keyname = 'sku'
                delete item.sku.keys
                isOld = true
            }  
            for(let key in item[keyname]) {    
                if(isNumber(item[keyname][key]) && isNumber(ele[key]) ? item[keyname][key] != ele[key] : item[keyname][key] !== ele[key]) { 
                    flag = false;
                    break;
                }  
                
                
            }  
            if(flag) {
                ele.stock = item.stock;
                ele.price = item.price;
                if(item.img) ele.filesList = [{url: item.img}];
                if(item.filesList && item.filesList.length != 0) ele.filesList = item.filesList;
                i = index
            }
            return flag
        })  
        if(i != -1 && !isOld) arr.splice(i, 1)
    })
    detail_spec_prices.value = ''
}

function handleAddAttributeItem() {
    dynamicValidateForm.attribute.push({
        name: '',
        value: '',
        id: new Date().getTime()
    })
}

function handleRemoveAttributeItem(id:any) { 
    let i = dynamicValidateForm.attribute.findIndex(ele => ele.id == id)
    if(i == -1) return;
    dynamicValidateForm.attribute.splice(i, 1)
}

</script>
  
<style lang='scss' scoped>
.domains2Price-rows {
    @include flex(x, start, start);
    width: 100%;
}  
::v-deep {
    
    .el-table {
        // --el-table-border-color: #dcdfe6;
        thead tr th{
            border-color: #dcdfe6;
        }
    }
    .el-tabs--border-card>.el-tabs__header {
        border-radius: 5px 5px 0 0;
    }
    .el-tabs--border-card {
        border-radius: 5px;
    }
    .el-form-item__label {
        font-weight: bold;
        font-size: 15px;
    }
    .el-upload--picture-card {
        --el-upload-picture-card-size: 65px;
        // background-color: var(--el-color-primary-light-9);
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

    .el-upload-list--picture-card .el-upload-list__item {
        --el-upload-list-picture-card-size: 65px;
        
    }

}
.table-box {
    ::v-deep {
        .el-upload--picture-card { 
            --el-upload-picture-card-size: 55px;
        }
        .el-upload-list--picture-card .el-upload-list__item {
            --el-upload-list-picture-card-size: 55px;
        }
        .el-upload-list--picture-card .el-upload-list__item-actions span+span {
            margin-left: 8px
        }
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