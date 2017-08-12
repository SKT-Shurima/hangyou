<template>	
	<div class="wrap">
		<div class="header">
			<div class="search">
				<icon type="search" style='margin-top: -2px;color:#fff;'></icon>
				<input type="text" name="" placeholder="请输入目的地">
			</div>
			<swiper auto loop :interval=3000  :list='baseList' dots-position='center'  :aspect-ratio='350/750'></swiper>	
		</div>
		
	</div>
</template>
<script type='text/esmascript-6'>
import Icon from 'vux/src/components/icon'
import {Swiper } from 'vux'
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
			Swiper,Icon
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
				}
				input{
					outline: none;
					border: none;
					@include sc(16px,#fff);
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
	}
</style>
