<!--  -->
<template>
	<div class="u-p-10 box">
	  <table-query-product></table-query-product>
	</div>
	
  </template>
  
  <script setup lang='ts'>
  import { reactive,ref, inject} from 'vue'  
  const $api: any = inject('$api')
  </script>
  <style lang='scss' scoped>
  .box {
	@extend %box-sizing;
  }
  </style>