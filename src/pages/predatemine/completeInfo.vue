<template>
  <div class="wrap">
    <x-header :left-options="{backText: ''}">完善信息</x-header>
    <div class="container">
    	<ul class="traveler">
    		<li v-for='item in  2'>
    			<h1>旅客1</h1>
    			<div  v-show='false'>
    				<flexbox>
				        <flexbox-item>
				          <x-button type="default">选择旅客</x-button>
				        </flexbox-item>
				        <flexbox-item>
				          <x-button type="default">填写信息</x-button>
				        </flexbox-item>
				    </flexbox>
	    		</div>
	    		<dl class="infoDetail">
	    			<dt class="name">圆周率</dt>
	    			<dd class="spell">
	    				<strong>YUAN/ZHOULV</strong>
	    				<x-icon type="ios-arrow-right" size="18"></x-icon>
	    			</dd>
	    			<dd class="num">
	    				<span>护照编号：</span><em>10086</em>
	    			</dd>
	    		</dl>
	    		
    		</li>
    	</ul>
    	<div class="contact">
    		<div class="info">
    			<h1>联系人信息</h1>
	    		<group  gutter='0'>
			      	<x-input title="姓名" name="username" placeholder="请输入联系人的姓名" is-type="china-name" placeholder-align='right'  text-align='right' ></x-input>
			      	<x-input title="邮箱" is-type='email' name="username" placeholder="请输入联系人邮箱"  placeholder-align='right'  text-align='right'></x-input>
			      	<x-input title="手机号码" name="username" placeholder="请输入联系人手机号码" is-type="china-mobile" placeholder-align='right'  text-align='right'></x-input>
			    </group>
    		</div>
    		<div class="address">
    			<group  gutter='0'>
			      	<div @click='chooseaAddress=true;'><cell title="地址" :value="chooseAddressText" ></cell></div>
			      	<cell title="详情地址"></cell>
			      	<x-textarea  placeholder='请输入联系人详细地址'></x-textarea>
			    </group>
    		</div>
		    <div class="remark">
		    	<group  gutter='0'>
			      	<cell title="备注信息"></cell>
			      	<x-textarea placeholder='请填写备注内容'></x-textarea>
			    </group>
		    </div>
		    <div class="agreement">
		    	<i :class="{'agree': agreement}" @click='agreement=!agreement'></i>我同意接受<a href="javascript:viod(0)">《用户条款及协议》</a>
		    </div>
    	</div>
    </div>
    <!-- 选择地址 -->
    <div v-transfer-dom>
  		<popup v-model="chooseaAddress" @on-hide="" @on-show="">
  			<dl class="opera">
  				<dt @click='chooseaAddress=false'>取消</dt>
  				<dd @click='ensure'>确定</dd>
  			</dl>
  			<picker :data='year7' :fixed-columns="3" :columns=3 v-model='year8Value' @on-change='change'></picker>
  		</popup>
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
  					<i class="wx"></i>微信支付  <em @click='payType=!payType' class="changeType"><check-icon :value='payType'></check-icon></em>
  				</dd>
  				<dd>
  					<i class="installment"></i>申请分期付款 <em>（暂未开通）</em> <em @click='payType=!payType' class="changeType"><check-icon :value='!payType'></check-icon></em>
  				</dd>
  			</dl>
  			<div class="totalPrice">
  				<span>
  					总价：<em>{{1001.01|currency}}</em>
  				</span>
  			</div>
  			<div class="submitPayfor">
		     	确认支付
		    </div>
  		</popup>
	</div>
    <div class="submit">
     	<x-button type='default' :disabled='!agreement' :class='{"disabled":!agreement}' @click.native='payfor=true'>提交</x-button>
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
export default {
	directives: {
	    TransferDom
	},
  	data () {
	    return {
	    	chooseAddressText: '请选择地址',
	    	chooseaAddress: false,
	    	agreement: false,
	    	payfor: true,
	    	payType: true,
	    	year7: [{
		        name: '中国',
		        value: 'china',
		        parent: 0
		      }, {
		        name: '美国',
		        value: 'USA',
		        parent: 0
		      }, {
		        name: '广东',
		        value: 'china001',
		        parent: 'china'
		      }, {
		        name: '广西',
		        value: 'china002',
		        parent: 'china'
		      }, {
		        name: '美国001',
		        value: 'usa001',
		        parent: 'USA'
		      }, {
		        name: '美国002',
		        value: 'usa002',
		        parent: 'USA'
		      }, {
		        name: '广州',
		        value: 'gz',
		        parent: 'china001'
		      }, {
		        name: '深圳',
		        value: 'sz',
		        parent: 'china001'
		      }, {
		        name: '广西001',
		        value: 'gz',
		        parent: 'china002'
		      }, {
		        name: '广西002',
		        value: 'sz',
		        parent: 'china002'
		      }, {
		        name: '美国001_001',
		        value: '0003',
		        parent: 'usa001'
		      }, {
		        name: '美国001_002',
		        value: '0004',
		        parent: 'usa001'
		      }, {
		        name: '美国002_001',
		        value: '0005',
		        parent: 'usa002'
		      }, {
		        name: '美国002_002',
		        value: '0006',
		        parent: 'usa002'
		      }],
	    	year8Value: []
	    }
  	},
  	methods: {
  		ensure(){

  		},
  		change(){

  		}
  	},
   components: {
    XHeader,Flexbox,FlexboxItem,XButton,Group,XInput ,XTextarea ,Cell,Popup,Picker,CheckIcon,XButton
  },
}
</script>
<style type="text/css" lang='scss' scoped>
@import '../../style/mixin.scss';
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
	.traveler{
		width: 100%;
		padding: 15px;
		background-color: #fff;
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
		.info,.address,.remark{
			background-color: #fff;
		}
		.address,.remark{
			margin-top: 16px;
		}
		h1{
			padding-left: 15px;
		}
		.weui-label{
			@include sc(15px,#000);
		}
	}
	.agreement{
		padding-left: 15px;
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
			@include bg_image('../../images/predatemine/checked');
		}
		a{
			color:$primary_color;
		}
	}
}
.payfor{
	background-color: #fff;
	.title{
		width: 100%;
		height: 49px;
		line-height:49px;
		text-align: center;
		overflow: hidden;
		@include sc(18px,$title_color);
		@include border-bottom-1px($border_color);
		i{
			display: inline-block;
			height: 42px;
			float: right;
			margin-top: 4px;
		}
		.vux-x-icon{
			fill: $hint_color;
		}
	}
	.payType{
		overflow: hidden;
		line-height: 42px;
		color: $title_color;
		padding: 0px 15px;
		dt,dd{
			height: 42px;
			@include border-bottom-1px($border_color);
		}
		dt{
			font-size: 15px;
		}
		dd{  
			font-size: 16px;
			overflow: hidden;
			em{
				color: $hint_color;
			}
			.changeType{
				float: right;
			}
		}
		i{
			display: inline-block;
			width: 20px;
			height: 20px;
			vertical-align: middle;
			margin-right: 10px;
		}
		.wx{
			@include bg_image('../../images/predatemine/wx');
		}
		.installment{
			@include bg_image('../../images/predatemine/wallet');
		}
	}
	.totalPrice{
		overflow: hidden;
		line-height: 60px;
		height: 60px;
		padding-right: 15px;
		span{
			float: right;
			@include sc(16px,#000);
		}
		em{
			color: $price_color;
		}
	}
	.submitPayfor{
		width: 100%;
		height: 49px;
		line-height: 49px;
		text-align: center;
		@include sc(16px,#fff);
		background-color: $primary_color;
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