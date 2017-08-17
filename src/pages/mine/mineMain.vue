<template>
    <div class="wrap">
    	<div class="infoBox">
    		<img src="../../images/mine/bg@3x.png" width="100%">
    		<div class="icon">
    			<i class="setting"></i>
    			<i class="msg"></i>
    		</div>
    		<div class="avater">
    			<img src="https://static.vux.li/demo/1.jpg">
    		</div>
    		<dl class="info">
    			<dt class="name">圆周率</dt>
    			<dd class="phone">华盛达1918</dd>
    		</dl>
    	</div>
    	<ul class="aboutMe">
    		<li>
    			<i class="order"></i>全部订单 <span>待付款<x-icon type="ios-arrow-right" size="20"></x-icon></span>
    		</li>
    		<li>
    			<i class="traveler"></i>常用旅客 <x-icon type="ios-arrow-right" size="20"></x-icon>
    		</li>
    		<li>
    			<i class="contact"></i>常用联系人<x-icon type="ios-arrow-right" size="20"></x-icon>
    		</li>
    		<li>
    			<i class="coupons"></i>优惠券 <x-icon type="ios-arrow-right" size="20"></x-icon>
    		</li>
    	</ul>
    </div>
</template>

<script type='text/esmascript-6'>
export default {
  	data () {
	    return {
	    	src: 'https://static.vux.li/demo/1.jpg',
	    }
  	},
  	methods: {
  	},
}
</script>
<style type="text/css" lang='scss' scoped>
@import '../../style/mixin.scss';
.wrap{
	width: 100%;
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
		@include sc(15px,#010101);
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
			color: $primary_color;
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