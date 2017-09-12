<template>
  <div class="wrap">
    <x-header :left-options="{backText: ''}">产品详情</x-header>
    <div class="box" v-if='detail'>
    	<div class="mainInfo">
	    	<div class="mainImg">
		 		<img :src='detail.images' @load='successLoadImg' @error='errorLoadImg' class="default-image">
		 	</div>
		 	<dl class="goodInfo">
	     		<dt class="name" v-text='detail.name'></dt>
	     		<dd class="detail" v-text='detail.explain'></dd>
	     		<dd class="price">
	     			<span><strong>{{detail.price-0|currency}}</strong>/月/人</span>起
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
    <div class="submit" @click='predatemine' v-if='!reqParams.checkDetail'>
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
	    	detail: null,
	    	reqParams: {},
	    	userInfo: ''
	    }
  	},
	components: {
    	XHeader
  	},
  	methods: {
  		// 转义
		escape2Html(a) {
		 	var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
		 	return a.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
		},
  		getInfo(){
  			this.$vux.loading.show({
				text: 'Loading'
			});
  			let params = {
  				goods_id: this.reqParams.goods_id
  			}
  			info(params).then(res=>{
  				let {errcode,message,content} = res;
      			if (errcode!==0) {
      				this.errcode(errcode,message);
      			}else{
      				this.detail = content ;
      				let description =  this.detail.descript ;
      				if (description) {
      					this.detail.descript = this.escape2Html(description);
      				}
      				this.$vux.loading.hide();
      			}
  			})
  		},
  		predatemine(){
  			let userInfo = this.userInfo;
  			if (userInfo) {
  				let on_sale = this.detail.on_sale;
  				if (on_sale!=='1') {
  					 this.$vux.toast.show({
	                    text: '该商品已下架',
	                    time: 3000,
	                    type: "text",
	                    width: "12em",
	                    position: 'bottom'
	                });
  					return false;
  				}
  				this.$router.push(`./predatemine?goods_id=${this.reqParams.goods_id}&travel_days=${this.detail.travel_days}`);
  			}else{
  				this.$router.push('./login');
  			}
  			
  		}
	},
  	created(){
  		this.reqParams = this.getHashReq();
  		let userInfo =  localStorage.userInfo;
		if (userInfo) {
			this.userInfo =  JSON.parse(userInfo);	
		}
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
		height: 100%;
		overflow-y: scroll; 
	}
	.mainInfo{
		background-color: #fff;
	}
	.container{
		padding: 0px 16px 200px;
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
			height: 38px;
			span{
				padding: 6px 0px;
				border-bottom: 2px solid  $primary_color;
			}
		}
	}
	.submit{
		position: fixed;
		z-index: 99;
		bottom: 0px;
		width: 100%;
		height: 50px;
		line-height: 50px;
		background-color: $primary_color;
		text-align: center;
		@include sc(16px,#fff);
	}
</style>
<style type="text/css" lang='scss'>
	.intro{
		font-size: 14px;
		line-height: 24px;
		img{
			width: 100%;
		}
	}
</style>