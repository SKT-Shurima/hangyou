<template>
  <div class="wrap">
    <x-header :left-options="{backText: ''}">订单详情</x-header>
    <div class="container">
    	<dl class="orderDetail" @click='checkGoodsDetail'>
    		<dt>
    			<img :src="order.images"  @load='successLoadImg' @error='errorLoadImg' class="default-image">
      		</dt>
			<dd>
      			<div class="name" v-text='order.name'></div>
      			<div class="detail" v-text='order.explain'></div>
      			<div class="priceBox">
      				<em class="price">{{order.order_amount-0|currency}}</em>
      				<span class="notice" v-if='order.order_state==="1"'>待付款</span>
      				<span class="notice" v-if='order.order_state==="2"'>待确认</span>
      				<span class="notice" v-if='order.order_state==="3"'>已确认</span>
      				<span class="notice" v-if='order.order_state==="4"'>确认失败</span>
      				<span class="notice" v-if='order.order_state==="5"'>正在进行</span>
      				<span class="notice" v-if='order.order_state==="6"'>已完成</span>
      				<span class="notice" v-if='order.order_state==="7"'>退款中</span>
      				<span class="notice" v-if='order.order_state==="8"'>成功退款<em>{{order.order_amount-0|currency}}</em></span>
      				<span class="notice" v-if='order.order_state==="9"'>已删除</span>
      				<span class="notice" v-if='order.order_state==="10"'>已取消</span>
      				<span class="notice" v-if='order.order_state==="11"'>已过期</span>
					<span class="notice" v-if='order.order_state==="12"'>退款失败</span>
      				<span class="notice" v-if='order.order_state==="13"'>审核已退款</span>
      			</div>
      		</dd>
    	</dl>
    	<div class="travelInfo">
    		<div v-if='hotel.length'>
	  			<h1>酒店信息<em :class='{"primary":order.hotel_confirm==="0"}'>{{order.hotel_confirm==='1'?"（已确认）":"（未确认）"}}</em><a href="javascript:void(0)" @click='checkDetail'>详情</a></h1>
	  			<dl v-for='(item,index) in hotel' :key='index'>
	  				<dt class="date">
	  					{{(date-0+(item.start_day-1)*86400)*1000|dateStyle}}({{item.start_time}})至{{(date-0+(item.end_day-1)*86400)*1000|dateStyle}}({{item.end_time}})
	  				</dt>
	  				<dd class="name" v-text='item.name'></dd>
	  			</dl>
  			</div>
  			<div v-if='flight.length'>
	  			<h1 style="margin-top:10px;">航班信息<em :class='{"primary":order.flight_confirm==="0"}'>{{order.flight_confirm==='1'?"（已确认）":"（未确认）"}}</em></h1>
	  			<dl v-for='(item,index) in flight' :key='index'>
	  				<dt class="date">
	  					{{(date-0+(item.flight_day-1)*86400)*1000|dateStyle}}
	  				</dt>
	  				<dd class="site">
	  					{{item.start_station}}（{{item.start_time}}）<i class="airIcon"></i>{{item.end_station}}（{{item.end_time}}）<em v-if='item.end_extra-0'>+1</em>
	  				</dd>
	  			</dl>
  			</div>
  			
  		</div>
  		<div class="special" v-if='special.length'>
  			<h1 class="title">特色项目</h1>
  			<ul>
				<li v-for='(item,index) in special' :key='index'>
					<dl>
						<dt>
							<img :src="item.images"  @load='successLoadImg' @error='errorLoadImg' class="default-image">
						</dt>
						<dd>
							<div class="name" v-text='item.name'></div>
							<div class="chooseDate">
								使用日期：{{item.use_date*1000|dateStyle}}
							</div>
							<div class="priceInfo">
								<div class="price">
									<em>{{item.price|currency}}</em>/人	
								</div>
								<div class="chooseNum">份数：<i v-text='item.number'></i></div>
							</div>
						</dd>
					</dl>
				</li>
		  	</ul>
  		</div>
  		<div class="traveler">
  			<h1 class="title">旅客信息</h1>
  			<dl class="infoDetail" v-for='(item,index) in passenger' :key='index'>
    			<dt class="name" v-text='item.name'></dt>
    			<dd class="spell">
    				<span>{{item.lname}}/{{item.surname}}</span><span @click='checkPassenger(item.customer_passenger_id)'><x-icon type="ios-arrow-right" size="20"></x-icon></span>
    			</dd>
    			<dd class="num">
    				<span>护照编号：</span><em v-text='item.card'></em>
    			</dd>
    		</dl>
  		</div>
  		<div class="contact">
  			<h1 class="title">联系人信息</h1>
  			<dl class="infoDetail">
    			<dt class="name"><em v-text='order.contact_name'></em><span v-text='order.phone'></span></dt>
    			<dd class="spell">
    				<span v-text='order.email'></span>
    			</dd>
    			<dd class="num" v-text='order.address'></dd>
    		</dl>
  		</div>
  		<div class="orderInfo">
  			<h1 class="title">订单信息</h1>
  			<div class="order">
  				<span>订单编号：</span>{{order.order_sn}}
  			</div>
  			<div class="order">
  				<span>下单时间：</span>{{order.date_add*1000|dateStyle}}&nbsp;{{order.date_add*1000|timeStyle}}
  			</div>
  			<p>
  				<span>备注信息：</span>{{order.note}}
  			</p>
  		</div>
    </div>
	<div class="submit" v-if='order.order_state==="1"||order.order_state==="2"||order.order_state==="7"'>
		<dl class="nopay" v-if='order.order_state==="1"'>
			<dt @click='cancelOrderFn(order.id)'>取消订单</dt>
			<dd @click='payfor=true'>立即支付</dd>
		</dl>
		<div v-if='order.order_state==="2"||order.order_state==="3"' @click='refundFn(order.id)'>
			退款
		</div>
     	<div v-if='order.order_state==="7"' @click='cancelRefund(order,id)'>
			取消退款
		</div>
    </div>
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
				<li class="list" v-for='(item,index) in coupons' :key='index' >
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
  					总价：<em>{{(order.order_amount-couponsCount)>0?(order.order_amount-couponsCount):0|currency}}</em>
  				</span>
  			</div>
  			<div class="submitPayfor" @click='submitPayfor'>
		     	确认支付
		    </div>
  		</popup>
	</div>
  	</div>
</template>

<script type='text/esmascript-6'>
import XHeader from 'vux/src/components/x-header'
import Popup from 'vux/src/components/popup'
import Picker from 'vux/src/components/picker'
import CheckIcon from 'vux/src/components/check-icon'
import {Flexbox,FlexboxItem} from 'vux/src/components/flexbox'
import TransferDom from 'vux/src/directives/transfer-dom'
import {myCoupon,detail,refund,cancelRefund,cancelOrder,pay} from '../../config/api'
export default {
	directives: {
	    TransferDom
	},
  	data () {
	    return {
	    	userInfo: {},
	    	order: "",
	    	hotel: [],
	    	flight: [],
	    	passenger: [],
	    	special: [],
	    	payfor: false,
	    	payType: true,
	    	coupons: [],
	    	couponsIndex: "",
	    	couponsCount: 0,
	    	date:''
	    }
  	},
	components: {
    	XHeader,Picker,Popup,Flexbox,FlexboxItem,CheckIcon
  	},
  	methods: {
  		checkGoodsDetail(){
  			let id = this.order.goods_id;
  			this.$router.push(`/goodDetail?goods_id=${id}&checkDetail=true`);
  		},
  		checkDetail(){
  			let goods_id = this.order.goods_id ;
  			let date =  this.reqParams.date;
  			this.$router.push(`/hotelFlightDetail?goods_id=${goods_id}&date=${date}`);
  		},
  		checkPassenger(id){
  			this.$router.push(`/checkTraveler?customer_passenger_id=${id}`);
  		},
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
  		getDetail(){
  			let params = {
  				access_token: this.userInfo.access_token,
  				order_id: this.reqParams.order_id
  			}
  			detail(params).then(res=>{
  				let {errcode,message,content} = res;
      			if (errcode!==0) {
      				this.errcode(errcode,message);
      			}else{
      				this.order = content.order;
      				this.passenger = content.passenger;
      				this.special = content.special;
      				this.hotel = content.hotel?content.hotel:this.hotel;
					this.flight = content.flight?content.flight:this.flight;
					this.$vux.loading.hide();
      			}
  			})
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
		      			}
		  			})
				}
			});
  		},
  		refundFn(id){
  			let state = this.order.order_state;
  			if (state==="7") {
  				this.$vux.toast.show({
                    text: '退款正在受理',
                    time: 3000,
                    type: "text",
                    width: "12em",
                    position: 'bottom'
                })
  			}else{
  				let msg = '是否申请退款';
  				this.orderFn(refund,id,msg);
  			}
  		},
  		cancelRefundFn(id){
  			let msg = '是否取消退款';
  			this.orderFn(cancelRefund,id,msg);
  		},
  		cancelOrderFn(id){
  			let msg = '是否取消订单';
  			this.orderFn(cancelOrder,id,msg);
  		},
	    change (val) {
	      console.log('val change', val)
	    },
	    ensure(){
	    	console.log(this.dateVal[0])
	    },
	    submitPayfor(){
  			let order = this.order;
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
      				if (this.order.order_amount-this.couponsCount>0) {
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
	},
	created(){
  		this.reqParams = this.getHashReq();	
  		this.date = this.reqParams.date;
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
  				this.getDetail();
  				this.getCoupons();
  				this.$vux.loading.show({
					text: 'Loading'
				});
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
		padding-bottom: 100px;
		background-color: #f7f7f7;
		.orderDetail{
			display: -webkit-box;
			padding: 10px;
			@include border-bottom-1px($border_color);
			background-color: #fff;
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
					line-height: 18px;
					@include sc(13px,$detail_color);
					@include ellipsis(2);
					margin: 10px 0px 12px;
				}
				.priceBox{
					overflow: hidden;
					font-size: 14px;
					em{
						float: left;
						color: $price_color;
					}
					span{
						float: right;
						color: $primary_color;
					}
				}
			}
		}
		h1{
			margin: 6px 0px;
			overflow: hidden;
			font-weight: 600;
			@include sc(16px,#000);
			a{
				float: right;
				text-decoration: underline;
				@include sc(14px,$primary_color);
			}
			em{
				@include sc(14px,$hint_color);
			}
			.primary{
				color: $primary_color;
			}
		}
		.travelInfo,.contact,.orderInfo,.special,.traveler{
			margin-top: 10px;
			background-color: #fff;
		}
		.travelInfo{
			padding: 10px 14px;
			dl{
				line-height: 28px;
				@include sc(14px,$title_color);
			}
			.site{
				color: #000;
				em{
					color: $price_color;
				}
			}
			.airIcon{
				&::after{
					display: inline-block;
					content: "";
					width: 24px;
					height: 24px;
					vertical-align: middle;
					margin: 0px 4px;
					@include bg_image('../../images/predatemine/air');
				};
			}
		}
		h1.title{
			height: 40px;
			line-height: 40px;
			padding-left: 14px;
			@include border-bottom-1px($border_color);
		}
		.special{
			dl{
				display: -webkit-box;
				padding: 14px 0px 12px;
				@include border-bottom-1px($border_color);
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
				margin: 10px 0px 16px;
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
				i{
					color: $primary_color;
				}
			}
		}
		.traveler{
			.infoDetail{
				font-size: 15px;
				line-height: 27px;
				padding: 10px 14px;
				.name{
					color: #000;
				}
				.spell{
					color: $title_color;
					.vux-x-icon{
						float: right;
						fill: #ccc;
						margin-top: 2px;
					}
				}
				.num{
					span{
						color: $hint_color;
					}
					em{
						color: $title_color;
					}
				}
			}
		}
		.contact{
			.infoDetail{
				font-size: 15px;
				line-height: 27px;
				padding: 10px 14px;
				@include border-bottom-1px($border_color);
				@include sc(15px,$title_color);
				.name{
					overflow: hidden;
					em{
						float: left;
					}
					span{
						float: right;
						@include sc(15px,$detail_color);
					}
				}
			}
		}
		.orderInfo{
			@include sc(15px,$title_color);
			line-height: 30px;
			.order,p{
				padding: 0px 14px;
			}
			span{
				color: $hint_color;
			}
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
	.confirm p{
		@include sc(16px,#23232e);
		text-align: center;
	}
	.submit{
		position: fixed;
		bottom: 0px;
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		background-color: $primary_color;
		@include sc(16px,#fff);
		.nopay{
			overflow: hidden;
			dt,dd{
				width: 50%;
				text-align: center;
			}
			dt{
				float: left;
				background-color: #fff;
				color: $primary_color;
			}
			dd{
				float: right;
			}
		}
	}
</style>
<style type="text/css">
	.confirm .weui-dialog{
		background-color: #fff;
	}
</style>