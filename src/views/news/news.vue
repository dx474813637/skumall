<template>
    <Header-base></Header-base>

    <div class="list-w u-p-t-10 u-p-b-10">
        <div class="home-w">
            <div class="u-p-t-10 u-p-b-10">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ name: 'news_list' }">公告资讯列表</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ detail.title }}</el-breadcrumb-item> 
                </el-breadcrumb>
            </div>

            <div class="news u-p-20">
                <div class="title u-m-b-10">
                    <el-text size="large" tag="b" style="color: #000;">{{ detail.title }}</el-text>
                </div>
                <div class="sub">
                    <el-text type="info" size="small">{{ detail.cdate }}</el-text>
                </div>
                <el-divider />
                <div class="main">
                    <el-text>{{ detail.intro }}</el-text>

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
    id: {
        type: String,
        default: ''
    }
})
const $api = inject('$api');
const params = computed(() => {
    return {
        id: props.id
    }
})

const detail = ref({})
onMounted(async () => {
    getNewsData()
})
async function getNewsData() {
    const res = await $api.web_news_detail({ params: params.value })
    if (res.code == 1) {
        detail.value = res.list
        settings.setTitle(res.list.title)
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
