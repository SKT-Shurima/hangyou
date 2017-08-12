<template>	
	<div class="wrap">
		<div class="header">
			<div class="search">
				<icon type="search"></icon>
				<input type="text" name="" placeholder="请输入目的地">
			</div>
			<swiper auto loop :interval=3000  :list='baseList' dots-position='center'  :aspect-ratio='350/750'></swiper>	
		</div>
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
	</div>
</template>
<script type='text/esmascript-6'>
import Icon from 'vux/src/components/icon'
import {Swiper} from 'vux/src/components/swiper'
import {Flexbox,FlexboxItem} from 'vux/src/components/flexbox'

	export default {
		data(){
			return {
				baseList :[
					{img: 'https://static.vux.li/demo/1.jpg'},
				    {img: 'https://static.vux.li/demo/2.jpg'},
				    {img: 'https://static.vux.li/demo/3.jpg'}
				],

			}
		},
		components: {
			Swiper,Icon,Flexbox,FlexboxItem
		}
	}
</script>
<style type="text/css" lang='scss' scoped>
@import '../../style/mixin.scss';
	.wrap{
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
</style>
