<template>
  <div class="wrap">
    <x-header :left-options="{backText: ''}">产品详情</x-header>
    <div class="box">
    	<div class="mainInfo">
	    	<div class="mainImg">
		 		<img src="https://static.vux.li/demo/1.jpg">
		 	</div>
		 	<dl class="goodInfo">
	     		<dt class="name">
	     			香港5日游自由行
	     		</dt>
	     		<dd class="detail">
	     			欢庆香港回归20周年欢庆香港回归20周年欢庆香港回归20周年欢庆香港回归20周年欢庆香港回归20周年欢庆香港回归20周年欢庆香港回归20周年欢庆香港回归20周年欢庆香港回归20周年
	     		</dd>
	     		<dd class="price">
	     			<span><strong>{{2099|currency}}</strong>/人</span>起
			      	<em>{{8666|currency}}/人</em>
			      	<i>126人购买</i> 
	     		</dd>
	     	</dl>
	    </div>
	    <div class="container">
	     	<div class="goodDetail">
	     		<h1 class="title">
	     			<span>
	     				产品详情
	     			</span>
	     		</h1>
	     		<div class="intro">
	     		</div>
	     	</div>
	    </div>
    </div>
    <div class="submit">
    	预定
    </div>
  </div>
</template>

<script type='text/esmascript-6'>
import XHeader from 'vux/src/components/x-header'
export default {
  	data () {
	    return {
	    }
  	},
  	methods: {

	},
   	components: {
    	XHeader
  	}
}
</script>
<style type="text/css" lang='scss' scoped>
@import '../../style/mixin.scss';
	.wrap{
		background-color: #f7f7f7;
	}
	.box{
		position: fixed;
		top: 46px;
		left: 0px;
		overflow-y: scroll; 
	}
	.mainInfo{
		background-color: #fff;
	}
	.container{
		padding: 0px 16px 100px;
		background-color: #fff;
	}
	.mainImg{
		width: 100%;
		img{
			width: 100%;
		}
	}
	.goodInfo{
		padding:0px 16px 10px;
		.name{
			line-height: 22px;
			margin: 8px 0px;
			@include sc(16px,#000);
		    @include ellipsis(1);
		}
		.detail{
			line-height: 16px;
		    @include ellipsis(2);
			@include sc(13px,$detail_color);
		}
		.price{
			margin-top: 10px;
			@include sc(14px,$title_color);
			overflow: hidden;
			span{
				padding-right: 6px;
			}
			strong {
				@include sc(16px,$price_color);
			}
			em,i{
				@include sc(12px,$hint_color);
			}
			em{
				margin-left: 6px;
				text-decoration: line-through;
			}
			i{
				float: right;
				font-style: normal;
				margin-top: 6px;
			}
		}
	}
	.goodDetail{
		margin-top: 12px;
		padding-top: 12px;
		.title{
			text-align: center;
			font-size: 16px;
			span{
				padding: 6px 0px;
				border-bottom: 2px solid  $primary_color;
			}
		}
	}
	.submit{
		position: fixed;
		z-index: 99999;
		bottom: 0px;
		width: 100%;
		height: 50px;
		line-height: 50px;
		background-color: $primary_color;
		text-align: center;
		@include sc(16px,#fff);
	}
</style>