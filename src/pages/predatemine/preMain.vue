<template>
  <div class="wrap">
   	<x-header :left-options="{showBack: false}">预定</x-header>
    <div class="container">
		<scroller lock-y scrollbar-x   class='scrollBox'>
	      	<div class="scroll" :style='{width:102*category.length+12+"px"}'>
	        	<div class="scroll-item" v-for="(item,index) in category" :key='index'>
	        		<img :src='item.images'>
	        	</div>
	      	</div>
	    </scroller>
	    <ul class="panel">
	    	<li v-for='(item,index) in destination' :key='index'>
	    		<dl>
	    			<dt>
	    				<span>Loading...</span>
	  					<x-img :src="item.images" :webp-src="`${item.images}?type=webp`" @on-success="success" @on-error="error" class="ximg-demo" error-class="ximg-error" :offset="-100" container="#app"></x-img>
	    			</dt>
	    			<dd>
	    				<div class="name" v-text='item.name'></div>
	    				<div class="detail" v-text='item.descript'></div>
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
import {Flexbox,FlexboxItem} from 'vux/src/components/flexbox' 
import Scroller from 'vux/src/components/scroller'
import XImg from 'vux/src/components/x-img'
import {getCategory} from '../../config/api'
export default {
  	data () {
	    return {
	    	page: 1,
	    	category:[],
	    	destination:[]
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
	    },
	    getcategory(){
	    	let params ={
	    		page: this.page
	    	}
	    	getCategory(params).then(res=>{
	    		let {errcode,message,content} = res;
	    		if (errcode!==0) {
      				this.$vux.alert.show({
					  	title: '',
					  	content: message
					});
      			}else{
      				this.category = this.category.concat(content.category);
      				this.destination = this.destination.concat(content.destination);
      			}
    		})
	    }
  	},
  	components: {
    	XHeader,Flexbox,FlexboxItem,Scroller,XImg
  	},
  	mounted(){
  		this.$nextTick(()=>{
  			this.getcategory();
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
	padding-bottom: 120px;
	background-color: #f7f7f7;
}
.scrollBox{
	@include border-bottom-1px($border_color);
}
.scroll {
 	height: 95px;
 	padding: 15px 12px;
  	position: relative;
}
.scroll-item {
	display:inline-block;
	float: left;
	width: 90px;
	height: 65px;
	margin-left: 12px;
	img{
	  	width: 100%;
	  	height: 100%;
	  	border-radius: 6px;
	}
}
.scroll-item:first-child {
  	margin-left: 0;
}
.panel{
	li{
		@include border-bottom-1px($border_color);
	}
	dl{
		display: -webkit-box;
		padding: 10px 16px 10px 12px;
	}
	dt{
		display: inline-block;
		text-align: center;
		overflow: hidden;
		width: 140px;
		height: 90px;
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
			margin: 10px 0px;
		}
		.detail{
			line-height: 16px;
			@include sc(13px,$detail_color);
			@include ellipsis(2);
		}
	}
}
.noMore{
	margin-top: 16px;
	text-align: center;
	@include sc(15px,$hint_color);
}
</style>