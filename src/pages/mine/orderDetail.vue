<template>
  <div class="wrap">
    <x-header :left-options="{backText: ''}">订单详情</x-header>
    <div class="container">
    	<dl class="orderDetail">
    		<dt>
    			<img :src="order.images">
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
  			<h1>酒店信息<em :class='{"primary":order.hotel_confirm==="0"}'>{{order.hotel_confirm==='1'?"（已确认）":"（未确认）"}}</em><a href="javascript:void(0)" @click='checkDetail'>详情</a></h1>
  			<dl v-for='(item,index) in hotel' :key='index'>
  				<dt class="date">
  					{{item.start_date*1000|dateStyle}}至{{item.end_date*1000|dateStyle}}
  				</dt>
  				<dd class="name" v-text='item.name'></dd>
  			</dl>
  			<h1 style="margin-top:10px;">航班信息<em :class='{"primary":order.flight_confirm==="0"}'>{{order.flight_confirm==='1'?"（已确认）":"（未确认）"}}</em></h1>
  			<dl v-for='(item,index) in flight' :key='index'>
  				<dt class="date">
  					{{item.start_date*1000|dateStyle}}
  				</dt>
  				<dd class="site">
  					{{item.start_station}}（{{item.start_time}}）<i class="airIcon"></i>{{item.end_station}}（{{item.end_time}}）<em v-if='item.end_extra-0'>+1</em>
  				</dd>
  			</dl>
  		</div>
  		<div class="special">
  			<h1 class="title">特色项目</h1>
  			<ul>
				<li v-for='(item,index) in special' :key='index'>
					<dl>
						<dt>
							<img :src="item.images">
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
    				<span>{{item.lname}}/{{item.surname}}</span>
    				<x-icon type="ios-arrow-right" size="18"></x-icon>
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
  				<span>下单时间：</span>{{order.date*1000|dateStyle}}&nbsp;{{order.date*1000|timeStyle}}
  			</div>
  			<p>
  				<span>备注信息：</span>{{order.note}}
  			</p>
  		</div>
    </div>
	<div class="submit">
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
  					<i class="installment"></i>申请分期付款 <em>（暂未开通）</em> <em class="changeType"><check-icon :value='!payType'></check-icon></em>
  				</dd>
  			</dl>
			<ul class="coupons" v-for='(item,index) in coupons' :key='index' v-if='coupons.length'>
				<li class="list">
					<div class="chooseBox">
    					<i :class="{'checked': couponsIndex===index}" @click='couponsIndex=index'></i>
    				</div>
    				<div class="listBox">
    					<dl>
							<dt>{{item.discount-0|currency}}</dt>
							<dd>
								<div class='couponsType'>优惠抵扣</div>
								<div class="couponsDetail">{{item.date_start*1000|dateStyle}}至{{item.date_end*1000|dateStyle}}有效</div>
							</dd>
						</dl>
    				</div>
				</li>
			</ul>
  			<div class="totalPrice">
  				<span>
  					总价：<em>{{order.order_amount|currency}}</em>
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
import VNumber from '../../comment/v-number'
import Popup from 'vux/src/components/popup'
import Picker from 'vux/src/components/picker'
import CheckIcon from 'vux/src/components/check-icon'
import {Flexbox,FlexboxItem} from 'vux/src/components/flexbox'
import TransferDom from 'vux/src/directives/transfer-dom'
import {detail,refund,cancelRefund,cancelOrder,pay} from '../../config/api'
export default {
	directives: {
	    TransferDom
	},
  	data () {
	    return {
	    	src: 'https://static.vux.li/demo/1.jpg',
	    	userInfo: {},
	    	order: "",
	    	hotel: [],
	    	flight: [],
	    	passenger: [],
	    	special: [],
	    	payfor: false,
	    	payType: true,
	    	coupons: [],
	    	couponsIndex: ""
	    }
  	},
	components: {
    	XHeader,VNumber,Picker,Popup,Flexbox,FlexboxItem,CheckIcon
  	},
  	methods: {
  		checkDetail(){
  			let start_id = this.order.start_id ;
  			let date =  this.reqParams.date;
  			this.$router.push(`/hotelFlightDetail?start_id=${start_id}&date=${date}`);
  		},
  		initHotelFlight(hotel,flight){
  			var init_date =  this.reqParams.date-0;
  			hotel.sort(compare('sort'));
			flight.sort(compare('sort'));
			var extra = new Array();
			hotel.forEach(function(value,index,array){
				extra[index] = value['stay_day'];
			});
			//获取飞机到达时间
			var arrival_day = 0;
			flight.forEach(function(value,index,array){
				if(value['is_return'] == 0){
					arrival_day = value['end_extra'];
				}
				flight[index]['start_date'] = init_date+value['start_extra']*86400;
			});
			//酒店开始入住时间
			var hotel_init_date = init_date+86400*arrival_day;
			for(var i = 0;i<hotel.length;i++){
				var k = i;
				var date_start = hotel_init_date;
				var date_end = hotel_init_date;
		
				while(k >= 0){
					if(k-1 >= 0){
						date_start += 86400*hotel[k-1]['stay_day'];
					}
					date_end += 86400*hotel[k]['stay_day'];
					k--;
				}
				hotel[i]['start_date'] = date_start;
				hotel[i]['end_date'] = date_end;
			}
			function compare(property){
			    return function(a,b){
			        var value1 = a[property];
			        var value2 = b[property];
			        return value1 - value2;
			    }
			};
			this.hotel = hotel;
			this.flight = flight;
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
      				this.initHotelFlight(content.hotel,content.flight);
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
		      				_this.$vux.alert.show({
							  	title: '',
							  	content: message
							});
		      			}
		  			})
				}
			});
  		},
  		refundFn(id){
  			let state = this.order.order_state;
  			if (state==="7") {
  				this.$vux.alert.show({
				  	title: '',
				  	content: '退款正在受理'
				});
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
	    },
	    submitPayfor(){
  			let order = this.order;
  			let openid = this.getCookie('openid');
  			let coupons;
  			if (this.couponsIndex!=="") {
  				let couponsObj = this.coupons[this.couponsIndex];
  				coupons= {
  					coupon_id: couponsObj.coupon_id,
  					discount: couponsObj.discount-0+""
  				}
  				let arr = [coupons];
  				coupons =  JSON.stringify(arr);
  			}
  			let params = {
  				access_token: this.userInfo.access_token,
  				order_sn: order.order_sn,
  				sum: order.order_amount,
  				payType: "2",
  				openid: openid,
  				coupons: coupons?coupons:""
  			}
  			pay(params).then(res=>{
  				let {errcode,message,content} = res;
      			if (errcode!==0) {
      				this.errcode(errcode,message);
      			}else{
      				let _this=  this;
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
                        if (err_msg.indexOf("ok")>-1) {
                            _this.$router.push('./orderList');
                        }else{
                        	_this.$router.back(-1)
                        }
                    }
                );
			 		this.payfor = false;	
      			}
  			})
  		},
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
  			if (!this.userInfo.access_token) {
  				let _this = this;
				this.$vux.alert.show({
				  	title: '',
				  	content: '请先登录',
				 	onShow () {
				  	},
				 	onHide () {
				    	_this.$router.replace('./login');
				  	}
				})
  			}else{
  				this.getDetail();
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