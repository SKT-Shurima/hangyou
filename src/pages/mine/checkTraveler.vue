<template>
  <div class="wrap">
    <x-header :left-options="{backText: ''}">旅客信息</x-header>
    <div class="box">
    	 <div class="info">
	    	<ul>
				<li>
					<span>姓名</span><em v-text='name'></em>
				</li>
				<li>
					<span>姓氏 (拼音)</span><em v-text='surname'></em>
				</li>
				<li>
					<span>名字 (拼音)</span><em v-text='lname'></em>
				</li>
			</ul>
		</div>
		<dl class="other">
			<dt>
				<span>性别</span><em v-text='chooseSexText'></em>
			</dt>
			<dd><span>出生日期</span><em v-text='birthday'></em></dd>
			<dd>
				<span>身份证号</span><em v-text='card'></em>
			</dd>
		</dl>
    </div>
  </div>
</template>

<script type='text/esmascript-6'>
import XHeader from 'vux/src/components/x-header'  
import XInput from 'vux/src/components/x-input'  
import Group from 'vux/src/components/group' 
import Datetime from 'vux/src/components/datetime'  
import Cell from 'vux/src/components/cell'  
import XDialog from 'vux/src/components/x-dialog'  
import Radio from 'vux/src/components/radio' 
import XButton from 'vux/src/components/x-button'  
import TransferDom from 'vux/src/directives/transfer-dom' 
import {addPassenger,passengerInfo,editPassenger} from '../../config/api' 
export default {
	directives: {
	    TransferDom
	},
  	data () {
	  	let {y,m,d} = {y:new Date().getFullYear(),m:new Date().getMonth()+1,d:new Date().getDate()};
		let endDate = `${y}-${m}-${d}` ;
	    return {
	    	name: "",
	    	surname: "",
	    	lname: "",
	    	birthday: "",
	    	sex: "",
	    	card:"",
			chooseSexText: '',
	      	reqParams: {},
	      	userInfo: {}
	    }
  	},
	components: {
    	XHeader,XInput, Group,Datetime,Cell,XDialog,Radio,XButton 
  	},
  	methods: {
  		getPassengerInfo(){
  			let  params ={
  				access_token: this.userInfo.access_token,
  				customer_passenger_id: this.reqParams.customer_passenger_id
  			}
  			passengerInfo(params).then(res=>{
  				let {errcode,message,content} = res;
      			if (errcode!==0) {
      				this.errcode(errcode,message);
      			}else{
      				this.name= content.name;
      				this.surname= content.surname;
      				this.lname =content.lname;
      				this.card = content.card;
      				this.chooseSexText = content.sex==="0"?"男":"女";
      				this.sex = content.sex -0 ;
      				this.birthday = dateStyle(content.birthday*1000);
      				function dateStyle (time){
						time-=0;
					    var newDate = new Date(time);
					    let {y,m,d}={y:newDate.getFullYear(),m:newDate.getMonth()+1,d:newDate.getDate()};
					    m = trans(m);
					    d = trans(d);
					    return y +'-' + m + "-" + d ;
					}
					function trans (val){
					    if (val < 10) {
					      val = "0" + val ;
					    }
					    return val ;
					};
      			}
  			})
  		}
	},
  	created(){
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
		let hash = location.hash;
  		if (hash.indexOf("?")>-1) {
  			this.reqParams = this.getHashReq();	
  			if (this.reqParams.customer_passenger_id) {
				this.getPassengerInfo();
			}
  		}
  	}	
}
</script>
<style type="text/css" lang='scss' scoped>
@import '../../style/mixin.scss';
.wrap{
	min-height: 100vh;
}
.info,.other{
	background-color: #fff;
	li,dt,dd{
		padding: 14px 15px;
		overflow: hidden;
	}
	li{
		@include border-bottom-1px($border_color);
	}
	dt,dd{
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
		@include sc(15px,$title_color);
	}
}
.other{
	margin-top: 20px;
}
</style>