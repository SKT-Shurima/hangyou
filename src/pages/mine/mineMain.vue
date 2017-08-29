<template>
    <div class="wrap">
    	<div class="infoBox">
    		<img src="../../images/mine/bg@3x.png" width="100%">
    		<div class="icon">
    			<router-link to='/setting'>
    				<i class="setting"></i>	
    			</router-link>
    			<router-link to='/msg'>
    				<i class="msg"></i>
    			</router-link>
    			
    		</div>
    		<div class="avater">
    			<!-- <img :src='userInfo.avater'> -->
    		</div>
    		<dl class="info">
    			<dt class="name" v-text='userInfo.nickname'></dt>
    			<dd class="phone" v-text='userInfo.phone'></dd>
    		</dl>
    	</div>
    	<ul class="aboutMe">
    		<li>
    			<router-link to='/orderList'>
    				<i class="order"></i><em>全部订单</em><span><x-icon type="ios-arrow-right" size="20"></x-icon></span>	
    			</router-link>
    		</li>
    		<li>
    			<router-link to='/travelers'>
    				<i class="traveler"></i><em>常用旅客</em><x-icon type="ios-arrow-right" size="20"></x-icon>
    			</router-link>
    		</li>
    		<li>
    			<router-link to='/contact'>
    				<i class="contact"></i><em>常用联系人</em><x-icon type="ios-arrow-right" size="20"></x-icon>
    			</router-link>
    		</li>
    		<li>
    			<router-link to='/coupons'>
    				<i class="coupons"></i><em>优惠券</em><x-icon type="ios-arrow-right" size="20"></x-icon>
    			</router-link>
    		</li>
    	</ul>
    </div>
</template>

<script type='text/esmascript-6'>
import {getUserInfo} from '../../config/api'
export default {
  	data () {
	    return {
	    	userInfo: {}
	    }
  	},
  	methods: {
  		getInfo(){
  			let params = {
  				access_token:  this.userInfo.access_token
  			};
  			getUserInfo(params).then(res=>{
  				let {errcode,message,content} = res;
      			if (errcode!==0) {
      				this.errcode(errcode,message);
      			}else{
      				this.userInfo = content;
      			}
  			})
  		}
  	},
  	created(){
  		let userInfo =  localStorage.userInfo;
		if (userInfo) {
			this.userInfo =  JSON.parse(userInfo);	
		}
	},
  	mounted(){
  		this.$nextTick(()=>{
  			if (!this.userInfo.access_token) {
  				let _this = this;
				this.$vux.alert.show({
				  	title: '',
				  	content: '请先登录',
				 	onShow () {
				  	},
				 	onHide () {
				    	_this.$router.replace('./login');
				  	}
				})
  			}else{
  				this.getInfo();
  			}
  		})
  	}
}
</script>
<style type="text/css" lang='scss' scoped>
@import '../../style/mixin.scss';
.wrap{
	width: 100%;
	height: 100vh;
}
.infoBox{
	position: relative;
	.icon{
		width: 100%;
		height: 44px;
		position: absolute;
		top: 0px;
		overflow: hidden;
		padding: 20px 20px 0px; 
		i{
			display: inline-block;
			width: 24px;
			height: 24px;
		}
		.setting{
			float: left;
			@include bg_image('../../images/mine/setting');
		}
		.msg{
			float: right;
			@include bg_image('../../images/mine/msg');
		}
	}
	.avater{
		width: 65px;
		height: 65px;
		position: absolute;
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
		margin: auto;
		border-radius: 50%;
		@include bg_image('../../images/mine/avater');
		img{
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}
	.info{
		position: absolute;
		left: 0px;
		right: 0px;
		bottom: 4%;
		width: 100%;
		text-align: center;
		color: #fff;
		.name{
			font-size: 16px;
			line-height: 24px;
		}
		.phone{
			font-size: 14px;
			line-height: 18px;
		}
	}
}
.aboutMe{
	li{
		padding: 14px 16px;
		@include border-bottom-1px(#f3f3f3);
		a{
			display: block;
		}
		i{
			display: inline-block;
			width: 20px;
			height: 20px;
			margin-right: 16px;
			vertical-align: bottom;
		}
		.order{
			@include bg_image('../../images/mine/order');
		}
		.traveler{
			@include bg_image('../../images/mine/traveler');
		}
		.contact{
			@include bg_image('../../images/mine/contact');
		}
		.coupons{
			@include bg_image('../../images/mine/coupons');
		}
		span{
			line-height: 20px;
			@include sc(15px,$primary_color);
		}
		em{
			@include sc(15px,#010101);
		}
		span,.vux-x-icon{
			float: right;
		}
		.vux-x-icon{
			fill: #999;
		}
	}
}
</style>