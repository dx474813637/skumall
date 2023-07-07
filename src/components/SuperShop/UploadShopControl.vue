<template> 
    <el-dialog 
        v-model="visible"  
        width="550px"
        @opened="handleOpened"
        @close="handleClose"  
        custom-class="super-shop-dialog"
        append-to-body
        >
            <template #header>
                <el-text size="large" style="font-size: 18px;" >请选择要上传的平台</el-text>
                <el-tag  
                    effect="light" 
                    round 
                    class="u-m-l-10" 
                    @click="refreshToPlatformBtn" 
                    >
                    <el-icon>
                        <i-ep-Refresh></i-ep-Refresh>
                    </el-icon>
                </el-tag>
            </template>

            <div v-loading="upload_platform_loading" class="platform-list u-flex u-flex-wrap u-m-b-10">
                <div class="platform-item u-radius-5 u-flex u-flex-column u-m-b-5 u-p-8"
                    v-for="item in upload_platform"
                    :key="item.id"
                    >
                    <el-image :src="item.img" fit="contain" class="u-m-b-5"></el-image> 
                    <el-text>{{ item.name }}</el-text>
                </div>
            </div>
            <div class="u-flex u-flex-center">
                <el-link>
                    <el-text type="info" >修改一键上传设置 ></el-text>
                </el-link>
                
            </div>
        </el-dialog> 
</template>
<script lang="ts" setup>
import { reactive, ref, watch, onMounted, onBeforeMount, inject, toRefs, computed } from 'vue';
import { useSuperShopStore } from '@/stores/superShop'; 
const superShop = useSuperShopStore(); 
let { upload_platform, upload_platform_loading } = toRefs(superShop); 
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    }, 
    product: {
        type: Object,
        default: () => ({})
    }
})
const emits = defineEmits(['update:show'])
// const $api = inject('$api') 

onMounted(async () => { 

})
const visible = computed({
    get() {
        return props.show
    },
    set(value) { 
        emits('update:show', value)
    }
})
async function handleOpened() {  
    if(upload_platform.value.length == 0) {
        refreshToPlatformBtn()
    }
}
async function refreshToPlatformBtn() {
    await superShop.getToPlatform()
}
 
function handleClose() { 
    // emits('update:show', false)
}  
</script>  
   
<style >
.super-shop-dialog .el-dialog__header {
    background-color: var(--el-color-primary-light-9);
    margin-right: 0;
}
.super-shop-dialog .el-dialog__body {
    padding: 15px!important; 
} 
</style>
<style scoped lang="scss">

.platform-list {
    min-height: 100px;
    .platform-item {
        flex: 0 0 20%;
        @extend %box-sizing;
        cursor: pointer;
        &:hover {
            @include box-shadow(0 0 10px rgba(0,0,0,.1));
        }
        .el-image {
            max-width: 80%;
        }
    }
}
</style>