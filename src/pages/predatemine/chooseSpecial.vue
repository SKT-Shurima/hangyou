<template>
  <div class="wrap">
    <x-header :left-options="{backText: ''}">选择特定项目</x-header>
    <div class="container">
    	<ul>
			<li v-for='item in 12'>
				<dl>
					<dt>
						<span>Loading...</span>
	  					<x-img :src="src" :webp-src="`${src}?type=webp`" @on-success="success" @on-error="error" class="ximg-demo" error-class="ximg-error" :offset="-100" container="#app"></x-img>
					</dt>
					<dd>
						<div class="name">项目介绍</div>
						<div class="chooseDate">
							<span v-text='date' @click='chooseBol=true'></span><i class="icon"></i>
						</div>
						<div class="priceInfo">
							<div class="price">
								<em>{{399|currency}}</em>/人	
							</div>
							<div class="chooseNum">份数&nbsp;&nbsp;<v-number></v-number></div>
						</div>
					</dd>
				</dl>
			</li>
	  	</ul>
	  	<div class="noMore">
			没有更多了
		</div>
    </div>
 	<div v-transfer-dom>
  		<popup v-model="chooseBol" @on-hide="" @on-show="">
  			<dl class="opera">
  				<dt @click='chooseBol=false'>取消</dt>
  				<dd @click='ensure'>确定</dd>
  			</dl>
  			<picker :data='list' v-model='dateVal' @on-change='change'></picker>
  		</popup>
	</div>
  	</div>
</template>

<script type='text/esmascript-6'>
import XHeader from 'vux/src/components/x-header'
import XImg from 'vux/src/components/x-img'
import VNumber from '../../comment/v-number'
import Popup from 'vux/src/components/popup'
import Picker from 'vux/src/components/picker'
import TransferDom from 'vux/src/directives/transfer-dom' 
export default {
	directives: {
	    TransferDom
	},
  	data () {
	    return {
	    	src: 'https://static.vux.li/demo/1.jpg',
	    	date: '请选择使用日期',
	    	chooseBol: false,
	    	list: [['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你']],
	    	dateVal: [""],
	    }
  	},
	components: {
    	XHeader,XImg,VNumber,Picker,Popup
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
		dl{
			display: -webkit-box;
			padding: 14px 0px 12px;
			@include border-bottom-1px(#ccc);
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
			margin: 8px 0px 14px;
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
		}
	}
	.opera{
		height: 40px;
		line-height: 40px;
		padding: 0px 22px;
		overflow: hidden;
		background-color: #e6e6e6;
		dt{
			float: left;
			@include sc(15px,#000);
		}
		dd{
			float: right;
			@include sc(15px,$primary_color);
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
	.noMore{
		margin-top: 16px;
		text-align: center;
		@include sc(15px,$hint_color);
	}
</style>