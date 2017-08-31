<template>
  	<div class="wrap">
	    <x-header :left-options="{backText: ''}">注册 <button class="login loginBtn">
	    <a href="#login">登录</a></button></x-header>
	    <div class="container">
	    	<div class="box">
	    		<div class="inputBox">
	    			<i class="phone"></i><input type="number" name="phone" v-model='phone' placeholder="请输入手机号" onkeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))">
	    		</div>
	    		<div class="inputBox">
	    			<i class="nickname"></i><input type="text" name="phone" v-model='nickname' placeholder="请输入昵称">
	    		</div>
	    		<dl class="codeBox">
	    			<dt class="inputBox">
		    			<i class="code"></i><input type="text" name="phone" v-model='verify_code' placeholder="请输入验证码">
		    		</dt>
		    		<dd>
		    			<button v-text='sendText' @click='send_code' :disabled='time>-1'></button>
		    		</dd>
	    		</dl>
	    		<div class="inputBox">
	    			<i class="password"></i><input  placeholder="请输入登录密码"  type="text"  v-model="passwd" v-if="visible"  >
          			<input  placeholder="请输入登录密码"  type="password"  v-model="passwd" v-else>
	    			<i :class="visible?'visible':'notVisible'" @click='visible=!visible'></i>
	    		</div>
	    		<div class="agreement">
			    	<i :class="{'agree': agreement}" @click='agreement=!agreement'></i>我同意接受<a href="#/protocol">《用户条款及协议》</a>
			    </div>
	    		<div class="subBtn">
	    			<button :disabled='!(agreement&&phone&&passwd&&verify_code)' @click='reg'>注册</button>
	    		</div> 
	    	</div>
	  	</div>
  	</div>
</template>

<script type='text/esmascript-6'>
import XHeader from 'vux/src/components/x-header'
import TransferDom from 'vux/src/directives/transfer-dom' 
import {sendCode,oauthRegister} from '../../config/api'

export default {
	directives: {
	    TransferDom
	},
  	data () {
	    return {
	    	visible: false,
	    	nickname: "",
	    	verify_code: "",
	    	passwd: "",
	    	phone: '',
	    	time: -1 ,
	        total_time: 60, 
	        sendText: '发送验证码',
	        agreement: false
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
	      			type: '0',
	      			sign: this.hex_md5(`${this.phone}sendCode`)
	      		}
	      		sendCode(params).then(res=>{
	      			let {errcode,message} = res ;
	      			if (errcode!==0) {
	      				this.$vux.toast.show({
		                    text: message,
		                    time: 3000,
		                    type: "text",
		                    width: "12em",
		                    position: 'bottom'
		                });
	      			}else{
	      				this.time = this.total_time ;
		      			let timer = setInterval(()=>{
				      		this.time--;
				      		this.sendText = this.time + 's后重发';
				      		if (this.time < 0) {
				      			this.time = -1;
				      			this.sendText = '发送验证码';
				      			clearInterval(timer);
				      		}
				      	},1000)
	      			}
	      		})
  			}
	    },
	    reg(){
      		this.phone = this.phone.trim();
      		this.nickname = this.nickname.trim();
      		this.verify_code = this.verify_code.trim();
      		this.passwd = this.passwd.trim();
      		let phone = this.checkPhone(this.phone);
      		let nickname = this.checkVal(this.nickname,"昵称");
      		let verify_code = this.checkVal(this.verify_code,"验证码");
      		let passwd = this.checkVal(this.passwd,"密码");
      		if (phone&&nickname&&verify_code&&passwd) {
      			let params = {
		      		phone: this.phone,	
					nickname: this.nickname,	
					verify_code: this.verify_code,
					passwd: this.hex_md5(this.passwd),	
					oauth: 'Phone'
	      		}
	      		oauthRegister(params).then(res=>{
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
	      				let userInfo = window.localStorage.userInfo ;
	      				if (userInfo) {
	      					localStorage.removeItem('userInfo');
	      				}
	      				localStorage.setItem('userInfo',content);
	      				this.$router.replace('./login');
	      			}
	      		})
      		}else{
      			this.$vux.toast.show({
                    text: '请输入正确信息',
                    time: 3000,
                    type: "text",
                    width: "12em",
                    position: 'bottom'
                });
      		}
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
@import '../../style/login.scss'
</style>
