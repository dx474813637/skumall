<!--  -->
<template>
	<div></div>
</template>

<script setup lang='ts'>
import { reactive, ref, inject, onMounted } from 'vue'
import { userStore } from '@/stores/user';
const user = userStore()
const $api: any = inject('$api')
onMounted(() => {
	user.getUserData()
})
</script>
<style lang='scss' scoped></style>