<template>
  <div class="wrap">
    <x-header :left-options="{backText: ''}">完善信息</x-header>
    <div class="container">
    	<ul class="traveler">
    		<li v-for='(item,index) in passenger' :key='index'> 
    			<h1>旅客{{index+1}}</h1>
    			<dl class="infoDetail">
	    			<dt class="name" v-text='item.name'></dt>
	    			<dd class="spell">
	    				<span>{{item.lname}}/{{item.surname}}</span>
	    			</dd>
	    			<dd class="num">
	    				<span>身份证号：</span><em v-text='item.card'></em>
	    			</dd>
	    		</dl>
    		</li>
    	</ul>
    	<div class="newAdd">
    		<h1>旅客{{passenger.length+1}}</h1>
			<flexbox>
		        <flexbox-item>
		        	<router-link :to='{path:"/travelers",query:{choose:true}}'>
		          		<x-button type="default">选择旅客</x-button>
		          	</router-link>
		        </flexbox-item>
		        <flexbox-item>
		        	<router-link :to='{path:"/addTraveler",query:{addTraveler:true}}'>
		          		<x-button type="default">填写信息</x-button>
		          	</router-link>
		        </flexbox-item>
		    </flexbox>
		</div>
    	<div class="contact">
    		<h1>联系人信息</h1>
    		<div v-if='contact'>
    			<div class="info">
					<ul>
	    				<li>
	    					<span>姓名</span><em v-text='contact.name'></em>
	    				</li>
	    				<li>
	    					<span>邮箱</span><em v-text='contact.email'></em>
	    				</li>
	    				<li>
	    					<span>手机号码</span><em v-text='contact.phone'></em>
	    				</li>
	    			</ul>
	    			<dl class="address">
		    			<dt>
		    				<span>地址</span><em v-text='contact.pca'></em>
		    			</dt>
		    			<dd>详细地址</dd>
		    			<dd v-text='contact.address'>
		    				
		    			</dd>
		    		</dl>
		    	</div>
    		</div>
    		<div v-else class="addContact">
	    		<router-link to='/editContact'>
	          		<x-button type="default" style='width:120px;'>添加联系人</x-button>
	          	</router-link>
	    	</div>
    	</div>
    	<div class="remark">
	    	<group  gutter='0'>
		      	<cell title="备注信息"></cell>
		      	<x-textarea placeholder='请填写备注内容' v-model='note'></x-textarea>
		    </group>
		     <div class="agreement">
		    	<i :class="{'agree': agreement}" @click='agreement=!agreement'></i>我同意接受<a href="#/protocol">《用户条款及协议》</a>
		    </div>
	    </div>
    </div>
	<!-- 支付 -->
	 <div v-transfer-dom class="payfor">
  		<popup v-model="payfor" @on-hide="" @on-show="">
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
  					总价：<em>{{sum|currency}}</em>
  				</span>
  			</div>
  			<div class="submitPayfor" @click='submitPayfor'>
		     	确认支付
		    </div>
  		</popup>
	</div>
    <div class="submit">
     	<x-button type='default' :disabled='!(agreement&&contact)' :class='{"disabled":!(agreement&&contact)}' @click.native='ensure'>提交</x-button>
    </div>
  </div>
</template>

<script type='text/esmascript-6'>
import XHeader from 'vux/src/components/x-header' 
import {Flexbox,FlexboxItem} from 'vux/src/components/flexbox' 
import XInput from 'vux/src/components/x-input'  
import Group from 'vux/src/components/group' 
import Cell from 'vux/src/components/cell'  
import XTextarea  from 'vux/src/components/x-textarea'
import TransferDom from 'vux/src/directives/transfer-dom' 
import Popup from 'vux/src/components/popup'
import Picker from 'vux/src/components/picker'
import CheckIcon from 'vux/src/components/check-icon'
import XButton from 'vux/src/components/x-button'   
import {myCoupon,getContact,generate,pay,getOpenid} from '../../config/api'
export default {
	directives: {
	    TransferDom
	},
  	data () {
	    return {
	    	chooseAddressText: '请选择地址',
	    	agreement: false,
	    	payfor: false,
	    	payType: true,
	    	contact: null,
	    	note: '',
	    	order_sn:'',
	    	sum: '',
	    	code:'',
	    	passenger:[],
	    	coupons: [],
	    	couponsIndex: ""
	    }
  	},
  	methods: {
  		getContactFn(){
  			let params = {
  				access_token: this.userInfo.access_token
  			}
  			getContact(params).then(res=>{
  				let {errcode,message,content} = res;
      			if (errcode!==0) {
      				this.errcode(errcode,message);
      			}else{
      				this.contact = content;	
      			}
  			})
  		},
  		ensure(){
  			if (this.order_sn) {
  				this.payfor= true;
  				return false;
  			}
  			let preBaseInfo = JSON.parse(sessionStorage.preBaseInfo);
  			let special = JSON.parse(sessionStorage.special);
  			let passenger = this.passenger;
  			let params = {
  				access_token: this.userInfo.access_token,
  				adult_count: preBaseInfo.adult_count,
  				child_count: preBaseInfo.child_count,
  				room_count: preBaseInfo.room_count,
  				date_price_id: preBaseInfo.date_price_id,
  				start_id: preBaseInfo.start_id,
  				customer_contact_id: this.contact.customer_contact_id,
  				note: this.note
  			}
  			if (passenger.length) {
  				let passengerArr = [];
	  			for(let i = 0 ; i < passenger.length;i++){
	  				passengerArr[i] = passenger.customer_passenger_id;
	  			}
	  			params.customer_passenger = JSON.stringify(passengerArr);
	  		}else{
	  			this.$vux.alert.show({
				  	title: '',
				  	content: '请选择旅客',
				});
	  			return false;
	  		}
  			if (special.length) {
  				params.special = JSON.stringify(special);
  			}
  			generate(params).then(res=>{
  				let {errcode,message,content} = res;
      			if (errcode!==0) {
      				this.errcode(errcode,message);
      			}else{
      				this.payfor=true;
      				this.order_sn = content.order_sn;
      				this.sum = content.sum;
      			}
  			})
  		},
  		submitPayfor(){
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
  				order_sn: this.order_sn,
  				sum: this.sum,
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
	components: {
	    XHeader,Flexbox,FlexboxItem,XButton,Group,XInput ,XTextarea ,Cell,Popup,Picker,CheckIcon,XButton
	},
	created(){
		if (sessionStorage.passenger) {
			this.passenger = JSON.parse(sessionStorage.passenger);
		}
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
  				this.getContactFn();
  			}
  			var href = location.href; 
  			if(href.indexOf('code')>-1){
  				this.code = href.split('?')[1].split('&')[0].split('=')[1];
  				this.getOpenid(); 
  			}
  		})
  	}
}
</script>
<style type="text/css" lang='scss' scoped>
@import '../../style/mixin.scss';
@import '../../style/payFor.scss';
.weui-cell{
	padding: 14px 15px !important;
	font-size: 15px;
}
.vux-label,.weui-label{
	@include sc(15px, $text_color);
}
.weui-cell__ft,.weui-cell__bd{
	@include sc(14px,$hint_color);
}
.container{
	position: fixed;
	top: 46px;
	left: 0px;
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	padding-bottom: 100px;
	background-color: #f7f7f7;
	h1{
		@include sc(16px,#000);
	}
	.traveler,.newAdd,.addContact{
		width: 100%;
		padding: 15px;
		background-color: #fff;
		a{
			color: $primary_color;
		}
		.vux-flexbox.vux-flex-row{
			width: 80%;
			margin: 16px auto;
		}
		.weui-btn{
			width: 100px;
			height: 42px;
			@include sc(15px,$primary_color);
			@include border-1px($primary_color);
			background-color: #fff;
		}
		.infoDetail{
			font-size: 15px;
			line-height: 27px;
			padding: 10px 0px;
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
		line-height: 49px;
		margin-top: 16px;
		h1{
			@include border-bottom-1px($border_color);
			background-color: #fff;
		}
		.address{
			dt,dd{
				padding: 0px 15px;
				overflow: hidden;
			}
		}
		.info ul,.address{
			background-color: #fff;
			li{
				@include border-bottom-1px($border_color);
			}
			li,dt,dd{
				padding: 0px 15px;
				overflow: hidden;
			}
			dt{
				@include border-bottom-1px($border_color);
			}
			dd{
				@include sc(15px,$text_color);
			}
			span{
				float: left;
				@include sc(15px,$text_color);
			}
			em{
				float: right;
				@include sc(14px,$title_color);
			}
		}
		.address{
			margin-top: 16px;
		}
		h1{
			padding-left: 15px;
		}
		.weui-label{
			@include sc(15px,#000);
		}
	}
	.remark{
		margin-top: 16px;
	}
	.agreement{
		padding: 15px;
		@include sc(13px,$hint_color);
		i{
			display: inline-block;
			width: 16px;
			height: 16px;
			vertical-align: -4px;
			@include border-1px(#ddd);
			margin-right: 6px;
		}
		.agree{
			@include bg_image('../../images/common/checked');
		}
		a{
			color:$primary_color;
		}
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
.submit{
	position: fixed;
	bottom: 0px;
	width: 100%;
	height: 50px;
	line-height: 50px;
	text-align: center;
	.weui-btn{
		border-radius: 0px;
		border: none;
		height: 100%;
		background-color: $primary_color;
		@include sc(16px,#fff);
	}
	.disabled{
		background-color: #93d3ff;
	}
}
</style>