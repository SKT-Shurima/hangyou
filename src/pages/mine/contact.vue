<template>
  <div class="wrap">
    <x-header :left-options="{backText: ''}">紧急联系人</x-header>
    <div class="box" v-if='info'>
    	<div class="info">
	    	<ul>
				<li>
					<span>姓名</span><em v-text='info.name'></em>
				</li>
				<li>
					<span>邮箱</span><em v-text='info.email'></em>
				</li>
				<li>
					<span>手机号码</span><em v-text='info.phone'></em>
				</li>
			</ul>
		</div>
		<dl class="address">
			<dt>
				<span>地址</span><em v-text='info.pca'></em>
			</dt>
			<dd>详细地址</dd>
			<dd v-text='info.address'>
				
			</dd>
		</dl>
	    <div class="submit">
	    	<a href="javascript:void(0)" @click='edit'>编辑</a>
	    </div>
    </div>
    <div v-else class="noContact">
    	没有联系人
    	<div class="submit">
	    	<router-link to='/editContact'>添加</router-link>
	    </div>
    </div>
    
  </div>
</template>

<script type='text/esmascript-6'>
import XHeader from 'vux/src/components/x-header'  
import {getContact} from '../../config/api' 
export default {
  	data () {
	    return {
	    	info: null
	    }
  	},
	components: {
    	XHeader
  	},
  	methods: {
  		edit(){
  			let id= this.info.customer_contact_id
  			this.$router.push(`/editContact?customer_contact_id=${id}`);
  		},
  		getInfo(){
  			let params = {
  				access_token: this.userInfo.access_token
  			}
  			getContact(params).then(res=>{
  				let {errcode,message,content} = res;
      			if (errcode!==0) {
      				this.errcode(errcode,message);
      			}else{
      				this.info =  content ;
      			}
  			})
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
			this.$router.replace('./login');
		}
  	},
  	mounted(){
  		this.$nextTick(()=>{
  			if (!this.userInfo.access_token) {
  				this.$router.replace('./login');
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
.address{
	margin-top: 20px;
}
.info,.address{
	background-color: #fff;
	li,dt,dd{
		padding: 14px 15px;
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
.noContact{
	margin-top: 20px;
	text-align: center;
	@include sc(14px,$title_color);
}
.submit{
	position: fixed;
	bottom: 0px;
	width: 100%;
	height: 50px;
	line-height: 50px;
	text-align: center;
	background-color: $primary_color;
	a{
		display: block;
		width: 100%;
		height: 100%;
		background: transparent;
		border: none;
		outline: none;
		@include sc(16px,#fff);
	}
}
</style>