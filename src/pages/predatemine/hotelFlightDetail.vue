<template>
  <div class="wrap">
    <x-header :left-options="{backText: ''}">酒店航班详情</x-header>
  	<div class="container">
		<div class="hotelInfo">
			<h1>酒店信息<a href="">详情</a></h1>
			<dl v-for='item in 1'>
				<dt class="date">
					{{1512121211*1000|dateStyle}}至{{1512121211*1000|dateStyle}}
				</dt>
				<dd class="name">
					香港铜锣湾皇悦酒店
				</dd>
				<dd class="image">
  				<span>Loading...</span>
  				<x-img :src="src" :webp-src="`${src}?type=webp`" @on-success="success" @on-error="error" class="ximg-demo" error-class="ximg-error" :offset="-100" container="#app"></x-img>
  			</dd>
			</dl>
		</div>
		<div class="flightInfo">
			<h1>航班信息</h1>
			<div class="go">
				<dl>
					<dt class="title">杭州-香港（往）</dt>
					<dd class="site">
						<flexbox>
							<flexbox-item>
								<div class="airport">杭州萧山机场T3</div>
								<div class="time">07:25</div>
							</flexbox-item>
							<flexbox-item class='icon'>
								<span></span>
								<i class="airIcon"></i>
								<span></span>
							</flexbox-item>
							<flexbox-item>
								<div class="airport">杭州萧山机场T3</div>
								<div class="time">07:25<em>+1</em></div>
							</flexbox-item>
						</flexbox>
					</dd>
				</dl>
				<table cellspacing="0" class="flightTable">
					<tr class="tableHead">
						<th>出发日期</th>
						<th>航班编号</th>
						<th>航空公司</th>
						<th>所乘机型</th>
					</tr>
					<tr>
						<td>{{1512121211*1000|dateStyle}}</td>
						<td>12306</td>
						<td>杭州圆周率</td>
						<td>歼-20</td>
					</tr>
				</table>
			</div>
			<div class="back">
				<dl>
					<dt class="title">杭州-香港（返）</dt>
					<dd class="site">
						<flexbox>
							<flexbox-item>
								<div class="airport">杭州萧山机场T3</div>
								<div class="time">07:25</div>
							</flexbox-item>
							<flexbox-item class='icon'>
								<span></span>
								<i class="airIcon"></i>
								<span></span>
							</flexbox-item>
							<flexbox-item>
								<div class="airport">杭州萧山机场T3</div>
								<div class="time">07:25</div>
							</flexbox-item>
						</flexbox>
					</dd>
				</dl>
				<table cellspacing="0" class="flightTable">
					<tr class="tableHead">
						<th>出发日期</th>
						<th>航班编号</th>
						<th>航空公司</th>
						<th>所乘机型</th>
					</tr>
					<tr>
						<td>{{1512121211*1000|dateStyle}}</td>
						<td>12306</td>
						<td>杭州圆周率</td>
						<td>歼-20</td>
					</tr>
				</table>
			</div>
		</div>
  	</div>
  </div>
</template>

<script type='text/esmascript-6'>
import XHeader from 'vux/src/components/x-header'
import XImg from 'vux/src/components/x-img'
import {Flexbox,FlexboxItem} from 'vux/src/components/flexbox'
export default {
  	data () {
	    return {
	    	src: 'https://static.vux.li/demo/1.jpg'
	    }
  	},
	components: {
    	XHeader,XImg,Flexbox,FlexboxItem
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
		h1{
			margin: 6px 0px;
			overflow: hidden;
			@include sc(16px,#000);
			a{
				float: right;
				text-decoration: underline;
				@include sc(14px,$primary_color);
			}
		}

		.hotelInfo{
			padding: 10px 14px;
			background-color: #fff;
			dl{
				line-height: 24px;
				@include sc(14px,$title_color);
			}
			.image{
				width: 100%;
				margin-top: 10px;
			}
		}
		.flightInfo{
			padding: 10px 14px;
			margin-top: 10px;
			background-color: #fff;
			.go,.back{
				.title{
					width: 100%;
					height: 35px;
					line-height: 35px;
					text-align: center;
					@include sc(15px,#fff);
					background-color: $primary_color;
				}
				.vux-flexbox-item{
					text-align: center;
				}
				.site{
					width: 100%;
					text-align: center;
					padding: 10px 0px;
				}
				.airport{
					line-height: 16px;
					@include sc(14px,#000);
				}
				.time{
					line-height: 40px;
					@include sc(25px,$title_color);
					em{
						@include sc(14px,$price_color);
					}
				}
				.icon{
					span{
						display: inline-block;
						width: 30px;
						@include border-bottom-1px($primary_color);
					}
				}
				.airIcon{
					&::after{
						display: inline-block;
						content: "";
						width: 24px;
						height: 24px;
						vertical-align: top;
						margin: 0px 4px;
						@include bg_image('../../images/predatemine/air');
					};
				}
			}
			.flightTable{
				width: 100%;
				.tableHead{
					width: 100%;
					height: 35px;
					background-color: #e6e6e6;
					@include sc(12px,$detail_color);
				}
				tr{
					height: 49px;
					@include sc(13px,#000);
					background-color: #f7f7f7;
				}
				td,th{
					text-align: center;
				}
			}
			.back{
				margin-top: 20px;
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
</style>