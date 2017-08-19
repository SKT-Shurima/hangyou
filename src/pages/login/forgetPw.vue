<template>
  	<div class="wrap">
	    <x-header :left-options="{backText: ''}">忘记密码<button class="login loginBtn"><a href="#login">登录</a></button></x-header>
	    <div class="container">
	    	<div class="box">
	    		<div class="inputBox">
	    			<i class="phone"></i><input type="text" v-model='phone' placeholder="请输入手机号">
	    		</div>
	    		<dl class="codeBox">
	    			<dt class="inputBox">
		    			<i class="code"></i><input type="text" v-model='verify' placeholder="请输入验证码">
		    		</dt>
		    		<dd>
		    			<button v-text='sendText' @click='send_code' :disabled='sendBol'></button>
		    		</dd>
	    		</dl>
	    		<div class="inputBox">
	    			<i class="password"></i><input  placeholder="请输入密码"  type="text"  v-model="passwd" v-if="visible"  >
          			<input  placeholder="请输入密码"  type="password"  v-model="passwd" v-else>
	    			<i :class="visible?'visible':'notVisible'" @click='visible=!visible'></i>
	    		</div>
	    		<div class="inputBox">
	    			<i class="password"></i><input  placeholder="请再次输入密码"  type="text"  v-model="confirm_passwd" v-if="visible2"  >
          			<input  placeholder="请再次输入密码"  type="password"  v-model="confirm_passwd" v-else>
	    			<i :class="visible2?'visible':'notVisible'" @click='visible2=!visible2'></i>
	    		</div>
	    		<div class="agreement">
			    	<i :class="{'agree': agreement}" @click='agreement=!agreement'></i>我同意接受<a href="javascript:viod(0)">《用户条款及协议》</a>
			    </div>
	    		<div class="subBtn">
	    			<button :disabled='!(agreement&&phone&&passwd&&confirm_passwd&&verify)' @click='sure'>确定</button>
	    		</div> 
	    	</div>
	  	</div>
  	</div>
</template>

<script type='text/esmascript-6'>
import XHeader from 'vux/src/components/x-header'
import TransferDom from 'vux/src/directives/transfer-dom' 
import {sendCode,resetPasswd} from '../../config/api'
export default {
	directives: {
	    TransferDom
	},
  	data () {
	    return {
	    	visible: false,
	    	visible2: false,
	    	passwd: "",
	    	confirm_passwd: "",
	    	phone: '',
	    	verify:"",
	    	time: -1 ,
	        total_time: 60, 
	        sendText: '发送验证码',
	        sendBol: false,
	        agreement: false,
	        tips: false
	    }
  	},
	components: {
    	XHeader
  	},
  	methods: {
  		send_code(){
  			this.phone = this.phone.trim();
  			let phone = this.checkPhone(this.phone);
  			if (phone) {
  				let params = {
	      			phone: this.phone,
	      			type: '1',
	      			sign: this.hex_md5(`${this.phone}sendCode`)
	      		}
	      		sendCode(params).then(res=>{
	      			let {errcode,message} = res ;
	      			if (errcode!==0) {
	      				this.$vux.alert.show({
						  	title: '',
						  	content: message
						});
	      			}else{
	      				this.time = this.total_time ;
	      				this.sendBol = true;
		      			let timer = setInterval(()=>{
				      		this.time--;
				      		this.sendText = this.time + 's后重发';
				      		if (this.time < 0) {
				      			this.time = -1;
				      			this.sendText = '发送验证码';
				      			this.sendBol= false;
				      			clearInterval(timer);
				      		}
				      	},1000)
	      			}
	      		})
  			}
	    },
	    sure(){
	    	let _this = this;
	    	this.phone = this.phone.trim();
      		this.verify = this.verify.trim();
      		this.passwd = this.passwd.trim();
      		this.confirm_passwd = this.confirm_passwd.trim();
	    	let phone = this.checkPhone(this.phone);
	    	let passwd = this.checkVal(this.passwd,"密码");
	    	let confirm_passwd = this.checkVal(this.confirm_passwd,"确认密码");
	    	let verify = this.checkVal(this.verify,"验证码");
	    	if (this.passwd!==this.confirm_passwd) {
	    		this.$vux.alert.show({
				  	title: '',
				  	content: '两次输入密码不一致'
				});
				return false;
	    	}
	    	if (phone&&passwd&&confirm_passwd&&verify) {
	    		let params = {
	    			phone: this.phone,
	    			passwd: this.passwd,
	    			confirm_passwd:  this.confirm_passwd,
	    			verify: this.verify,
	    			type: 1
	    		}
	    		resetPasswd(params).then(res=>{
	    			let {errcode,message} = res;
	      			if (errcode!==0) {
	      				this.$vux.alert.show({
						  	title: '',
						  	content: message
						});
	      			}else{
	      				this.$vux.toast.show({
			  				text:'修改成功',
			  				time: 1000,
			  				onHide(){
			  					_this.$router.replace('./login');
			  				}
			  			})
	      			}
	    		})
	    	}else{
      			this.$vux.alert.show({
				  	title: '',
				  	content: '请完善信息'
				})
      		}
	    },
	    tipsHide(){

	    }
	},
  	mounted(){
  		this.$nextTick(()=>{
  		})
  	}
}
</script>
<style type="text/css" lang='scss' scoped>
@import '../../style/mixin.scss';
@import '../../style/login.scss';
</style>
