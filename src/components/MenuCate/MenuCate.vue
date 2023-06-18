<template>
    <div class="menu-wrapper u-flex-column " :style="{
        height: props.height
    }">
        <div class="menu-items"
            v-for="item in props.list"
            :key="item.id"
            >
            <el-link :underline="false" class="menus-items-title" href="" target="_blank">
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
                        <el-link :underline="false" class="list-item-link u-line-1" href="" target="_blank"> {{ ele.name }} </el-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeMount, inject } from "vue"; 
const props = defineProps({
    height: {
        type: String,
        default: 'auto'
    },
    list: {
        type: Array,
        default: () => [
            {
                id: '0',
                name: '轮胎品牌',
                children: [
                    {
                        id: '0-1',
                        name: '韩泰'
                    },
                    {
                        id: '0-2',
                        name: '万力万力万力万力万力万力'
                    },
                    {
                        id: '0-3',
                        name: '欧威森'
                    },
                    {
                        id: '0-4',
                        name: '双星'
                    },
                    {
                        id: '0-5',
                        name: '耐克森耐克森耐克森耐克森'
                    },
                    {
                        id: '0-6',
                        name: '玛仕图'
                    },
                ]
            },
            {
                id: '1',
                name: '轮胎品牌',
                children: [
                    {
                        id: '1-1',
                        name: '韩泰'
                    },
                    {
                        id: '1-2',
                        name: '万力'
                    },
                    {
                        id: '1-3',
                        name: '欧威森欧威森欧威森欧威森欧威森'
                    },
                    {
                        id: '1-4',
                        name: '双星'
                    },
                    {
                        id: '1-5',
                        name: '耐克森'
                    },
                    {
                        id: '1-6',
                        name: '玛仕图'
                    },
                ]
            },
            {
                id: '2',
                name: '轮胎品牌',
                children: [
                    {
                        id: '2-1',
                        name: '韩泰'
                    },
                    {
                        id: '2-2',
                        name: '万力'
                    },
                    {
                        id: '2-3',
                        name: '欧威森'
                    },
                    {
                        id: '2-4',
                        name: '双星双星双星双星双星'
                    },
                    {
                        id: '2-5',
                        name: '耐克森'
                    },
                    {
                        id: '2-6',
                        name: '玛仕图'
                    },
                ]
            }
        ]
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
            .list-item {
                @extend %box-sizing;
                width: 100%;
                padding: 5px 10px 15px;
                
                .item {
                    flex: 1 1 33%;
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
