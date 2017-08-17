<template>
  <div class="wrap">
    <x-header :left-options="{showBack: false}">
    	<x-icon type="ios-close-empty" size="42"></x-icon>
    	<div class="search">
			<icon type="search"></icon>
			<input type="text" name="" placeholder="请输入目的地">
		</div>
		<span class="searchBtn">搜索</span>
	</x-header>
	<div class="container">
		<ul>
			<li v-for='item  in 12'>
				<dl class="list">
		      		<dt>
		      			<div class="name">
		      				香港5日自由行香港5日自由行香港5日自由行香港5日自由行香港5日自由行
		      			</div>
		      			<div class="detail">
		      				欢庆香港回归20周年，精选热门酒店欢庆香港回归20周年，精选热门酒店欢庆香港回归20周年，精选热门酒店
		      			</div>
		      			<div class="price">
		      				<span><strong>{{2099|currency}}</strong>/人</span>起
		      				<em>{{8666|currency}}/人</em> 
		      			</div>
		      		</dt>
		      		<dd>
		      			 <x-img :src="src" webp-src="`${src}?type=webp`" @on-success="success" @on-error="error" class="ximg-demo"  :offset="-100" container="#app"></x-img>	
		      		</dd>
		      	</dl>
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
import Icon from 'vux/src/components/icon'
import {Flexbox,FlexboxItem} from 'vux/src/components/flexbox'
import XImg from 'vux/src/components/x-img'
export default {
  	data () {
	    return {
	    	src: 'https://static.vux.li/demo/1.jpg'
	    }
  	},
  	methods: {
  		success (src, ele) {
	      	const span = ele.parentNode.querySelector('span')
	      	ele.parentNode.removeChild(span)
	    },
	    error (src, ele, msg) {
	      	const span = ele.parentNode.querySelector('span')
	      	span.innerText = 'load error'
	    }
	},
   	components: {
    XHeader,Icon,XImg,Flexbox,FlexboxItem
  	},
}
</script>
<style type="text/css" lang='scss' scoped>
	@import '../../style/mixin.scss';
	.vux-header{
		width: 100%;
		position: fixed;
		top: 0px;
		left: 0px;
		z-index: 999999;
	}
	.vux-x-icon.vux-x-icon-ios-close-empty{
		position: absolute;
		left: 2%;
		fill: #fff;

	}
	.searchBtn{
		position: absolute;
		right: 3%;
		font-size: 16px;
	}
	.search{
		position: absolute;
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		margin: auto;
		width: 69.3%;
		height: 30px;
		line-height: 30px;
		z-index: 10;
		text-align: left;
		border-radius: 15px;
		background-color: rgba(255,255,255,.3);
		i{
			display: inline-block;
			width: 16px;
			height: 16px;
			margin: 2px 6px 0px;
			vertical-align: baseline;
			color: #fff;
		}
		input{
			width: 60%;
			outline: none;
			border: none;
			@include sc(16px,#fff);
			margin-top: 7px;
			background-color: transparent;
			&::-webkit-input-placeholder { /* WebKit browsers */
			    color: #fff;
			}
			&:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
			    color: #fff;
			}
			&::-moz-placeholder { /* Mozilla Firefox 19+ */
			    color: #fff;
			}
			&:-ms-input-placeholder { /* Internet Explorer 10+ */
			    color: #fff;
			}
		}
		input:active{
			width: 80%;
		}
	}
	.container{
		position:fixed;
		top: 50px;
		left: 0px;
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		overflow-x: hidden;
		padding-bottom: 100px;
		li{
			.list{
				display: -webkit-box;
				height: 120px;
				padding: 12px 0px;
				@include border-bottom-1px(#dedede);
			}
			dt{
				padding-left: 12px;
				padding-right: 5px;
    			-webkit-box-flex: 1;
			}
			.name{
				@include sc(15px,#000);
				line-height: 22px;
			    @include ellipsis(1);
			    margin-bottom: 12px;
			}
			.detail{
				line-height: 16px;
			    @include ellipsis(2);
				@include sc(13px,$detail_color);
			}
			.price{
				margin-top: 8px;
				@include sc(14px,$title_color)
				span{
					padding-right: 6px;
				}
				strong {
					@include sc(16px,$price_color);
				}
				em{
					margin-left: 6px;
					text-decoration: line-through;
					@include sc(12px,$hint_color);
				}
			}
			dd{
				display: inline-block;
			    text-align: center;
			    overflow: hidden;
			    width: 125px;
			    height: 85px;
			    margin: 0px 16px;
			}
		}
		.noMore{
			margin-top: 16px;
			text-align: center;
			@include sc(15px,$hint_color);
		}
	}
	.ximg-error:after {
	  content: '加载失败';
	  color: red;
	}
</style>