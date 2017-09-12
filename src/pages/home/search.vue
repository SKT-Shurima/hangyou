<template>
  <div class="wrap">
    <x-header :left-options="{backText: ''}">
    	<div class="search">
			<icon type="search"></icon>
			<input type="text" placeholder="请输入目的地" v-model='keyword'>
		</div>
		<span class="searchBtn" @click='searchFn'>搜索</span>
	</x-header>
	<div class="container" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" :infinite-scroll-immediate-check='false'>
		<div class="drop-wrap" :style="{'height':dropBol?'0px':'auto'}">
			<div class="drop-box">
				<dl>
					<dt>旅行天数</dt>
					<dd>
						<span @click='day=item.day' v-for='(item,index) in days' :class='{"is-tab":item.day===day}'>{{item.day?item.day+'天':'全部'}}</span>
					</dd>
				</dl>
				<dl>
					<dt>目的地</dt>
					<dd>
						<span @click='keyword=item.name' v-for='(item,index) in areas' :class='{"is-tab":item.name===keyword}'>{{item.name?item.name:'全部'}}</span>
					</dd>
				</dl>
				<div class="btn-box">
					<button @click='searchFn'>确定</button>
				</div>
			</div>
		</div>
		<div class="drop-icon">
			<i :class="{'open':dropBol}" @click='dropBol=!dropBol'><x-icon type="ios-arrow-up" size="20"></x-icon></i>
		</div>
		<ul>
			<li v-for='(item,index) in goodsList' :key='index' @click='checkDetail(item.goods_id)'>
				<dl class="list">
		      		<dt>
		      			<div class="name" v-text='item.name'></div>
		      			<div class="detail" v-text='item.explain'></div>
		      			<div class="price">
		      				<span><strong>{{(item.price-0).toFixed(2)|currency}}</strong>/月/人起</span>
		      				<em>{{(item.market_price-0).toFixed(2)|currency}}/月/人起</em> 
		      			</div>
		      		</dt>
		      		<dd>
		      			<img :src="item.images" @load='successLoadImg' @error='errorLoadImg' class="default-image">
		      		</dd>
		      	</dl>
			</li>
		</ul>
		<div class="noMore" v-show='goodsList.length'>
			没有更多了
		</div>
	</div>
  </div>
</template>

<script type='text/esmascript-6'>
import XHeader from 'vux/src/components/x-header'  
import Icon from 'vux/src/components/icon'
import {Flexbox,FlexboxItem} from 'vux/src/components/flexbox'
import {search} from '../../config/api'
export default {
  	data () {
	    return {
	    	keyword: "",
	    	goodsList:[],
	    	page: 1,
	    	busy: false,
	    	noMore: false,
	    	day: "",
	    	dropBol: false,
	    	days: [{day:3},{day:4},{day:5},{day:6},{day:''}],
	    	areas:[{name:'澳门'},{name:'香港'},{name:'澳大利亚'},{name:'曼谷'},{name:'普吉岛'},{name:'巴黎'},{name:''}],
	    	prekeyword:'',
	    	prePage: '',
	    }
  	},
  	components: {
   		XHeader,Icon,Flexbox,FlexboxItem
  	},
  	methods: {
  		loadMore: function() {
		    this.busy = true;
		    let _this = this;
		    if (this.noMore||!this.keyword) {
		    	return;
		    }
			setTimeout(() => {
		       	_this.page++;
		       	_this.searchFn(true);
		      }, 1000);
		},
	    searchFn(mask){
			this.$vux.loading.show({
				text: 'Loading'
			});
			if (this.prekeyword!==this.keyword) {
				this.page = 1;
			}
	    	let params = {
	    		keyword: this.keyword,
	    		page: this.page,
	    		day: this.day
	    	}
	    	search(params).then(res=>{
	    		let {errcode,message,content} = res;
	    		if (errcode!==0) {
      				 this.$vux.toast.show({
	                    text: message,
	                    time: 3000,
	                    type: "text",
	                    width: "12em",
	                    position: 'bottom'
	                })
      			}else{
      				this.busy = false;
      				if (!content.length&&mask) {
      					this.noMore= true;
      				}
      				if(this.keyword===this.prekeyword&&mask&&this.prePage!==this.page){
  						this.goodsList = this.goodsList.concat(content);
  					}else{
  						this.goodsList = content;
  					}
      				this.$vux.loading.hide();
      			}
      			this.prekeyword =  this.keyword;
      			this.prePage = this.page;
	    	})
	    },
	    checkDetail(id){
	    	this.$router.push(`./goodDetail?goods_id=${id}`);
	    }
	},
}
</script>
<style type="text/css" lang='scss' scoped>
	@import '../../style/mixin.scss';
	.vux-header{
		width: 100%;
		position: fixed;
		top: 0px;
		left: 0px;
		z-index: 99;
	}
	.searchBtn{
		position: absolute;
		right: 3%;
		font-size: 16px;
	}
	.search{
		position: absolute;
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		margin: auto;
		width: 69.3%;
		height: 30px;
		line-height: 30px;
		z-index: 10;
		text-align: left;
		border-radius: 15px;
		background-color: rgba(255,255,255,.3);
		i{
			display: inline-block;
			width: 16px;
			height: 16px;
			margin: 2px 6px 0px;
			vertical-align: baseline;
			color: #fff;
		}
		input{
			width: 60%;
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
	.container{
		position:fixed;
		top: 50px;
		left: 0px;
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		overflow-x: hidden;
		padding-bottom: 100px;
		background-color: #fff;
		.drop-wrap{
			overflow: hidden;
			transition: all .5s;
		}
		.drop-box{
			padding: 15px;
			dl{
				display: -webkit-box;
				@include sc(14px,$title_color);
				line-height: 24px;	
				dt{
					width: 80px;
				}
				dd{
					-webkit-box-flex: 1;
					overflow: hidden;
					span{
						display: inline-block;
						float: left;
						padding: 0px 6px;
						margin-right: 10px;
						margin-bottom: 10px;
						@include border-1px($primary_color);
						border-radius: 4px;
					}
					.is-tab{
						background-color: $primary_color;
						color: #fff;
					}			
				}
			}
			.btn-box{
				text-align: center;
				margin-top: 10px;
				button{
					display: inline-block;
					border: none;
					border-radius: 4px;
					padding: 6px 20px;
					@include sc(14px,#fff);
					background-color: transparent;
					background-color: $primary_color;
				}
			}
		}
		.drop-icon{
			text-align: center;
			@include border-bottom-1px($border_color);
			i{
				display: inline-block;
				transition: all .5s;
			}
			.vux-x-icon{
				fill: $primary_color;
			}
			.open{
				transform: rotateZ(180deg);
			}
		}
		li{
			.list{
				display: -webkit-box;
				height: 110px;
				padding: 12px 0px;
				@include border-bottom-1px($border_color);
			}
			dt{
				padding-left: 12px;
				height: 85px;
    			-webkit-box-flex: 1;
			}
			.name{
				@include sc(15px,#000);
			    @include ellipsis(1);
			    margin-bottom: 5px;
			}
			.detail{
				line-height: 20px;
				height: 40px;
			    @include ellipsis(2);
				@include sc(12px,$detail_color);
			}
			.price{
				margin-top: 5px;
				line-height: 16px;
				@include sc(12px,$title_color);
				strong {
					@include sc(14px,$price_color);
				}
				em{
					margin-left: 6px;
					text-decoration: line-through;
					@include sc(12px,$hint_color);
				}
			}
			dd{
				display: inline-block;
			    text-align: center;
			    overflow: hidden;
			    width: 125px;
			    height: 85px;
			    margin: 0px .8em;
			    img{
			    	width: 100%;
			    	height: 100%;
			    }
			}
		}
		.noMore{
			margin-top: 16px;
			text-align: center;
			@include sc(15px,$hint_color);
		}
	}
</style>