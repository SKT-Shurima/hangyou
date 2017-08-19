<template>
  <div class="wrap">
    <x-header :left-options="{backText: ''}">选择特定项目</x-header>
    <div class="container">
    	<dl class="orderDetail">
    		<dt>
      			<span>Loading...</span>
	  			<x-img :src="src" :webp-src="`${src}?type=webp`" @on-success="success" @on-error="error" class="ximg-demo" error-class="ximg-error" :offset="-100" container="#app"></x-img>	
      		</dt>
			<dd>
      			<div class="name">
      				香港5日自由行香港5日自由行香港5日自由行香港5日自由行香港5日自由行
      			</div>
      			<div class="detail">
      				欢庆香港回归20周年，精选热门酒店欢庆香港回归20周年，精选热门酒店欢庆香港回归20周年，精选热门酒店
      			</div>
      			<div class="priceBox">
      				<em class="price">{{2099|currency}}</em>
      				<span class="notice">已付款，待确认</span>
      			</div>
      		</dd>
    	</dl>
    	<div class="travelInfo">
  			<h1>酒店信息<em>（已确认）</em><a href="">详情</a></h1>
  			<dl v-for='item in 2'>
  				<dt class="date">
  					{{1512121211*1000|dateStyle}}至{{1512121211*1000|dateStyle}}
  				</dt>
  				<dd class="name">
  					香港铜锣湾皇悦酒店
  				</dd>
  			</dl>
  			<h1 style="margin-top:10px;">航班信息<em :class='{"primary":true}'>（未确认）</em></h1>
  			<dl v-for='item in 3'>
  				<dt class="date">
  					{{1512121211*1000|dateStyle}}
  				</dt>
  				<dd class="site">
  					杭州（07：25）<i class="airIcon"></i>香港（10:52）<em>+1</em>
  				</dd>
  			</dl>
  		</div>
  		<div class="special">
  			<h1 class="title">特色项目</h1>
  			<ul>
				<li v-for='item in 2'>
					<dl>
						<dt>
							<span>Loading...</span>
		  					<x-img :src="src" :webp-src="`${src}?type=webp`" @on-success="success" @on-error="error" class="ximg-demo" error-class="ximg-error" :offset="-100" container="#app"></x-img>
						</dt>
						<dd>
							<div class="name">项目介绍</div>
							<div class="chooseDate">
								使用日期：{{1512121211*1000|dateStyle}}
							</div>
							<div class="priceInfo">
								<div class="price">
									<em>{{399|currency}}</em>/人	
								</div>
								<div class="chooseNum">份数：<i>12</i></div>
							</div>
						</dd>
					</dl>
				</li>
		  	</ul>
  		</div>
  		<div class="traveler">
  			<h1 class="title">旅客信息</h1>
  			<dl class="infoDetail" v-for='item in 2'>
    			<dt class="name">圆周率</dt>
    			<dd class="spell">
    				<strong>YUAN/ZHOULV</strong>
    				<x-icon type="ios-arrow-right" size="18"></x-icon>
    			</dd>
    			<dd class="num">
    				<span>护照编号：</span><em>10086</em>
    			</dd>
    		</dl>
  		</div>
  		<div class="contact">
  			<h1 class="title">联系人信息</h1>
  			<dl class="infoDetail" v-for='item in 2'>
    			<dt class="name">圆周率</dt>
    			<dd class="spell">
    				<strong>12306</strong>
    			</dd>
    			<dd class="num">
    				浙江省杭州市滨江区华盛达广场1918圆周率
    			</dd>
    		</dl>
  		</div>
  		<div class="orderInfo">
  			<h1 class="title">订单信息</h1>
  			<div class="order">
  				<span>订单编号：</span>12306
  			</div>
  			<div class="order">
  				<span>订单编号：</span>12306
  			</div>
  			<p>
  				<span>备注信息：</span>不要说太多不要说太多不要说太多不要说太多不要说太多不要说太多
  			</p>
  		</div>
    </div>
     <div v-transfer-dom class="confirm">
	    <confirm v-model="confirmBol"
	    @on-cancel="onCancel"
	    @on-confirm="onConfirm">
	        <p>是否申请退款?</p>
	    </confirm>
    </div>
	 <div class="submit" @click='confirmBol=true'>
     	退款
    </div>
  	</div>
</template>

<script type='text/esmascript-6'>
import XHeader from 'vux/src/components/x-header'
import XImg from 'vux/src/components/x-img'
import VNumber from '../../comment/v-number'
import Popup from 'vux/src/components/popup'
import Picker from 'vux/src/components/picker'
import {Flexbox,FlexboxItem} from 'vux/src/components/flexbox'
import TransferDom from 'vux/src/directives/transfer-dom' 
import confirm from 'vux/src/components/confirm' 
export default {
	directives: {
	    TransferDom
	},
  	data () {
	    return {
	    	src: 'https://static.vux.li/demo/1.jpg',
	    	confirmBol: false
	    }
  	},
	components: {
    	XHeader,XImg,VNumber,Picker,Popup,Flexbox,FlexboxItem,confirm
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
	    },
	    onCancel(){

	    },
	    onConfirm(){

	    }
	},
  	mounted(){
  		this.$nextTick(()=>{
  			
  		})
  	}
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
		padding-bottom: 100px;
		background-color: #f7f7f7;
		.orderDetail{
			display: -webkit-box;
			padding: 10px;
			@include border-bottom-1px($border_color);
			background-color: #fff;
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
					line-height: 18px;
					@include sc(13px,$detail_color);
					@include ellipsis(2);
					margin: 10px 0px 12px;
				}
				.priceBox{
					overflow: hidden;
					font-size: 14px;
					em{
						float: left;
						color: $price_color;
					}
					span{
						float: right;
						color: $primary_color;
					}
				}
			}
		}
		h1{
			margin: 6px 0px;
			overflow: hidden;
			font-weight: 600;
			@include sc(16px,#000);
			a{
				float: right;
				text-decoration: underline;
				@include sc(14px,$primary_color);
			}
			em{
				@include sc(14px,$hint_color);
			}
			.primary{
				color: $primary_color;
			}
		}
		.travelInfo,.contact,.orderInfo,.special,.traveler{
			margin-top: 10px;
			background-color: #fff;
		}
		.travelInfo{
			padding: 10px 14px;
			dl{
				line-height: 28px;
				@include sc(14px,$title_color);
			}
			.site{
				color: #000;
				em{
					color: $price_color;
				}
			}
			.airIcon{
				&::after{
					display: inline-block;
					content: "";
					width: 24px;
					height: 24px;
					vertical-align: middle;
					margin: 0px 4px;
					@include bg_image('../../images/predatemine/air');
				};
			}
		}
		h1.title{
			height: 40px;
			line-height: 40px;
			padding-left: 14px;
			@include border-bottom-1px($border_color);
		}
		.special{
			dl{
				display: -webkit-box;
				padding: 14px 0px 12px;
				@include border-bottom-1px($border_color);
			}
			dt{
				display: inline-block;
			    text-align: center;
			    overflow: hidden;
				width: 85px;
				height: 85px;
				margin: 0px 15px;
				img{
					width: 100%;
					height: 100%;
				}
			}
			dd{
				-webkit-box-flex: 1;
				padding-right: 15px;
			}
			.name{
				@include sc(15px,#000);
				@include ellipsis(1);
			}
			.chooseDate{
				@include sc(13px,$detail_color);
				margin: 10px 0px 16px;
				.icon{
					display: inline-block;
					width: 12px;
					height: 12px;
					vertical-align: -2px;
					@include bg-image('../../images/predatemine/down');
				}
			}
			.priceInfo{
				overflow: hidden;
				.price{
					float: left;
					@include sc(15px,$title_color);
					em{
						@include sc(16px,$price_color);
					}
				}
			}
			.chooseNum{
				float: right;
				margin-top: 4px;
				@include sc(14px,#ccc);
				i{
					color: $primary_color;
				}
			}
		}
		.traveler{
			.infoDetail{
				font-size: 15px;
				line-height: 27px;
				padding: 10px 14px;
				.name{
					color: #000;
				}
				.spell{
					color: $title_color;
					.vux-x-icon{
						float: right;
						fill: #ccc;
						margin-top: 2px;
					}
				}
				.num{
					span{
						color: $hint_color;
					}
					em{
						color: $title_color;
					}
				}
			}
		}
		.contact{
			.infoDetail{
				font-size: 15px;
				line-height: 27px;
				padding: 10px 14px;
				@include border-bottom-1px($border_color);
				.name{
					color: #000;
				}
				.spell{
					color: $title_color;
					.vux-x-icon{
						float: right;
						fill: #ccc;
						margin-top: 2px;
					}
				}
				.num{
					span{
						color: $hint_color;
					}
					em{
						color: $title_color;
					}
				}
			}
		}
		.orderInfo{
			@include sc(15px,$title_color);
			line-height: 30px;
			.order,p{
				padding: 0px 14px;
			}
			span{
				color: $hint_color;
			}
		}
	}
	.ximg-demo {
	  	width: 100%;
	  	height: auto;
	}
	.ximg-error {
	  	background-color: #f7f7f7;
	}
	.ximg-error:after {
	  	content: '加载失败';
	  	color: red;
	}
	.confirm p{
		@include sc(16px,#23232e);
		text-align: center;
	}
	.submit{
		position: fixed;
		bottom: 0px;
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		background-color: $primary_color;
		@include sc(16px,#fff);
	}
</style>
<style type="text/css">
	.confirm .weui-dialog{
		background-color: #fff;
	}
</style>