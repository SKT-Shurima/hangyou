<template>
  <div class="wrap">
   	<x-header :left-options="{showBack: false}">预定</x-header>
    <div class="container" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="0">
		<div  class='scrollBox'>
	      	<div class="scroll" :style='{width:102*category.length+12+"px"}'>
	        	<div class="scroll-item" v-for="(item,index) in category" :key='index' @click='getcategory(item.category_id,index)' :class='{"scrollTab":tabIndex===index}' >
	        		<img :src='item.images'>
	        		<div class="scroll-name-box" >
	        			<span v-text='item.name' class="scroll-name"></span>	
	        		</div>
	        	</div>
	      	</div>
	    </div>
	    <ul class="panel">
	    	<li v-for='(item,index) in destination' :key='index'>
	    		<dl @click='getDes(item.address_id)'>
	    			<dt>
	    				<img class="default-image" :src="item.images" @load='successLoadImg' @error='errorLoadImg'>
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
import {getCategory} from '../../config/api'
export default {
  	data () {
	    return {
	    	category:[],
	    	destination:[],
	    	tabIndex: 0,
	    	tabId:"",
	    	page: 1,
	    	busy: false,
	    	noMore: false,
	    }
  	},
  	methods: {
  		getDes(id){
  			this.$router.push(`/getDes?address_id=${id}`);
  		},
  		loadMore: function() {
		    this.busy = true;
		    let _this = this;
		    if (this.noMore) {
		    	return;
		    }
			setTimeout(() => {
		       	_this.page++;
		       	_this.getcategory(this.tabId,this.tabIndex,true);
		      }, 1000);
		},
	    getcategory(id,index,mask){
	    	this.$vux.loading.show({
				text: 'Loading'
			});
	    	let params ={};
	    	if(id){
	    		params.category_id = id;
	    		this.tabIndex = index;
	    		if(this.tabId!==id){
	    			this.page = 1; 
	    		}
	    	}
	    	params.page = this.page;
	    	getCategory(params).then(res=>{
	    		let {errcode,message,content} = res;
	    		if (errcode!==0) {
      				this.errcode(errcode,message);
      			}else{
      				if (!this.category.length) {
      					this.category = content.category;
      					this.tabId =  this.category[0].category_id;
      				}
      				this.busy = false;
      				if (mask) {
      					this.destination = this.destination.concat(content.destination);
      				}else{
      					this.destination = content.destination;
      				}
      				if(!content.destination.length){
      					this.noMore= true;
      				}
      				this.$vux.loading.hide();
      			}
    		})
	    }
  	},
  	components: {
    	XHeader,Flexbox,FlexboxItem,Scroller
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
    overflow-x: scroll;
	@include border-bottom-1px($border_color);
}
.scroll {
	width: 100%;
 	height: 95px;
 	padding: 15px 12px;
  	position: relative;
}

.scroll-item {
	display:inline-block;
	position: relative;
	float: left;
	width: 90px;
	height: 65px;
	padding: 2px;
	border-radius: 6px;
	margin-left: 12px;
	@include border-1px(transparent);
	img{
	  	width: 100%;
	  	height: 100%;
	  	border-radius: 6px;
	}
	.scroll-name-box{
		position: absolute;
		top: 2px;
		left: 2px;
		width: 84px;
		height: 59px;
		background-color: rgba(0,0,0,.3);
		border-radius: 6px;
		.scroll-name{
			display: inline-block;
			position: absolute;
			top: 0px;
			right: 0px;
			left: 0px;
			bottom: 0px;
			margin: auto;
			width: 100%;
			height: 15px;
			text-align: center;
			@include sc(15px,#fff);
		}
	}
}
.scroll-item:first-child {
  	margin-left: 0;
}
.scrollTab{
	@include border-1px(#ffc104);
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
<style scoped lang='scss'>
.box1 {
  height: 100px;
  position: relative;
  width: 1490px;
}
.box1-item {
  width: 200px;
  height: 100px;
  background-color: #ccc;
  display:inline-block;
  margin-left: 15px;
  float: left;
  text-align: center;
  line-height: 100px;
  img{
  	width: 100%;
  }
}
.box1-item:first-child {
  margin-left: 0;
}
.box2-wrap {
  height: 300px;
  overflow: hidden;
}
</style>