<template>
  	<div class="wrap">
    	<x-header :left-options="{backText: ''}">优惠券</x-header>
    	<div class="container">
    		<ul v-if='couponList.length'>
    			<li class="list" v-for='(item,index) in couponList' :key='index'>
    				<dl>
    					<dt class="border-right-1px">
    						{{item.discount-0|currency}}
    						<i class="top_left"></i>
    						<i class="bottom_left"></i>
    					</dt>
    					<dd>
    						<div class="name">优惠抵扣</div>
    						<div class="date" v-if='item.type==="2"'>{{item.date_start*1000|dateStyle}}至{{item.date_end*1000|dateStyle}}有效</div>
							<div class="date" v-else>{{item.date_add*1000|dateStyle}}至{{(item.date_add*1000+item.valid_period*86400*1000)|dateStyle}}有效</div>
    					</dd>
    				</dl>
    			</li>
    		</ul>
    		<div v-else class="no-coupon">
    			暂无优惠券
    		</div>
    	</div>
  	</div>
</template>

<script type='text/esmascript-6'>
import XHeader from 'vux/src/components/x-header' 
import {myCoupon} from '../../config/api'
export default {
  	data () {
	    return {
	    	couponList: []
	    }
  	},
	components: {
    	XHeader
  	},
  	methods: {
  		getCoupon(){
  			let params = {
  				access_token: this.userInfo.access_token
  			}
  			myCoupon(params).then(res=>{
  				let {errcode,message,content} = res;
      			if (errcode!==0) {
      				this.errcode(errcode,message);
      			}else{
      				this.couponList = content ;
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
  				this.$router.replace('./login');
  			}else{
  				this.getCoupon();
  			}
  		})
  	}
}
</script>
<style type="text/css" lang='scss' scoped>
@import '../../style/mixin.scss';
.wrap{
	height: 100vh;
}
	.container{
		position: fixed;
		top: 46px;
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		padding: 0px 15px;
	}
	.list{
		margin-top: 10px;
		padding: 4px;
		overflow: hidden;
		dl{
			border-radius: 5px;
			box-shadow: 0px 0px 2px 1px #e6e6e6;
			background-color: #fff;
			height: 100px;
		}
		.border-right-1px{
			border-right: 1px dashed #ccc;
		}
		dt{
			width: 28%;
			text-align: center;
			@include sc(24px,$price_color);
			line-height: 100px;
			i{
				display: inline-block;
				width: 14px;
				height: 14px;
				border-radius: 50%;
				background-color: #f7f7f7;
				box-shadow: 0px 0px 2px 1px #e6e6e6;
				z-index: 100;
			}
			.top_left{
				position: absolute;
				top: -7px;
				right: -7px;
			}
			.bottom_left{
				position: absolute;
				bottom: -7px;
				right: -7px;
			}
		}
		dd{
			width: 72%;
			padding-top: 5%;
			padding-left: 8%;
			.name{
				line-height: 36px;
				@include sc(18px,#000);
			}
			.date{
				line-height: 28px;
				@include sc(13px,$hint_color);
			}
		}
		dt,dd{
			float: left;
			position: relative;
		}
	}
	.no-coupon{
		margin: 20px auto;
		text-align: center;
		@include sc(16px,$hint_color);
	}
</style>