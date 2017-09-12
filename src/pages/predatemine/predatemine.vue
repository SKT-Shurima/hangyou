<template>
  <div class="wrap">
    <x-header :left-options="{backText: ''}">预定</x-header>
  	<div class="container">
  		<div class="travelInfo" v-if='hotel.length||flight.length'>
  			<h1 v-if='hotel.length'>酒店信息<a href="javascript:void(0)" @click='checkDetail'>详情</a></h1>
  			<dl v-for='(item,index) in hotel' :key='index'>
  				<dt class="date">
  					{{(thisDay-0+(item.start_day-1)*86400)*1000|dateStyle}}({{item.start_time}})至{{(thisDay-0+(item.end_day-1)*86400)*1000|dateStyle}}({{item.end_time}})
  				</dt>
  				<dd class="name" v-text='item.name'></dd>
  			</dl>
  			<h1 style="margin-top:10px;" v-if='flight.length'>航班信息</h1>
  			<dl v-for='(item,index) in flight' :key='index'>
  				<dt class="date">
  					{{(thisDay+(item.flight_day-1)*86400)*1000|dateStyle}}
  				</dt>
  				<dd class="site">
  					{{item.start_station}}({{item.start_time}})<i class="airIcon"></i>{{item.end_station}}({{item.end_time}})<em v-if='item.end_extra-0'>+1</em>
  				</dd>
  			</dl>
  		</div>
  		<div class="dateInfo">
  			<div class="title">
  				<span class="pre" @click='month--;'><x-icon type="ios-arrow-left" size="14"></x-icon>{{preMonth}}月</span>
  				<strong>{{year}}年{{month}}月</strong>
  				<span class="next" @click='month++;'>{{nextMonth}}月<x-icon type="ios-arrow-right" size="14"></x-icon></span>
  			</div>
  			<table cellpadding="0" cellspacing="0" class="dateTable">
  				 <thead>
		          	<tr class="dateHeader">
		            	<th>日</th>
		  				<th>一</th>
		  				<th>二</th>
		  				<th>三</th>
		  				<th>四</th>
		  				<th>五</th>
		  				<th>六</th>
		          	</tr>
		        </thead>
		        <tbody>
		         	<tr v-for='week in dateList'>
		         		<td v-for='item in week' :class="{'noticket':item.ticket==='0'}">
		         			<dl :class='{"active":day === item.date}' @click='chooseDate(item)'>
		         				<dt class="date" v-text='item.date'></dt>
		         				<dd class="price" v-show='item.adult_price-0'>{{item.adult_price-0|currency}}</dd>
		         				<dd class="ticket">{{item.ticket==='0'?'已售罄':item.ticket===""?"":`余${item.ticket}`}}</dd>
		         			</dl>
		         		</td>
		          	</tr>
		        </tbody>
  			</table>
  		</div>
  		<div  class="choose">
  			<h1>选择数量</h1>
  			<ul>
  				<li>
  					<span>成人</span>&nbsp;&nbsp;<em v-show='priceInfo.adult_price-0'>{{priceInfo.adult_price|currency}}</em>/人
  					<div class="btn-box">
						<button @click='adult_count--;' :disabled='adult_count-0===0'><x-icon type="ios-minus-empty" size="20"></x-icon></button>
						<input type="number" name="" disabled  v-model.number='adult_count'>
						<button @click='adult_count++;'><x-icon type="ios-plus-empty" size="20"></x-icon></button>
					</div>
				</li>
  				<li>
  					<span>儿童</span>&nbsp;&nbsp;<em v-show='priceInfo.child_price-0'>{{priceInfo.child_price|currency}}</em>/人&nbsp;&nbsp;不占床位
  					<div class="btn-box">
						<button @click='child_count--;' :disabled='child_count-0===0'><x-icon type="ios-minus-empty" size="20"></x-icon></button>
						<input type="number" name="" disabled  v-model.number='child_count'>
						<button @click='child_count++;'><x-icon type="ios-plus-empty" size="20"></x-icon></button>
					</div>
  				</li>
  				<li>
  					<span>房间</span>&nbsp;&nbsp;单人差<em v-show='(priceInfo.difference-0)&&((adult_count-0)%2)'>{{priceInfo.difference|currency}}</em>
  					<i v-text=' Math.ceil(adult_count/2)' class="diffCount"></i>
  				</li>
  			</ul>
  		</div>
  	</div>
    <dl class="submit">
    	<dt>
    		总价：<span> {{(totalprice-0).toFixed(2)|currency}}</span>
    	</dt>
    	<dd @click='chooseSpecial'>
    		下一步
    	</dd>
    </dl>
  </div>
</template>

<script type='text/esmascript-6'>
import XHeader from 'vux/src/components/x-header'
import {reserve} from '../../config/api' 
export default {
  	data () {
	    return {
	    	month: "",
	    	year: "",
	    	day: "",
	    	preMonth: "",
	    	nextMonth: "",
	    	userInfo: "",
	    	dateList: [],
	    	adult_count: 0,
	    	child_count: 0,
	    	reqParams: {},
	    	date_price: [],
	    	date_price_id: '',
	    	hotel: [],
	    	flight: [],
	    	priceInfo: {
	    		date:'',
	    		adult_price:'',
	    		child_price:'',
	    		difference:'',
	    		ticket: ""
	    	},
	    	totalprice: 0,
	    	isFirst: true,
	    	max: 0,
	    	thisDay: 0
	    }
  	},
  	components: {
    	XHeader
  	},
  	watch: {
  		month(newVal,oldVal){
  			if (newVal===13) {
  				this.year++;
  				this.month = 1 ;
  				return false;
  			}
  			if (newVal===0) {
  				this.year--;
  				this.month = 12 ;
  				return false;
  			}
  			this.preMonth = newVal === 1 ? 12 : newVal-1;
  			this.nextMonth = newVal ===12 ? 1: newVal+1;
  			if (!this.isFirst) {
  				this.initDate();
  			}
  			if (newVal) {
  				this.isFirst = false;
  			}
  		},
  		adult_count(newVal,oldVal){
  			this.child_count = this.child_count > parseInt(this.adult_count/2) ? parseInt(this.adult_count/2):this.child_count;
  			this.countPrice();
  		},
  		child_count(newVal,oldVal){
  			this.child_count = this.child_count > parseInt(this.adult_count/2) ? parseInt(this.adult_count/2):this.child_count;
  			this.countPrice();
  		}
  	},
  	methods: {
  		checkDetail(){
  			let goods_id = this.reqParams.goods_id ;
  			let date =  parseInt(new Date(this.year,this.month-1,this.day).getTime()/1000);
  			this.$router.push(`/hotelFlightDetail?goods_id=${goods_id}&date=${date}`);
  		},
  		getInfo(){
  			let params = {
  				access_token: this.userInfo.access_token,
  				goods_id: this.reqParams.goods_id
  			}
  			reserve(params).then(res=>{
  				let {errcode,message,content} = res;
      			if (errcode!==0) {
      				this.errcode(errcode,message);
      			}else{
      				this.date_price = content.date_price ;
      				this.initDate();
      				this.hotel = content.hotel?content.hotel:this.hotel;
					this.flight = content.flight?content.flight:this.flight;
					this.$vux.loading.hide();
      			}
  			})
  		},
  		initDate(){
  			let year = this.year,month = this.month ;
  			let firstDay = new Date(year,month-1).getDay();
  			this.thisDay = parseInt(new Date(this.year,this.month-1,this.day)/1000);
  			this.dateList = [] ;
  			let arr = [];
  			for(let i = 0 ; i < firstDay ; i++){
  				let emptyObj = {
  					date: '',
					adult_price: '',
					ticket: ''
			  	}
			  	arr.push(emptyObj);
  			}
  			let date = new Date(year,month,0).getDate();
  			let priceArr = this.date_price;
  			let priceIndex = 0 ;
  			for(let j = 1 ; j<= date ; j++){
  				let date = parseInt(new Date(this.year,this.month-1,j).getTime()/1000);
  				let obj ;
  				let priceDate = 0;
  				if (priceArr[priceIndex]) {
  					priceDate = priceArr[priceIndex].date-0
  				};
  				while(priceDate<date){
  					priceIndex++;
  					break;
  				}
  				if (date===priceDate) {
  					obj = {
	  					date: j,
						adult_price: priceArr[priceIndex].adult_price,
						child_price: priceArr[priceIndex].child_price,
						difference: priceArr[priceIndex].difference,
						ticket: priceArr[priceIndex].ticket,
						date_price_id: priceArr[priceIndex].date_price_id
				  	}
				  	priceIndex++;
  				}else{
  					obj = {
	  					date: j,
						adult_price: '',
						child_price: "",
						difference: "",
						ticket: '',
						date_price_id:''
				  	}
  				}
  				if (j===this.day) {
  					this.priceInfo = obj;
  					this.date_price_id = obj.date_price_id;
  					this.countPrice();
  				}
			  	arr.push(obj);
  			}
  			let lastDay = new Date(year,month).getDay();
  			if (lastDay) {
  				for (let k = lastDay; k < 7; k++) {
	  				let emptyObj = {
	  					date: '',
						adult_price: '',
						ticket: ''
				  	}
				  	arr.push(emptyObj);
	  			}
  			}
  			// 分割
  			let dateArr = [];
  			let index = 0 ;
  			for(let m = 0 ; m < arr.length ;m =7*index){
  				let weekArr = [];
  				for (let n = 0; n < 7; n++) {
  					weekArr.push(arr[m+n])
  				}
  				index++;
  				dateArr.push(weekArr);
  			}
  			this.dateList =  dateArr ;
  		},
		chooseDate(item){
			this.day = item.date;
			this.date_price_id = item.date_price_id;
			this.getInfo();
		},
  		changeAdultNum(val){
  			this.adult_count = val;
  			this.max = parseInt(this.adult_count/2);
  			this.countPrice();
  		},
  		changeChildNum(val){
  			this.child_count = val;
  			this.countPrice();
  		},
  		chooseSpecial(){
  			let date_price_id =  this.date_price_id.trim();
  			let count = this.adult_count-0;
  			let ticket = this.priceInfo.ticket - 0;
  			if (date_price_id!==""&&count&&ticket) {
  				let preBaseInfo = {
  					adult_count: this.adult_count,
  					child_count: this.child_count,
  					room_count: Math.ceil(this.adult_count/2),
  					difference: this.priceInfo.difference,
  					goods_id: this.reqParams.goods_id,
  					date_price_id: this.date_price_id,
  					totalprice: this.totalprice
  				}
  				let hotel = this.hotel;
  				let goods_hotel = [];
  				for(let i = 0;i<hotel.length;i++){
  					goods_hotel.push(hotel[i].goods_hotel_id);
  				}
  				if (goods_hotel.length) {
  					preBaseInfo.goods_hotel = goods_hotel;
  				}
  				let goods_flight = [];
  				let flight =  this.flight;
  				for(let i = 0;i<flight.length;i++){
  					goods_flight.push(flight[i].goods_flight_id);
  				}
  				if (goods_flight.length) {
  					preBaseInfo.goods_flight = goods_flight;
  				}
  				preBaseInfo.date = this.thisDay;
  				preBaseInfo.travel_days = this.reqParams.travel_days;
  				sessionStorage.preBaseInfo = JSON.stringify(preBaseInfo);
  				this.$router.push(`./chooseSpecial?goods_id=${this.reqParams.goods_id}`);
  			}else{
  				if (!ticket) {
  					this.$vux.toast.show({
	                    text: '该日期已售罄',
	                    time: 3000,
	                    type: "text",
	                    width: "12em",
	                    position: 'bottom',
	                })
  				}else if (!date_price_id) {
					this.$vux.toast.show({
	                    text: '该日期不可选',
	                    time: 3000,
	                    type: "text",
	                    width: "12em",
	                    position: 'bottom',
	                })
  				}else if (!this.adult_count) {
					this.$vux.toast.show({
	                    text: '请选择人数',
	                    time: 3000,
	                    type: "text",
	                    width: "12em",
	                    position: 'bottom'
	                })
  				}
  			}
  		},
  		countPrice(){
  			this.totalprice = this.priceInfo.adult_price*this.adult_count+this.priceInfo.child_price*this.child_count;
  			if ((this.adult_count-0)%2) {
  				this.totalprice += this.priceInfo.difference-0;
  			}
  		}
	},
	created(){
		sessionStorage.preBaseInfo = null;
		let emptyArr = [];
		sessionStorage.passenger = JSON.stringify(emptyArr);
		sessionStorage.special = JSON.stringify(emptyArr);
  		this.reqParams = this.getHashReq();
  		let userInfo =  localStorage.userInfo;
		if (userInfo) {
			this.userInfo =  JSON.parse(userInfo);	
		}
  	},
  	mounted(){
  		this.$nextTick(()=>{
  			if (!this.userInfo.access_token) {
  				this.$router.replace('./login');
  			}else{
  				sessionStorage.preBaseInfo = null;
	  			this.month =  new Date().getMonth()+1;
	  			this.year = new Date().getFullYear();
	  			this.day = new Date().getDate();
	  			this.getInfo();
	  			this.$vux.loading.show({
					text: 'Loading'
				})
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
		h1{
			margin: 6px 0px;
			overflow: hidden;
			@include sc(16px,#000);
			a{
				float: right;
				text-decoration: underline;
				@include sc(14px,$primary_color);
			}
		}
		.travelInfo{
			padding: 10px 14px;
			background-color: #fff;
			dl{
				line-height: 28px;
				@include sc(14px,$title_color);
			}
			.site{
				color: #000;
				em{
					color: $price_color;
				}
			}
			.airIcon{
				&::after{
					display: inline-block;
					content: "";
					width: 24px;
					height: 24px;
					vertical-align: middle;
					margin: 0px 4px;
					@include bg_image('../../images/predatemine/air');
				};
			}
		}
		.dateInfo{
			margin-top: 10px;
			background-color: #fff;
			.title{
				width: 100%;
				height: 48px;
				line-height: 48px;
				overflow: hidden;
				padding: 0px 14px;
				text-align: center;
				.vux-x-icon{
					fill: $primary_color;
					vertical-align: text-top;
				}
				strong{
					font-weight: 600;
					@include sc(15px,#000);
				}
				span{
					@include sc(13px,$primary_color);
				}
				.pre{
					float: left;
				}
				.next{
					float: right;
				}
			}
			.dateTable{
				width: 100%;
				tr{
					height: 54px;
				}
				td,th{
					text-align: center;
				}
				td{
					width: 14.28%;
					padding: 10px 0px;
				}
				.dateHeader{
					height: 36px;
					line-height: 36px;
					text-align: center;
					@include sc(14px,$hint_color);
					background-color: #f2f2f2;
				}
				.date{
					@include sc(13px,#000);
				}
				.price{
					@include sc(10px,$price_color);
				}
				.ticket{
					@include sc(10px,$detail_color);
				}
				.noticket{
					.date,.price,.ticket{
						color: $hint_color;
					}
				}
				dl{
					@include border-1px(transparent);
					border-radius: 5px;	
					min-height: 45px;
				}
				.active{
					@include border-1px($primary_color);
				}
			}
		}
		.choose{
			margin-top: 12px;
			padding: 10px 14px;
			background-color: #fff;
			li{
				padding: 10px 0px;
				overflow: hidden;
				@include sc(12px,$detail_color);
			}
			span{
				@include sc(14px,#000);
			}
			em{
				@include sc(12px,$price_color);
			}
			.diffCount{
				display: inline-block;
				width: 82px;
				height: 20px;
				text-align: center;
				float: right;
				font-size: 16px;
			}
		}	
	}
	.btn-box{
		float: right;
		width: 82px;
		height: 20px;
		.vux-x-icon{
			fill: #999;
		}
		button,input{
			float: left;
		}
		button{
			display: inline-block;
			width: 20px;
			height: 20px;
			border-radius: 2px;
			outline: none;
			border: none;
			background-color: #eee;
		}
		input{
			display: inline-block;
			width: 42px;
			height: 20px;
			font-size: 14px;
			color: #333;
			line-height: 20px;
			border: none;
			outline: none;
			text-align: center;
			background-color: #fff;
		}
	}
	.submit{
		position: fixed;
		z-index: 99;
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