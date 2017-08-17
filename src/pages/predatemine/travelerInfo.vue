<template>
  <div class="wrap">
    <x-header :left-options="{backText: ''}">旅客信息</x-header>
     <group  gutter='0'>
      <x-input title="姓名" name="username" placeholder="请输入您的姓名" is-type="china-name" placeholder-align='right'  text-align='right' ></x-input>
      <x-input title="姓氏 (拼音)" name="username" placeholder="请输入您的姓氏"  placeholder-align='right'  text-align='right'></x-input>
      <x-input title="名字 (拼音)" name="username" placeholder="请输入您的名字" is-type="china-name" placeholder-align='right'  text-align='right'></x-input>
    </group>
     <group  >
     	<div @click='chooseSex=true;'><cell title="性别" :value="chooseSexText" :is-link='true'></cell></div>
	    <div v-transfer-dom>
	      <x-dialog v-model="chooseSex" class="dialog-demo">
	        <radio title="选择性别" :options="sexOptions" v-model="sexVal" @on-change='sexChange'></radio>
	      </x-dialog>
	    </div>
      	<datetime v-model="birth" @on-change="birthChange" :title="birthDate"  :end-date='endDate' start-date='1900-01-01' placeholder='请选择您的出生日期'></datetime>
      	<x-input title="身份证号"  placeholder="请输入您的身份证号" is-type="china-name" placeholder-align='right'  text-align='right' style='font-size: .4rem;'></x-input>
    </group>
    <p　class='tips'>
    	<i></i>护照请在出发日期前自行办理，如因用户自身原因（没有护照后者不及时办理护照签证等问题）导致无法成行，后果由用户自行承担，平台概不负责。注：自助办理护照与签证用户，购买产品时请预留足够的时间办理护照，目的地为非免签＆落地签国家及地区，请预留足够时间办理签证。
    </p>
    <div class="submit">
    	确定
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
export default {
	directives: {
	    TransferDom
	},
  	data () {
	  	let {y,m,d} = {y:new Date().getFullYear(),m:new Date().getMonth()+1,d:new Date().getDate()};
		let endDate = `${y}-${m}-${d}` ;
	    return {
	    	birth: "",
	    	birthDate: '出生日期',
	      	endDate: endDate,
	      	chooseSex: false,
			chooseSexText: '请选择性别',
	      	sexVal: "",
	      	sexOptions: [{
	      		key: 1,
	      		value: '男'
	      	},{
	      		key: 0,
	      		value: '女'
	      	}]
	    }
  },
  methods: {
  	birthChange (value) {
      console.log('change', value)
    },
    sexChange (value, label) {
      console.log('change:', value, label);
      this.chooseSexText = label;
      this.chooseSex =  false;

    }
},
   components: {
    XHeader,XInput, Group,Datetime,Cell,XDialog,Radio,XButton 
  },
}
</script>
<style type="text/css" lang='scss' scoped>
@import '../../style/mixin.scss';
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
	background-color: #3baefe;
	text-align: center;
	@include sc(16px,#fff);
}
</style>