<template>	
	<div class="headWrap">
	<!-- 头部轮播图 -->
		<div class="header" >
			<div class="search">
				<router-link v-bind:to="'search'" class='inputArea'>
					<icon type="search"></icon>请输入目的地
				</router-link>
			</div>
			<swiper auto loop :interval=3000  :list='bannerList' dots-position='center' :show-desc-mask='false'  :aspect-ratio='350/750'></swiper>	
		</div>
		<!-- 主体部分 -->
		<div class="container" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="0">
			<div class="title">
				<i></i>
				人气热卖
			</div>
			<div class="box" v-for='(item,index) in mainList' :key='index'>
				<div class="main" @click='getDes(item.main.destination_id)'>
					<flexbox>
						<flexbox-item class='good-img-box'>
							<img :src="item.main.cover_images"  @load='successLoadImg' @error='errorLoadImg' class="default-image">
							<span class="good-price">{{((item.main.price-0)/12).toFixed(2)|currency}}/月/人起</span>
						</flexbox-item>
					</flexbox>
					<div class="theme">
						<strong v-text='item.main.name'></strong>
						<span v-text='item.main.descript'></span>
					</div>
				</div>
				<div class="detail">
					<flexbox>
						<flexbox-item :span='1/2'>
							<dl v-if='item.detail.left' @click='getDes(item.detail.left.destination_id)'>
								<dt class='good-img-box'>
									<img :src="item.detail.left.cover_images"  @load='successLoadImg' @error='errorLoadImg' class="default-image">
									<span class="good-price">{{((item.detail.left.price-0)/12).toFixed(2)|currency}}/月/人起</span>
								</dt>
								<dd class="infoName">
									<strong v-text='item.detail.left.name'></strong>
								</dd>
								<dd class="infoDetail" v-text='item.detail.left.descript'></dd>
							</dl>
						</flexbox-item>
						<flexbox-item :span='1/2' style='margin-left:0px;'>
							<dl v-if='item.detail.right' @click='getDes(item.detail.right.destination_id)'>
								<dt class='good-img-box'>
									<img :src="item.detail.right.cover_images"  @load='successLoadImg' @error='errorLoadImg' class="default-image">
									<span class="good-price">{{((item.detail.right.price-0)/12).toFixed(2)|currency}}/月/人起</span>
								</dt>
								<dd class="infoName">
									<strong v-text='item.detail.right.name'></strong>
								</dd>
								<dd class="infoDetail">{{item.detail.right.descript}}</dd>
							</dl>
						</flexbox-item>
					</flexbox>
				</div>
			</div>
		</div>
		<!-- 优惠券信息 -->
		<div v-transfer-dom>
			<div class="dialog" v-if='showCoupons'>
				<div class="box">
					<div class="coupons">
						<img src="../../images/home/coupons@3x.png">
						<dl  v-if='coupons.type==="2"'>
							<dt>￥{{coupons.discount-0}}</dt>
							<dd>
								<div class='couponsType'>优惠抵扣</div>
								<div class="couponsDetail">{{coupons.date_start*1000|dateStyle}}至{{coupons.date_end*1000|dateStyle}}有效</div>
							</dd>
						</dl>
						<dl v-else>
							<dt>{{coupons.discount-0|currency}}</dt>
							<dd>
								<div class='couponsType'>优惠抵扣</div>
								<div class="couponsDetail">{{userInfo.date_add*1000|dateStyle}}至{{(userInfo.date_add-0+coupons.valid_period*86400)*1000|dateStyle}}有效</div>
							</dd>
						</dl>
					</div>
					<div style='margin-top:26px;text-align:center;'>
						<i @click="showCoupons=false">
							<icon type='cancel' style='color:#fff;font-size: 40px;'></icon>
						</i>
			        </div>
				</div>
			</div>
		</div>
    </div>
	</div>
</template>
<script type='text/esmascript-6'>
import Icon from 'vux/src/components/icon'
import {Swiper} from 'vux/src/components/swiper'
import {Flexbox,FlexboxItem} from 'vux/src/components/flexbox'
import XDialog  from 'vux/src/components/x-dialog'
import TransferDom from 'vux/src/directives/transfer-dom' 
import {banner,hot,pushCoupon} from '../../config/api' 
	export default {
		directives: {
		    TransferDom
		},
		data(){
			return {
				bannerList :[],
				showCoupons: false,
				userInfo: "",
				coupons: '',
				mainList: [],
				orginList: [],
				page: 1,
		    	busy: false,
		    	noMore: false
			}
		},
		components: {
			Swiper,Icon,Flexbox,FlexboxItem,XDialog
		},
		methods:{
			loadMore: function() {
			    this.busy = true;
			    let _this = this;
			    if (this.noMore) {
			    	return;
			    }
				setTimeout(() => {
			       	_this.page++;
			       	_this.getHot();
			      }, 1000);
			},
			getBanner(){
				let params = {
					access_token: this.userInfo.access_token
				}
				banner(params).then(res=>{
	      			let {errcode,message,content} = res;
	      			if (errcode!==0) {
	      				this.errcode(errcode,message);
	      			}else{
	      				let arr = [];
	      				for(let i =0 ; i <content.length;i++){
	      					let unit = {
	      						img: content[i].image
	      					}
	      					if (content[i].params.type==2) {
	      						let id = content[i].params.destination_id ;
	      						unit.url= `/getDes?address_id=${id}`
	      					}
	      					if (content[i].params.type==3) {
	      						let  website =content[i].params.website;
	      						unit.url= `/other?website=${website}`
	      					}
	      					arr.push(unit);
	      				}
	      				this.bannerList = arr;	
	      			}
	      		})
			},
			getHot(){
				this.$vux.loading.show({
					text: 'Loading'
				});
				let params = {
					page: this.page
				}
				hot(params).then(res=>{
					let {errcode,message,content} = res;
	      			if (errcode!==0) {
	      				 this.$vux.toast.show({
		                    text: message,
		                    time: 3000,
		                    type: "text",
		                    width: "12em",
		                    position: 'bottom'
		                });
	      			}else{
	      				if (content.length) {
	      					this.orginList = this.orginList.concat(content); 
	      					content = this.orginList;
	      					let arr = [];
		      				for (let i = 0; i < content.length ; i+=3) {
		      					let obj = {
		      						main: content[i],
		      						detail:{
		      							left: content[i+1],
		      							right: content[i+2]
		      						}
		      					}
		      					arr.push(obj);
		      				}
		      				this.mainList = arr;
	      				}else{
	      					this.noMore= true;
	      				}
	      				this.$vux.loading.hide();
	      			}
				})
			},
			getCoupon(){	
				let params ={
					access_token: this.userInfo.access_token
				}
				pushCoupon(params).then(res=>{
					let {errcode,message,content} = res;
	      			if (errcode!==0) {
	      				
	      			}else{
	      				this.coupons = content ;
	      				this.showCoupons = true;
	      			}
				})
			},
			getDes(id){
	  			this.$router.push(`/getDes?address_id=${id}`);
	  		},
		},
		created(){
			let userInfo =  localStorage.userInfo;
			if (userInfo) {
				this.userInfo =  JSON.parse(userInfo);	
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.getBanner();
				this.getHot();
				if (this.userInfo.access_token) {
					this.getCoupon();
				}
			})
		}
	}
</script>
<style type="text/css" lang='scss' scoped>
@import '../../style/mixin.scss';
	.headWrap{
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
				padding-left: 5%;
				border-radius: 15px;
				background-color: rgba(0,0,0,.3);
				i{
					display: inline-block;
					width: 16px;
					height: 16px;
					margin-right: 6px;
					margin-top: -4px;
					color: #fff;
				}
				.inputArea{
					display: inline-block;
					width: 100%;
				    text-decoration: none;
					@include sc(16px,#fff);
				}
			}
		}
		.container{
			width: 100%;
			padding: 0px 15px 80px;
			background-color: #fff;
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
					height: 100%;
				}
			}
			.good-img-box{
				position: relative;
				width: 100%;
				height: 2.93rem;
			}
			.good-price{
				display: inline-block;
				position: absolute;
				left: 0px;
				bottom: 0px;
				width: 100px;
				height: 20px;
				line-height: 20px;
				text-align: center;
				@include sc(10px,#fff);
				background-color: rgba(0,0,0,.1)
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
					height: 30px;
					line-height: 15px;
					@include sc(13px,$hint_color);
					@include ellipsis(2);
				}
			}
		}
	}
	.dialog{
		position: fixed;
	    z-index: 1000;
	    top: 0;
	    right: 0;
	    left: 0;
	    bottom: 0;
	    background: rgba(0, 0, 0, .6);
	    .box{
	    	position: absolute;
			width: 80%;
			top: 20%;
			left: 0px;
			right: 0px;
			margin: auto;
	    }
	}
	.coupons{
		position: relative;
		img{
			width: 100%;
		}
		dl{
			position: absolute;
			left: 0px;
			right: 0px;
			bottom: 15%;
			width: 80%;
			margin: auto;
			overflow: hidden;
			height: 66px;
			background-color: #fff;
			border-radius: 6px;
		}
		dt,dd{
			float: left;
			height: 100%;
		}
		dt{
			width: 25%;
			line-height: 66px;
			text-align: center;
			border-right: 1px solid #ccc;
			@include sc(16px,#ff6f6f);
		}
		dd{
			width: 75%;
			text-align: left;
			padding: 12px 10px 10px 12px ;
		}
		.couponsType{
			text-align: left;
			line-height: 22px;
			@include sc(12px,#333);
		}
		.couponsDetail{
			@include sc(6px,#999);
			line-height: 14px;
		}
	}
</style>