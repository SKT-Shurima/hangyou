<template>
  <div class="wrap">
    <x-header :left-options="{backText: ''}">旅客信息</x-header>
     <group  gutter='0'>
      <x-input title="姓名" name="username" placeholder="请输入您的姓名" placeholder-align='right'  text-align='right' v-model='name'></x-input>
      <x-input title="姓氏 (拼音)" name="username" placeholder="请输入您的姓氏"  placeholder-align='right'  text-align='right' v-model='surname'></x-input>
      <x-input title="名字 (拼音)" name="username" placeholder="请输入您的名字" placeholder-align='right'  text-align='right' v-model='lname'></x-input>
    </group>
     <group  >
     	<div @click='chooseSex=true;'><cell title="性别" :value="chooseSexText" :is-link='true'></cell></div>
	    <div v-transfer-dom>
	      <x-dialog v-model="chooseSex" class="dialog-demo">
	        <radio title="选择性别" :options="sexOptions" v-model="sex" @on-change='sexChange'></radio>
	      </x-dialog>
	    </div>
      	<datetime v-model="birthday" @on-change="birthChange" :title="birthDate"  :end-date='endDate' start-date='1900-01-01' placeholder='请选择您的出生日期'></datetime>
      	<x-input title="身份证号"  placeholder="请输入您的身份证号" placeholder-align='right'  text-align='right' v-model='card'></x-input>
    </group>
    <p　class='tips'>
    	<i></i>护照请在出发日期前自行办理，如因用户自身原因（没有护照后者不及时办理护照签证等问题）导致无法成行，后果由用户自行承担，平台概不负责。注：自助办理护照与签证用户，购买产品时请预留足够的时间办理护照，目的地为非免签＆落地签国家及地区，请预留足够时间办理签证。
    </p>
    <div class="submit">
    	<button :disabled='!(name&&surname&&lname&&birthday&&sex!==""&&card)' class="btn" :class='{"disabled":!(name&&surname&&lname&&birthday&&sex!==""&&card)}' @click='ensure'>确定</button>
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
import {addPassenger} from '../../config/api' 
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
	    	birthDate: '出生日期',
	      	endDate: endDate,
	      	chooseSex: false,
			chooseSexText: '请选择性别',
	      	sexOptions: [{
	      		key: 0,
	      		value: '男'
	      	},{
	      		key: 1,
	      		value: '女'
	      	}],
	      	reqParams: ""
	    }
  	},
	components: {
    	XHeader,XInput, Group,Datetime,Cell,XDialog,Radio,XButton 
  	},
  	methods: {
  		birthChange (value) {
    	},
    	sexChange (value, label) {
      		this.chooseSexText = label;
      		this.chooseSex =  false;
    	},
    	ensure(){
    		this.name = this.name.trim();
    		this.surname = this.surname.trim();
    		this.lname = this.lname.trim();
    		this.card = this.card.trim();
    		let name = this.checkVal(this.name,"姓名");
    		let surname = this.checkVal(this.surname,"姓氏");
    		let lname = this.checkVal(this.lname,"名字");
    		let card = this.checkVal(this.card,"身份证号");
    		let regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    		let cardBol = regIdCard.test(this.card);
    		if (name&&surname&&lname&&cardBol&&card) {
    			let birthArr =  this.birthday.split('-');
    			let birth = parseInt((new Date(birthArr[0],birthArr[1]-1,birthArr[2]).getTime()/1000));
    			let params ={
    				access_token: this.userInfo.access_token,
    				name: this.name,
    				surname: this.surname,
    				lname: this.lname,
    				sex: this.sex,
    				birthday: birth,
    				card: this.card
    			}
    			if (this.reqParams) {
    				params.customer_passenger = this.reqParams.customer_passenger_id ;
    			}
    			addPassenger(params).then(res=>{
    				let {errcode,message,content} = res;
	      			if (errcode!==0) {
	      				this.errcode(errcode,message);
	      			}else{
	      				let _this = this;
	      				this.$vux.alert.show({
						  	title: '',
						  	content: message,
						  	onHide(){
						  		let addTraveler = _this.reqParams.addTraveler;
								if (addTraveler) {
									let storePassenger = JSON.parse(sessionStorage.passenger);
									storePassenger.push(content);
									sessionStorage.passenger = JSON.stringify(storePassenger);
									_this.$router.replace('/completeInfo');
								}else{
									_this.$router.back(-1);
								}
						  	}
						});
						
	      			}
    			})
    		}else{
    			this.$vux.alert.show({
				  	title: '',
				  	content: '请输入正确信息'
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