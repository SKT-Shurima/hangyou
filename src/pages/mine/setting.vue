<template>
  <div class="wrap">
    <x-header :left-options="{backText: ''}">设置</x-header>
    <div class="container">
    	<div class="aboutUs">
    		<cell title='用户条款协议' link='/protocol'  :is-link='true'></cell>
    		<cell title='关于我们'  link='/aboutUs'  :is-link='true'></cell>
    	</div>
    	<div class="quit" @click='quit'>	
			退出登录
    	</div>
    </div>
  </div>
</template>

<script type='text/esmascript-6'>
import XHeader from 'vux/src/components/x-header' 
import Cell from 'vux/src/components/cell'   
export default {
  	data () {
	    return {
	    }
  	},
  	components: {
    	XHeader,Cell
  	},
  	methods: {
  		quit(){
  			let userInfo = localStorage.userInfo;
  			if (userInfo) {
  				localStorage.removeItem('userInfo');
  			}
  			this.$router.replace('/home');

  		}
  	},
}
</script>
<style type="text/css" lang='scss' scoped>
@import '../../style/mixin.scss';
.wrap{
  height: 100vh;
}
.wrap,.container{
	width: 100%;
	background-color: #f7f7f7;
}
.aboutUs{
	@include border-bottom-1px(#e6e6e6);
	background-color: #fff;
}
.weui-cell{
	padding: 14px 15px !important;
	font-size: 15px;
	line-height: 18px;
}

.vux-label,.weui-label{
	@include sc(16px, $text_color);
}
.weui-cell__ft,.weui-cell__bd{
	@include sc(14px,$hint_color);
}
.quit{
	width: 80%;
	height: 49px;
	line-height: 49px;
	margin: 60px auto;
	border-radius: 5px;
	@include sc(16px,#fff);
	text-align: center;
	background-color: $primary_color;
}
</style>