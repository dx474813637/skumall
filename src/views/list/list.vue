<template>
	<Header-base></Header-base>
	<div class="list-w">
		<div class="home-w">
            <div class="list-filters-box u-p-t-10 u-p-b-10"></div>
            <div class="list-main-box u-p-t-10 u-p-b-10">
                <div class="list">
                    <div class="list-item" v-for="item in 7" :key="item">
                        <product-card></product-card>
                    </div>
                </div>

            </div>
            <div class="list-page-box u-p-t-40 u-p-b-40">
                <el-pagination
                    v-model:current-page="currentPage1"
                    :page-size="100"
                    small 
                    background
                    layout="total, prev, pager, next"
                    :total="1000"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
            </div>
			
		</div>
	</div>
	<Footer-base></Footer-base>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from "vue";
const currentPage1 = ref(5)
const small = ref(false) 
const $api = inject('$api');  
onMounted(() => {
    $api.web_product()
})
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
} 
</script>
<style lang="scss" scoped>
// 
.list-w {
    .home-w {
        .list-main-box {
            min-height: 300px;
            .list {
                @include flex(x, start, start);
                flex-wrap: wrap;
                .list-item {
                    flex: 0 0 20%
                }
            }
        }
        .list-page-box {
            // @include flex(x, center)
        }
    }
}
</style>
