<template>
  <div class="wrap">
    <x-header :left-options="{backText: ''}">常用联系人</x-header>
     <group  gutter='0'>
      <x-input title="姓名" name="username" placeholder="请输入您的姓名" placeholder-align='right'  text-align='right' v-model='name'></x-input>
      <x-input title="邮箱" name="username" placeholder="请输入您的邮箱" is-type='email' placeholder-align='right'  text-align='right' v-model='email'></x-input>
      <x-input title="手机号码" name="username" placeholder="请输入手机号码" is-type='china-mobile' placeholder-align='right'  text-align='right' v-model='phone'></x-input>
    </group>
     <group>
     	<div @click='show=true;'><cell title="地址" :value="pca" :is-link='true'></cell></div>
     	<div class="weui-cell vux-tap-active weui-cell_access">
     		详细地址
     	</div>
     	<x-textarea v-model="address" placeholder='请输入详细地址'></x-textarea>
    </group>
    <div class="submit">
    	<button :disabled='!(name&&phone&&email&&pca&&address)' class="btn" :class='{"disabled":!(name&&phone&&email&&pca&&address)}' @click='ensure'>保存</button>
    </div>
    <vue-area :props-show="show" :props-result="result" v-on:result="areaResult"></vue-area>
  </div>
</template>

<script type='text/esmascript-6'>
import XHeader from 'vux/src/components/x-header'  
import XInput from 'vux/src/components/x-input'  
import Group from 'vux/src/components/group' 
import Datetime from 'vux/src/components/datetime'  
import Cell from 'vux/src/components/cell'  
import XDialog from 'vux/src/components/x-dialog'  
import XButton from 'vux/src/components/x-button' 
import XTextarea from 'vux/src/components/x-textarea' 
import vueArea from 'vue-area'
import TransferDom from 'vux/src/directives/transfer-dom' 
import {editContact,getContact} from '../../config/api' 
export default {
	directives: {
	    TransferDom
	},
  	data () {
	    return {
	    	name: "",
	    	phone: "",
	    	email: "",
			pca: '请选择地区',
			address: "",
			result: {},
			show: false,
	      	reqParams: {}
	    }
  	},
	components: {
    	XHeader,XInput, Group,Datetime,Cell,XDialog,XButton,XTextarea,vueArea
  	},
  	methods: {
  		getInfo(){
  			let params = {
  				access_token: this.userInfo.access_token
  			}
  			getContact(params).then(res=>{
  				let {errcode,message,content} = res;
      			if (errcode!==0) {
      				this.errcode(errcode,message);
      			}else{
      				this.name =  content.name;
      				this.phone = content.phone;
      				this.email = content.email;
      				this.pca = content.pca;
      				this.address = content.address;
      			}
  			})
  		},
  		areaResult(show, result){
	        this.show = show;
	        this.result = result;
	        if (!this.show) {
	        	let address = result.province.name+result.city.name+result.area.name;
	       		this.pca = address;	
	        }
	    },
    	ensure(){
    		this.name = this.name.trim();
    		this.phone = this.phone.trim();
    		this.email = this.email.trim();
    		this.address = this.address.trim();
    		let name = this.checkVal(this.name,"姓名");
    		let phone = this.checkPhone(this.phone);
    		let email = this.checkVal(this.email,"邮箱");
    		let address = this.checkVal(this.address,"详细地址");
    		let pca =  this.pca === '请选择地区'?false:true;
    		if (name&&phone&&email&&address&&pca) {
    			let params ={
    				access_token: this.userInfo.access_token,
    				name: this.name,
    				phone: this.phone,
    				email: this.email,
    				pca: this.pca,
    				address: this.address
    			}
    			if (this.reqParams.customer_contact_id) {
    				params.customer_contact_id = this.reqParams.customer_passenger_id ;
    			}
    			editContact(params).then(res=>{
    				let {errcode,message,content} = res;
	      			if (errcode!==0) {
	      				this.errcode(errcode,message);
	      			}else{
	      				let _this = this;
	      				this.$vux.alert.show({
						  	title: '',
						  	content: '保存成功',
						  	onHide(){
						  		_this.$router.back(-1);
						  	}
						});
						
	      			}
    			})
    		}
    	}
	},
  	created(){
  		let hash = location.hash;
  		if (hash.indexOf("?")>-1) {
  			this.reqParams = this.getHashReq();	
  		}
  		let userInfo =  localStorage.userInfo;
		if (userInfo) {
			this.userInfo =  JSON.parse(userInfo);	
		}else{
			this.$vux.alert.show({
			  	title: '',
			  	content: '请先登录',
			 	onShow () {
			  	},
			 	onHide () {
			    	_this.$router.replace('./login');
			  	}
			})
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
  				this.getInfo()
  			}
  		})
  	}	
}
</script>
<style type="text/css" lang='scss' scoped>
@import '../../style/mixin.scss';
.wrap{
	height: 100vh;
}
.overwrite-title-demo {
  margin-top: 5px;
}
.weui-cell{
	padding: 14px 15px !important;
	font-size: 15px;
}
.vux-label,.weui-label{
	@include sc(16px, $text_color);
}
.weui-cell__ft,.weui-cell__bd{
	@include sc(14px,$hint_color);
}
.tips{
	@include sc(12px,$hint_color);
	line-height: 24px;
	padding: 15px 14px 50px;
	& i{
		width: 12px;
		height: 12px;
		margin-right: 6px;
		display: inline-block;
		@include bg-image('../../images/common/tips');
	}
}
.submit{
	position: fixed;
	bottom: 0px;
	width: 100%;
	height: 50px;
	line-height: 50px;
	text-align: center;
	background-color: $primary_color;
	.btn{
		display: block;
		width: 100%;
		height: 100%;
		background: transparent;
		border: none;
		outline: none;
		@include sc(16px,#fff);
	}
	.disabled{
		background-color: #93d3ff;
	}
}
</style>
<style type="text/css">
.ProvCityHeaderCancle {
	color: #666 !important;
}
.ProvCityHeaderConfirm  {
	color: #3baefe !important;
}
</style>