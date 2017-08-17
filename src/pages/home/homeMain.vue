<template>	
	<div class="headWrap">
	<!-- 头部轮播图 -->
		<div class="header">
			<div class="search">
				<icon type="search"></icon>
				<input type="text" name="" placeholder="请输入目的地">
			</div>
			<swiper auto loop :interval=3000  :list='baseList' dots-position='center'  :aspect-ratio='350/750'></swiper>	
		</div>
		<!-- 主体部分 -->
		<div class="container">
			<div class="title">
				<i></i>
				人气热卖
			</div>
			<div class="main">
				<flexbox>
					<flexbox-item>
						<img src="https://static.vux.li/demo/1.jpg">
					</flexbox-item>
				</flexbox>
			</div>
			<div class="theme">
				<strong>曼谷+芭提雅</strong>
				<span>酒店升级，交通极便利</span>
			</div>
			<div class="detail">
				<flexbox>
					<flexbox-item :span='1/2'>
						<dl>
							<dt><img src="https://static.vux.li/demo/1.jpg"></dt>
							<dd class="infoName">普吉岛</dd>
							<dd class="infoDetail">入住泳池别墅和海边五星酒店</dd>
						</dl>
					</flexbox-item>
					<flexbox-item :span='1/2' style='margin-left:0px;'>
						<dl>
							<dt><img src="https://static.vux.li/demo/1.jpg"></dt>
							<dd class="infoName">普吉岛</dd>
							<dd class="infoDetail">入住泳池别墅和海边五星酒店</dd>
						</dl>
					</flexbox-item>
				</flexbox>
			</div>
		</div>
		<!-- 优惠券信息 -->
		<div v-transfer-dom>
			<x-dialog v-model='showCoupons'>
				<div class="coupons">
					<img src="../../images/home/coupons@3x.png">
					<dl>
						<dt>{{50|currency}}</dt>
						<dd>
							<div class='couponsType'>优惠抵扣</div>
							<div class="couponsDetail">{{1502681028*1000|dateStyle}}至{{1502681028*1000|dateStyle}}有效</div>
						</dd>
					</dl>
				</div>
				<div @click="showCoupons=false" style='margin-top:26px;'>
		          	<icon type='cancel' style='color:#fff;font-size: 40px;'></icon>
		        </div>
			</x-dialog>
		</div>
    </div>
	</div>
</template>
<script type='text/esmascript-6'>
import Icon from 'vux/src/components/icon'
import {Swiper} from 'vux/src/components/swiper'
import {Flexbox,FlexboxItem} from 'vux/src/components/flexbox'
import XDialog  from 'vux/src/components/x-dialog'
import TransferDom from 'vux/src/directives/transfer-dom'  
	export default {
		directives: {
		    TransferDom
		},
		data(){
			return {
				baseList :[
					{img: 'https://static.vux.li/demo/1.jpg'},
				    {img: 'https://static.vux.li/demo/2.jpg'},
				    {img: 'https://static.vux.li/demo/3.jpg'}
				],
				showCoupons: true
			}
		},
		components: {
			Swiper,Icon,Flexbox,FlexboxItem,XDialog
		}
	}
</script>
<style type="text/css" lang='scss'>
@import '../../style/mixin.scss';
	.headWrap{
		.header{
			position: relative;
			.search{
				position: absolute;
				top: 6px;
				left: 0px;
				right: 0px;
				margin: auto;
				width: 82.6%;
				height: 30px;
				line-height: 30px;
				z-index: 10;
				text-align: center;
				border-radius: 15px;
				background-color: rgba(0,0,0,.3);
				i{
					display: inline-block;
					width: 16px;
					height: 16px;
					margin-right: 6px;
					vertical-align: baseline;
					color: #fff;
				}
				input{
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
		}
		.container{
			width: 100%;
			padding: 0px 15px 80px;
			.title{
				width: 100%;
				height: 50px;
				line-height: 50px;
				font-weight: 600;
				@include sc(16px,$title_color);
				i{
					display: inline-block;
					width: 16px;
					height: 16px;
					@include bg-image('../../images/home/sentiment');
				}
			}
			.vux-flexbox-item{
				img{
					width: 100%;
				}
			}
			.theme{
				width: 100%;
				height: 36px;
				line-height: 36px;
				strong{
					@include sc(15px,#000);
				}
				span{
					margin-left: 10px;
					@include sc(13px,$hint_color);
				}
			}
			.detail{
				dl{
					padding-top: 12px;
					padding-bottom: 12px;
				}
				dl:first-child{
					padding-right: 5px;
				}
				dl:last-child{
					padding-left: 5px;
				}
				.infoName{
					@include sc(15px,#000);
					height: 30px;
					line-height: 30px;
					font-weight: 600;
				}
				.infoDetail{
					@include sc(13px,$hint_color);
				}
			}
		}
	}
	.coupons{
		position: relative;
		img{
			width: 100%;
		}
		dl{
			position: absolute;
			left: 0px;
			right: 0px;
			bottom: 15%;
			width: 80%;
			margin: auto;
			overflow: hidden;
			height: 66px;
			background-color: #fff;
			border-radius: 6px;
		}
		dt,dd{
			float: left;
			height: 100%;
		}
		dt{
			width: 25%;
			line-height: 66px;
			border-right: 1px solid #ccc;
			@include sc(16px,#ff6f6f);
		}
		dd{
			width: 75%;
			text-align: left;
			padding: 12px 10px 10px 22px ;
		}
		.couponsType{
			text-align: left;
			line-height: 22px;
			@include sc(12px,#333);
		}
		.couponsDetail{
			@include sc(6px,#999);
			line-height: 14px;
		}
	}
	.weui-dialog{
		top: 40%;
	}
</style>
