<template>
	<div class="appWrap">
		<transition>
    		<router-view></router-view>
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
	/*.fade-enter-active, .fade-leave-active {
		 opacity: 0;
    	transform: translate3d(-2000px, 0, 0);
    	transition: all .5s linear;
	}
	.fade-enter, .fade-leave-active {
	  	opacity: 1;
    	transform: none;
	}*/
</style>
