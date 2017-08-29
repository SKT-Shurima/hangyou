<template>
  <div class="wrap">
    <x-header :left-options="{backText: ''}">选择特定项目</x-header>
    <div class="container">
    	<ul>
			<li v-for='(item,index) in specialList' :key='index'>
				<dl>
					<dt>
						<img :src="item.images">
					</dt>
					<dd>
						<div class="name" v-text='item.name'></div>
						<div class="chooseDate">
							<span v-text='item.date' @click='chooseDate(index)'></span><i class="icon"></i>
						</div>
						<div class="priceInfo">
							<div class="price">
								<em>{{item.price|currency}}</em>/人	
							</div>
							<div class="chooseNum">份数&nbsp;&nbsp;<v-number :value='item.count' :index='index'  @onchange='changeNum'></v-number></div>
						</div>
					</dd>
				</dl>
			</li>
	  	</ul>
	  	<div class="noMore">
			没有更多了
		</div>
    </div>
    <dl class="submit">
    	<dt>
    		总价：<span> {{totalprice|currency}}</span>
    	</dt>
    	<dd @click='completeInfo'>
    		下一步
    	</dd>
    </dl>
 	<div v-transfer-dom>
  		<popup v-model="chooseBol" @on-hide="" @on-show="">
  			<dl class="opera">
  				<dt @click='chooseBol=false'>取消</dt>
  				<dd @click='ensure'>确定</dd>
  			</dl>
  			<picker :data='dateList' v-model='dateVal' @on-change='change'></picker>
  		</popup>
	</div>
  	</div>
</template>
<script type='text/esmascript-6'>
import XHeader from 'vux/src/components/x-header'
import VNumber from '../../comment/v-number'
import Popup from 'vux/src/components/popup'
import Picker from 'vux/src/components/picker'
import TransferDom from 'vux/src/directives/transfer-dom' 
import Utils from '../../config/toChinese'
import {selectSpecial} from '../../config/api' 
export default {
	directives: {
	    TransferDom
	},
  	data () {
	    return {
	    	src: 'https://static.vux.li/demo/1.jpg',
	    	date: '请选择使用日期',
	    	chooseBol: false,
	    	dateList: [],
	    	dateVal: [""],
	    	userInfo: '',
	    	specialList: [],
	    	totalprice: 0,
	    	preBaseInfo: '',
	    	index: ''
	    }
  	},
	components: {
    	XHeader,VNumber,Picker,Popup
  	},
  	watch:{
  		specialList:{
  			handler(newVal,oldVal){
  				let totalprice =  this.preBaseInfo.totalprice;
  				let price = 0;
  				for (let i = 0; i < newVal.length; i++) {
  					if (newVal[i].count-0) {
  						price += newVal[i].price*newVal[i].count;
  					}
  				}
  				this.totalprice = totalprice+price;
  			},
  			deep: true
  		}
  	},
  	methods: {
  		initDateList(){
  			let start =  this.preBaseInfo.start_time;
  			let end =  this.preBaseInfo.end_time;
  			let day = (end-start)/86400;
  			let arr = [] ;
  			for (let i = 0; i < day; i++) {
  				let time = start + i*86400;
  				let val = dateStyle(time);
  				let numDay = Utils.numberToChinese(i+1);
  				val = `${val}(第${numDay}天)`;
  				arr.push(val);
  			}
  			this.dateList.push(arr);	
  			function dateStyle(time){
  				time*=1000;
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
  		},
  		initList(){
  			let params = {
  				access_token: this.userInfo.access_token,
  				start_id: this.reqParams.start_id
  			}
  			selectSpecial(params).then(res=>{
  				let {errcode,message,content} = res;
      			if (errcode!==0) {
      				this.errcode(errcode,message);
      			}else{
      				let arr = [];
      				for (let i = 0; i < content.length; i++) {
      					arr[i] = content[i];
      					arr[i].count = 0 ;
      					arr[i].date = '请选择使用日期';
      				}
      				this.specialList =  arr;	
      			}
  			})
  		},
  		chooseDate(index){
  			this.index = index;
  			this.chooseBol = true;
  			this.dateVal[0] = this.dateList[0][0];
  		},
  		changeNum(obj){
  			let index = obj.index;
  			this.specialList[index].count =  obj.value;

  		},	
	    change (val) {
	      console.log('val change', val)
	    },
	    ensure(){
	    	this.specialList[this.index].date = this.dateVal[0];
	    	this.chooseBol = false;
	    },
	    completeInfo(){
	    	let arr =  this.specialList;
	    	let chooseArr = [];
	    	for (let i = 0; i < arr.length; i++) {
	    		let reg = /\d/g;
	    		if (arr[i].count&&reg.test(arr[i].date)) {
	    			let date = arr[i].date.split('(')[0].split('-');
	    			let use_date = parseInt((new Date(date[0],date[1]-0,date[2]).getTime()/1000));
	    			let obj = {
	    				count: arr[i].count,
	    				start_special_id: arr[i].start_special_id,
	    				price: arr[i].price,
	    				use_date: use_date
	    			}
	    			chooseArr.push(obj);
	    		}
	    	}
	    	sessionStorage.special = JSON.stringify(chooseArr);
	    	this.$router.push('/completeInfo');
	    }
	},
	created(){
		sessionStorage.special = null;
		this.preBaseInfo = JSON.parse(sessionStorage.preBaseInfo);
		this.initDateList();
		this.totalprice = this.preBaseInfo.totalprice;
  		this.reqParams = this.getHashReq();
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
  				this.initList();
  			}
  		})
  	}
}
</script>
<style type="text/css" lang='scss' scoped>
@import '../../style/mixin.scss';
	.container{
		position: fixed;
		top: 46px;
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		padding-bottom: 100px;
		background-color: #f7f7f7;
		dl{
			display: -webkit-box;
			padding: 14px 0px 12px;
			@include border-bottom-1px(#ccc);
		}
		dt{
			display: inline-block;
		    text-align: center;
		    overflow: hidden;
			width: 85px;
			height: 85px;
			margin: 0px 15px;
			img{
				width: 100%;
				height: 100%;
			}
		}
		dd{
			-webkit-box-flex: 1;
			padding-right: 15px;
		}
		.name{
			@include sc(15px,#000);
			@include ellipsis(1);
		}
		.chooseDate{
			@include sc(13px,$detail_color);
			margin: 8px 0px 14px;
			.icon{
				display: inline-block;
				width: 12px;
				height: 12px;
				vertical-align: -2px;
				@include bg-image('../../images/predatemine/down');
			}
		}
		.priceInfo{
			overflow: hidden;
			.price{
				float: left;
				@include sc(15px,$title_color);
				em{
					@include sc(16px,$price_color);
				}
			}
		}
		.chooseNum{
			float: right;
			margin-top: 4px;
			@include sc(14px,#ccc);
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
	.noMore{
		margin-top: 16px;
		text-align: center;
		@include sc(15px,$hint_color);
	}
	.submit{
		position: fixed;
		z-index: 99999;
		bottom: 0px;
		width: 100%;
		height: 48px;
		line-height: 48px;
		dt{
			float: left;
			width: 62%;
			padding-left: 14px;
			@include sc(15px,#000);
			background-color: #fff;
			span{
				@include sc(18px,$price_color);
			}
		}
		dd{
			float: right;
			width: 38%;
			text-align: center;
			@include sc(15px,#f7f7f7);
			background-color: $primary_color;
		}
	}
</style>