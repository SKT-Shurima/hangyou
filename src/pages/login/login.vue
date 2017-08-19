<template>
  	<div class="wrap">
	    <x-header :left-options="{backText: ''}">登录</x-header>
	    <div class="container">
	    	<div class="box">
	    		<div class="inputBox">
	    			<i class="phone"></i><input type="text" name="phone" v-model='phone' placeholder="请输入手机号">
	    		</div>
	    		<div class="inputBox">
	    			<i class="password"></i><input  placeholder="请输入登录密码"  type="text"  v-model="passwd" v-if="visible"  >
          			<input  placeholder="请输入登录密码"  type="password"  v-model="passwd" v-else>
	    			<i :class="visible?'visible':'notVisible'" @click='visible=!visible'></i>
	    		</div>
	    		<div class="subBtn">
	    			<button  @click='login' :disabled='!(phone&&passwd)'>登录</button>
	    		</div> 
	    		<div class="other">
	    			<router-link v-bind:to="'reg'" class='reg'>立即注册</router-link>
	    			<router-link v-bind:to="'forgetPw'" class='forget'>忘记密码</router-link>
	    		</div>
	    	</div>
	  	</div>
  	</div>
</template>

<script type='text/esmascript-6'>
import XHeader from 'vux/src/components/x-header'
import TransferDom from 'vux/src/directives/transfer-dom' 
import {OauthLogin} from '../../config/api'
export default {
	directives: {
	    TransferDom
	},
  	data () {
	    return {
	    	visible: true,
	    	passwd: "",
	    	phone: ''
	    }
  	},
	components: {
    	XHeader,
  	},
  	methods: {
  		login(){
  			this.phone = this.phone.trim();
      		this.passwd = this.passwd.trim();
  			let phone = this.checkPhone(this.phone);
  			let passwd = this.checkVal(this.passwd,"密码");
  			if (phone&&passwd) {
  				let params = {
  					phone: this.phone,
  					passwd: this.passwd,
  					oauth: 'Phone'
  				}
  				OauthLogin(params).then(res=>{
  					let {errcode,message,content} = res;
	      			if (errcode!==0) {
	      				this.$vux.alert.show({
						  	title: '',
						  	content: message
						});
	      			}else{
	      				let userInfo = window.localStorage.userInfo ;
	      				if (userInfo) {
	      					localStorage.removeItem('userInfo');
	      				}
	      				content = JSON.stringify(content);
	      				localStorage.setItem('userInfo',content);
	      				this.$router.replace('./home');
	      			}
  				})
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
@import '../../style/login.scss';
</style>
