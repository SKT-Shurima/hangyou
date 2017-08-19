<template>
  <div class="wrap">
    <x-header :left-options="{backText: ''}">产品详情</x-header>
    <div class="box" v-if='detail'>
    	<div class="mainInfo">
	    	<div class="mainImg">
		 		<img :src='detail.images'>
		 	</div>
		 	<dl class="goodInfo">
	     		<dt class="name" v-text='detail.name'></dt>
	     		<dd class="detail" v-text='detail.explain'></dd>
	     		<dd class="price">
	     			<span><strong>{{detail.price-0|currency}}</strong>/人</span>起
			      	<em>{{detail.market_price|currency}}/人</em>
			      	<i>{{detail.sale_count}}人购买</i> 
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
	     		<div class="intro" v-html='detail.descript'>
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
import {info} from '../../config/api'
export default {
  	data () {
	    return {
	    	start_id: 1,
	    	detail: null
	    }
  	},
  	methods: {
  		// 转义
		escape2Html(a) {
		 	var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
		 	return a.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
		},
  		getInfo(){
  			let params = {
  				start_id: this.start_id
  			}
  			info(params).then(res=>{
  				let {errcode,message,content} = res;
      			if (errcode!==0) {
      				this.$vux.alert.show({
					  	title: '',
					  	content: message
					});
      			}else{
      				this.detail = content ;
      				let description =  this.detail.descript ;
      				if (description) {
      					this.detail.descript = this.escape2Html(description);
      				}
      			}
  			})
  		}
	},
   	components: {
    	XHeader
  	},
  	mounted(){
  		this.$nextTick(()=>{
  			this.getInfo();
  		})
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
		width: 100%;
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