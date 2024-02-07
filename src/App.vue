<script setup lang="ts">
import { watch } from 'vue'
import router from '@/router/guard'
// import {
//   baseStore
// } from '@/stores/main.js';
// const base = baseStore()
watch(
	() => router.currentRoute.value,
	(n) => { 
		document.body.scrollTop = 0
		document.documentElement.scrollTop = 0
	},
	{
		deep: true
	}
) 
</script>

<template>
	<!-- <div>
      <router-link to="/index">index</router-link>
      <router-link to="/home">home</router-link>
      <router-link to="/login">login</router-link>
    </div> -->
	<router-view :key="router.currentRoute.value.fullPath"></router-view>
</template>

<style scoped lang="scss"> body,
 html {
 	margin: 0;
 	padding: 0;
 }
 
</style>
