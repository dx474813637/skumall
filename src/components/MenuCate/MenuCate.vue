<template>
    <div class="menu-wrapper u-flex-column " :style="{
        height: props.height
    }">
        <div class="menu-items"
            v-for="item in cate_list"
            :key="item.id"
            >
            <el-link :underline="false" class="menus-items-title" :href="`#/list?cate=${item.id}`" >
                <div class="u-flex u-flex-between menus-items-title-inner ">
                    <div class="item">
                        <img src="" alt="">
                        <span class="title-text">{{ item.name }}</span> 
                    </div>
                    <div class="item u-flex">
                        <el-icon size="16">
                            <i-ep-ArrowRightBold />
                        </el-icon>
                    </div>
                </div>
                
            </el-link> 
            <div class="menu-items-list">
                <div class="list-item u-flex u-flex-wrap u-flex-items-start">
                    <div class="item u-line-1" 
                        v-for="ele in item.children" 
                        :key="ele.id"
                        >
                        <el-link :underline="false" class="list-item-link u-line-1" :href="`#/list?cate=${ele.id}`" > {{ ele.name }} </el-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, inject, toRefs } from "vue"; 
import {cateStore} from '@/stores/cate'
const cate = cateStore()
const {cate_list, cate_loading} = toRefs(cate)
const props = defineProps({
    height: {
        type: String,
        default: 'auto'
    },
    list: {
        type: Array,
        default: () => []
    }
})
onMounted(async () => {
    if(cate_list.value.length == 0 && !cate_loading.value) {
        await cate.getCateData()
    }
})

</script>
<style lang="scss" scoped>
.menu-wrapper {
    width: 100%;
    .menu-items {
        width: 100%;
        border-bottom: 1px solid var(--el-border-color);
        &:last-child {
            border: 0;
        }
        .el-link {
            --el-link-text-color: #000;
            font-size: 15px;
            width: 100%;
        }
        ::v-deep {
            .el-link__inner {
                width: 100%;
            }
        }
        .menus-items-title {
            width: 100%;
            .menus-items-title-inner {
                @extend %box-sizing;
                width: 100%;
                padding: 10px 10px 5px;
                .title-text {
                    font-weight: bold;
                    // color: #000;
                }
            }
        }
        .menu-items-list {
            width: 100%;
            .el-link {
                font-size: 14px
            }
            .list-item {
                @extend %box-sizing;
                width: 100%;
                padding: 5px 10px 15px;
                
                .item {
                    flex: 0 1 33%;
                    width: 33%;
                    // min-width: 33%;
                    // max-width: 50%;
                    margin-bottom: 5px;
                    &:nth-of-type(3n) {
                        text-align: right;
                    }
                    &:nth-of-type(3n - 1) {
                        text-align: center;
                    }
                    ::v-deep {
                        .el-link__inner {
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            display: block; 
                        }
                    } 
                }
            }
        }
    }
}
</style>
