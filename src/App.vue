<template>
	<div class="appWrap">
		<transition>
				<router-view v-transition></router-view>
    	</transition>
    </div>
</template>

<script>

  	export default {
    	
  	}

</script>

<style type="text/css" lang='scss'>
	@import './style/base.scss';
	.appWrap{
		width: 100%;
		height: 100%;
	}
</style>
