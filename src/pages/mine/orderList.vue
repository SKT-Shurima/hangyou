<template>
  <div class="wrap">
   	<x-header :left-options="{showBack: false}">全部订单</x-header>
    <div class="container">
	    <ul class="panel">
	    	<li v-for='(item,index) in 12'>
	    		<dl>
	    			<dt>
	    				<span>Loading...</span>
	  					<x-img :src="src" :webp-src="`${src}?type=webp`" @on-success="success" @on-error="error" class="ximg-demo" error-class="ximg-error" :offset="-100" container="#app"></x-img>
	    			</dt>
	    			<dd>
	    				<div class="name">
	    					杭州
	    				</div>
	    				<div class="detail">
	    					杭州是个好地方杭州是个好地方杭州是个好地方
	    				</div>
	    				<div class="price">
							{{399|currency}}
						</div>
	    			</dd>
	    		</dl>
	    		<flexbox class='date'>
	    			<flexbox-item class='time' :span='7/15'>出发日期：{{1512125541*1000|dateStyle}}</flexbox-item>
	    			<flexbox-item class='notice' :span='8/15' style='margin-left:0px;'>
	    				<span v-if='index===0'>
	    					<button class="default_btn">取消订单</button>
	    					<button class="primary_btn">立即支付</button>
	    				</span>
	    				<span v-if='index===1'>已取消</span>
	    				<span v-if='index===2'>已过期</span>
	    				<span v-if='index===3' class="primary">
	    					已付款，待确认&nbsp;<button class="text_btn">退款</button>
	    				</span>
	    				<span v-if='index===4' class="warning">
	    					审核失败，系统已为您退款
	    				</span>
	    				<span v-if='index===5'>
	    					已付款，已确认&nbsp;<button class="text_btn">退款</button>
	    				</span>
	    				<span v-if='index===6' class="primary">
	    					退款受理中&nbsp;<button class="default_btn">取消退款</button>
	    				</span>
	    				<span v-if='index===7'>
	    					退款失败
	    				</span>
	    				<span v-if='index===8'>
	    					成功退款 <em class="price">{{3066|currency}}</em>
	    				</span>
	    				<span v-if='index===9' class="primary ">
	    					正在进行
	    				</span>
	    				<span v-if='index===10'>
	    					已完成
	    				</span>
	    				<span v-if='index===11' class="primary">
	    					已付款，待确认
	    				</span>
	    				<span v-if='index===12'>	
							已付款，已确认
	    				</span>
	    			</flexbox-item>
	    		</flexbox>
	    	</li>
	    </ul>
	    <div class="noMore">
			没有更多了
		</div>
    </div>
  </div>
</template>

<script type='text/esmascript-6'>
import XHeader from 'vux/src/components/x-header' 
import {Flexbox,FlexboxItem} from 'vux/src/components/flexbox' 
import XImg from 'vux/src/components/x-img'
export default {
  	data () {
	    return {
	    	src: 'https://static.vux.li/demo/1.jpg',
	    }
  	},
  	methods: {
  		success (src, ele) {
		    console.log('success load', src)
		    const span = ele.parentNode.querySelector('span')
		    ele.parentNode.removeChild(span)
		},
	    error (src, ele, msg) {
	      	console.log('error load', msg, src)
		    const span = ele.parentNode.querySelector('span')
		    span.innerText = 'load error'
	    },
	    change (val) {
	      console.log('val change', val)
	    },
	    ensure(){
	    	console.log(this.dateVal[0])
	    }
  	},
   components: {
    XHeader,Flexbox,FlexboxItem,XImg
  },
}
</script>
<style type="text/css" lang='scss' scoped>
@import '../../style/mixin.scss';
.container{
	position: fixed;
	top: 46px;
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	padding-bottom: 120px;
	background-color: #f7f7f7;
}
.panel{
	li{
		@include border-bottom-1px(#e6e6e6);
	}
	dl{
		display: -webkit-box;
		padding: 10px;
		@include border-bottom-1px(#e6e6e6);
	}
	dt{
		display: inline-block;
		text-align: center;
		overflow: hidden;
		width: 125px;
		height: 95px;
		img{
			width: 100%;
			height: 100%;
		}
	}
	dd{
		-webkit-box-flex: 1;
		margin-left: 16px;
		.name{
			line-height: 24px;
			@include sc(16px,#000);
			@include ellipsis(1);
		}
		.detail{
			line-height: 16px;
			@include sc(13px,$detail_color);
			@include ellipsis(2);
			margin: 8px 0px 10px;
		}
		.price{
			@include sc(16px,$price_color);
		}
	}
	.date{
		padding: 10px;
		height: 49px;
		line-height: 49px;
		color: $hint_color;
	}
	.time{
		font-size: 14px;
	}
	.notice{
		font-size: 13px;
		text-align: right;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		.primary{
			color: $primary_color;
		}
		.warning{
			color: #ffc103;
		}
		.price{
			color: $price_color;
		}
		button{
			display: inline-block;
			width: 74px;
			height: 25px;
			outline: none;
			line-height: 24px;
			text-align: center;
			border-radius: 5px;
		}
		.primary_btn{
			background-color: $primary_color;
			@include border-1px($primary_color);
			color: #fff;
		}
		.default_btn{
			background-color: #fff;
			@include border-1px($hint_color);
		}
		.text_btn{
			background-color: #fff;
			@include border-1px($primary_color);
			color: $primary_color;
		}
	}
}
.noMore{
	margin-top: 16px;
	text-align: center;
	@include sc(15px,$hint_color);
}
</style>