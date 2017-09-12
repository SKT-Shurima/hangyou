<template>
  <div class="wrap">
   	<x-header :left-options="{backText: ''}">全部订单</x-header>
    <div class="container" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="0">
	    <ul class="panel">
	    	<li v-for='(item,index) in orderList'  :key='index'>
	    		<dl @click='checkDetail(item)'>
	    			<dt>
	    				<img :src="item.images"  @load='successLoadImg' @error='errorLoadImg' class="default-image">
	    			</dt>
	    			<dd>
	    				<div class="name" v-text='item.name'></div>
	    				<div class="detail" v-text='item.explain'></div>
	    				<div class="price">
							{{item.order_amount|currency}}
						</div>
	    			</dd>
	    		</dl>
	    		<flexbox class='date'>
	    			<flexbox-item class='time' :span='7/15'>出发日期：{{item.date*1000|dateStyle}}</flexbox-item>
	    			<flexbox-item class='notice' :span='8/15' style='margin-left:0px;'>
	    				<span v-if='item.order_state==="1"'>
	    					<button class="default_btn" @click='cancelOrderFn(item.id)'>取消订单</button>
	    					<button class="primary_btn" @click='payFor(item)'>立即支付</button>
	    				</span>
	    				<span v-if='item.order_state==="2"&&item.is_refund==="0"' class="primary">
	    					已付款，待确认&nbsp;<button class="text_btn" @click='refundFn(item.id)'>退款</button>
	    				</span>
	    				<span v-if='item.order_state==="2"&&item.is_refund!=="0"' class="primary">
	    					订单已申请退款 
	    				</span>
	    				<span v-if='item.order_state==="3"'>
	    					已付款，已确认&nbsp;<button class="text_btn" @click='refundFn(item.id)'>退款</button>
	    				</span>
	    				<span v-if='item.order_state==="4"' class="warning">
	    					审核失败，系统已为您退款
	    				</span>
	    				<span v-if='item.order_state==="5"' class="primary ">
	    					正在进行
	    				</span>
	    				<span v-if='item.order_state==="6"'>
	    					已完成
	    				</span>
	    				<span v-if='item.order_state==="7"' class="primary">
	    					退款受理中&nbsp;<button class="default_btn" @click='cancelRefundFn(item.id)'>取消退款</button>
	    				</span>
	    				<span v-if='item.order_state==="8"'>
	    					成功退款 <em class="price">{{item.order_amount|currency}}</em>
	    				</span>
	    				<span v-if='item.order_state==="9"'>
	    					已删除
	    				</span>
	    				<span v-if='item.order_state==="10"'>已取消</span>
	    				<span v-if='item.order_state==="11"'>已过期</span>
	    				<span v-if='item.order_state==="12"'>
	    					退款失败
	    				</span>
	    				<span v-if='item.order_state==="13"'>
	    					审核已退款
	    				</span>
	    			</flexbox-item>
	    		</flexbox>
	    	</li>
	    </ul>
	    <div class="noMore">
			没有更多了
		</div>
			<!-- 支付 -->
	 <div v-transfer-dom class="payfor">
  		<popup v-model="payfor">
  			<div class="title">
  				付款详情 <i @click='payfor=false'><x-icon type="ios-close-empty" size="40"></x-icon></i>
  			</div>
  			<dl class="payType">
  				<dt>请选择付款方式</dt>
  				<dd>
  					<i class="wx"></i>微信支付  <em class="changeType"><check-icon :value='payType'></check-icon></em>
  				</dd>
  				<dd>
  					<i class="installment"></i>分期付款 <em>（测试中）</em> <em class="changeType"><check-icon :value='!payType'></check-icon></em>
  				</dd>
  			</dl>
			<ul class="coupons" v-if='coupons.length'> 
				<li class="list" v-for='(item,index) in coupons'  :key='index'>
					<div class="chooseBox">
    					<i :class="{'checked': item.checkBol}" @click='chooseCoupons(index)'></i>
    				</div>
    				<div class="listBox">
    					<dl>
							<dt>{{item.discount-0|currency}}</dt>
							<dd>
								<div class='couponsType'>优惠抵扣</div>
								<div class="couponsDetail" v-if='item.type==="2"'>{{item.date_start*1000|dateStyle}}至{{item.date_end*1000|dateStyle}}有效</div>
								<div class="couponsDetail" v-else>{{item.date_add*1000|dateStyle}}至{{(item.date_add*1000+item.valid_period*86400*1000)|dateStyle}}有效</div>
							</dd>
						</dl>
    				</div>
				</li>
			</ul>
  			<div class="totalPrice">
  				<span>
  					总价：<em>{{(payItem.order_amount-couponsCount)>0?(payItem.order_amount-couponsCount):0|currency}}</em>
  				</span>
  			</div>
  			<div class="submitPayfor" @click='submitPayfor'>
		     	确认支付
		    </div>
  		</popup>
	</div>
    </div>
  </div>
</template>

<script type='text/esmascript-6'>
import XHeader from 'vux/src/components/x-header' 
import TransferDom from 'vux/src/directives/transfer-dom' 
import Popup from 'vux/src/components/popup'
import CheckIcon from 'vux/src/components/check-icon'
import {Flexbox,FlexboxItem} from 'vux/src/components/flexbox' 
import {myCoupon,orderList,refund,cancelRefund,cancelOrder,pay} from '../../config/api'
export default {
	directives: {
	    TransferDom
	},
  	data () {
	    return {
	    	userInfo:'',
	    	orderList: [],
	    	payfor: false,
	    	payType: true,
	    	payItem: {},
	    	coupons: [],
	    	couponsIndex: "",
	    	couponsCount: 0,
	    	page: 1,
	    	busy: false,
	    	noMore: false
	    }
  	},
  	components: {
    	XHeader,Flexbox,FlexboxItem,Popup,CheckIcon
  	},
  	methods: {
  		getCoupons(){
  			let params ={
  				access_token: this.userInfo.access_token
  			};
  			myCoupon(params).then(res=>{
  				let {errcode,message,content} = res;
      			if (errcode!==0) {
      				this.errcode(errcode,message);
      			}else{
      				for(let i = 0;i<content.length;i++){
      					content[i].checkBol =  false;
      				}
      				this.coupons = content;
      				console.log(this.coupons)
      			}
  			})
  		},
  		chooseCoupons(index){
  			if (this.couponsIndex===index) {
				this.coupons[index].checkBol = !this.coupons[index].checkBol;
			}else{
				if (this.couponsIndex!=="") {
					this.coupons[this.couponsIndex].checkBol = false;
				}
				this.coupons[index].checkBol = true;
			}
  			this.couponsCount = this.coupons[index].checkBol?this.coupons[index].discount-0:0;
  			this.couponsIndex =  index;
  		},
  		orderFn(fn,id,msg){
  			let _this = this;
  			this.$vux.confirm.show({
  				title:"",
				content: msg,
				onCancel () {
				    return false;
				},
				onConfirm () {
					let params ={
		  				access_token: _this.userInfo.access_token,
		  				order_id: id
		  			};
		  			fn(params).then(res=>{
		  				let {errcode,message} = res;
		      			if (errcode!==0) {
		      				_this.errcode(errcode,message);
		      			}else{
		      				 _this.$vux.toast.show({
			                    text: message,
			                    time: 3000,
			                    type: "text",
			                    width: "12em",
			                    position: 'bottom'
			                })
		      				_this.page =  1 ;
		      				_this.orderList = [];
							_this.getOrder();
		      			}
		  			})
				}
			});
  		},
  		refundFn(id){
  			let msg = '是否申请退款';
  			this.orderFn(refund,id,msg);
  		},
  		cancelRefundFn(id){
  			let msg = '是否取消退款';
  			this.orderFn(cancelRefund,id,msg);
  		},
  		cancelOrderFn(id){
  			let msg = '是否取消订单';
  			this.orderFn(cancelOrder,id,msg);
  		},
  		payFor(item){
  			this.payfor= true;
  			this.payItem =  item;
  		},
  		submitPayfor(){
  			let order = this.payItem;
  			let openid = this.getCookie('openid');
  			let checkCoupons;
  			let coupons = this.coupons;
  			for(let i = 0;i<coupons.length;i++ ){
  				if (coupons[i].checkBol) {
  					checkCoupons={
  						coupon_id: coupons[i].coupon_id,
  						discount: coupons[i].discount-0+""
  					}
  				}
  			}
  			if (checkCoupons) {
  				let arr = [checkCoupons];
  				checkCoupons = JSON.stringify(arr);
  			}
  			let params = {
  				access_token: this.userInfo.access_token,
  				order_sn: order.order_sn,
  				sum: order.order_amount,
  				payType: "2",
  				openid: openid,
  				coupons: checkCoupons?checkCoupons:""
  			}
  			pay(params).then(res=>{
  				let {errcode,message,content} = res;
      			if (errcode!==0) {
      				this.errcode(errcode,message);
      			}else{
      				let _this=  this;
      				if (this.payItem.order_amount-this.couponsCount>0) {
      					WeixinJSBridge.invoke('getBrandWCPayRequest',
	                    {
	                        "appId":content.appId,
							"nonceStr":content.nonceStr,
							"package":content.package,
							"signType":content.signType,
							"timeStamp":content.timeStamp,
							"paySign":content.paySign
						},
		                   function(res){
		                        // WeixinJSBridge.log(res.err_msg);
		                        // alert(res.err_code+res.err_desc+res.err_msg);
		                        let  err_msg = res.err_msg;
		                       	_this.$router.push('./mine');
		                    }	
		                );
      				}else{
      					this.$vux.toast.show({
			  				text:'支付成功',
			  				time: 3000,
			  				position: 'middle',
			  				onHide(){
			  					_this.$router.push('./mine');
			  				}
			  			})
      				}
			 		this.payfor = false;	
      			}
  			})
  		},
  		loadMore: function() {
		    this.busy = true;
		    let _this = this;
		    if (this.noMore) {
		    	return;
		    }
			setTimeout(() => {
		       	_this.page++;
		       	_this.getOrder();
		      }, 1000);
		},
  		getOrder(){
  			this.$vux.loading.show({
				text: 'Loading'
			});
  			let params ={
  				access_token: this.userInfo.access_token,
  				page: this.page
  			};
  			orderList(params).then(res=>{
  				let {errcode,message,content} = res;
      			if (errcode!==0) {
      				this.errcode(errcode,message);
      			}else{
      				this.busy = false;
      				if (content.length) {
      					this.orderList = this.orderList.concat(content);
      				}else{
      					this.noMore= true;
      				}
      				this.$vux.loading.hide();
      			}
  			})
  		},
  		checkDetail(item){
  			let {id,date} = item;
  			this.$router.push(`orderDetail?order_id=${id}&date=${date}`);
  		}
  	},
  	created(){
  		let userInfo =  localStorage.userInfo;
		if (userInfo) {
			this.userInfo =  JSON.parse(userInfo);	
		}
  	},
  	mounted(){
  		this.$nextTick(()=>{
  			if (!this.userInfo.access_token) {
  				this.$router.replace('./login');
  			}else{
  				this.getOrder();
  				this.getCoupons();
  			}
  		})
  	}
}
</script>
<style type="text/css" lang='scss' scoped>
@import '../../style/mixin.scss';
@import '../../style/payFor.scss';
.container{
	position: fixed;
	top: 46px;
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	padding-bottom: 120px;
	background-color: #f7f7f7;
}
.panel{
	li{
		@include border-bottom-1px(#e6e6e6);
	}
	dl{
		display: -webkit-box;
		padding: 10px;
		@include border-bottom-1px(#e6e6e6);
	}
	dt{
		display: inline-block;
		text-align: center;
		overflow: hidden;
		width: 125px;
		height: 95px;
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
		}
		.detail{
			line-height: 16px;
			@include sc(13px,$detail_color);
			@include ellipsis(2);
			margin: 8px 0px 10px;
		}
		.price{
			@include sc(16px,$price_color);
		}
	}
	.date{
		padding: 10px;
		height: 49px;
		line-height: 49px;
		color: $hint_color;
	}
	.time{
		font-size: 14px;
	}
	.notice{
		font-size: 13px;
		text-align: right;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		.primary{
			color: $primary_color;
		}
		.warning{
			color: #ffc103;
		}
		.price{
			color: $price_color;
		}
		button{
			display: inline-block;
			width: 74px;
			height: 25px;
			outline: none;
			line-height: 24px;
			text-align: center;
			border-radius: 5px;
		}
		.primary_btn{
			background-color: $primary_color;
			@include border-1px($primary_color);
			color: #fff;
		}
		.default_btn{
			background-color: #fff;
			@include border-1px($hint_color);
		}
		.text_btn{
			background-color: #fff;
			@include border-1px($primary_color);
			color: $primary_color;
		}
	}
}
.noMore{
	margin-top: 16px;
	text-align: center;
	@include sc(15px,$hint_color);
}
</style>