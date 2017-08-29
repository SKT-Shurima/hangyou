<template>
	<div class="wrap">
		<transition>
				<router-view v-transition></router-view>
    	</transition>
		<tabbar class='footerNav'>
	        <tabbar-item link='/home' :selected='tabIndex===1'>
		        <i slot='icon' class='home'></i>
		        <span slot="label">首页</span>
	      	</tabbar-item>
		    <tabbar-item link='/preMain' :selected='tabIndex===2'>
		        <i slot='icon' class='preMain'></i>
		        <span slot="label">预定</span>
		    </tabbar-item>
	      	<tabbar-item link='/mine' :selected='tabIndex===3'>
	        	<i slot='icon' class='mine'></i>
	        	<span slot="label">我的</span>
	      	</tabbar-item>
	    </tabbar>
	</div>
</template>
<script type='text/esmascript-6'>
import tabbar from 'vux/src/components/tabbar/tabbar' 
import tabbarItem from 'vux/src/components/tabbar/tabbar-item' 
	export default {
		data(){
			return {
				tabIndex: 1,
			}
		},
		components: {
			tabbar,tabbarItem
		},
		mounted(){
			this.$nextTick(()=>{
				let hash =  location.hash;
				if (hash.indexOf('home')>-1) {
					this.tabIndex = 1;
				}
				if (hash.indexOf('preMain')>-1) {
					this.tabIndex = 2;
				}
				if (hash.indexOf('mine')>-1) {
					this.tabIndex = 3;
				}
			})
		}
	}
</script>
<style type="text/css" lang='scss' scoped>
	@import '../style/mixin.scss';
	.home,.preMain,.mine{
		display: inline-block;
		width: 26px;
		height: 26px;
	}
	.weui-tabbar__item.weui-bar__item_on{
		.home{
			@include bg-image('../images/common/home-active');
		}
		.preMain{
			@include bg-image('../images/common/preMain-active');
		}
		.mine{
			@include bg-image('../images/common/mine-active');
		}
	}
	.home{
		@include bg-image('../images/common/home');
	}
	.preMain{
		@include bg-image('../images/common/preMain');
	}
	.mine{
		@include bg-image('../images/common/mine');
	}
	.footerNav{
		position: fixed;
		bottom: 0px;
	}
</style>