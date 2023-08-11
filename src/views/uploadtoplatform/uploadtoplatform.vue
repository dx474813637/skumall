<template>
    <Header-base></Header-base>

    <div class="list-w u-p-t-10 u-p-b-10">
        <div class="home-w">
            <!-- <div class="u-p-t-10 u-p-b-10">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ props.title || '详情' }}</el-breadcrumb-item> 
                </el-breadcrumb>
            </div> -->

            <div class="news u-m-t-20">
                <!-- <div class="title u-m-b-10">
                    <el-text size="large" tag="b" style="color: #000;">{{ detail.title }}</el-text>
                </div>
                <div class="sub">
                    <el-text type="info" size="small">{{ detail.cdate }}</el-text>
                </div>
                <el-divider /> -->
                <div class="main"> 
                    <SuperShop
                        :src="flowSrc"
                    ></SuperShop>
                </div>
            </div>

        </div>
    </div>
    <Footer-base></Footer-base>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, computed } from "vue";
import { useSettingsStore } from '@/stores/settings';
const settings = useSettingsStore();
const props = defineProps({
    itemIds: {
        type: String,
        default: ''
    },
    toPlatform: {
        type: String,
        default: ''
    },
    cate: {
        type: String,
        default: ''
    }
})
const $api = inject('$api');
const params = computed(() => {
    return {
        id: props.itemIds ,
        toPlatform: props.toPlatform,
        cate: props.cate,
    }
})
const flowSrc = ref('')

const detail = ref({})
onMounted(async () => {
    getData()
})
async function getData() {
    const res = await $api.superboss({ params: params.value })
    if (res.code == 1) {
        flowSrc.value = res.list 
    }
}

</script> 
<style lang="scss" scoped>  .news {
      background-color: #ffff;

      .main {
          min-height: 300px;
      }
  }
</style>
