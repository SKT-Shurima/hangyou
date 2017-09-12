<template>
  <div class="wrap">
    <x-header :left-options="{backText: ''}">选择特定项目</x-header>
    <div class="container">
    	<ul>
			<li v-for='(item,index) in specialList' :key='index'>
				<dl>
					<dt @click='detailBol=true;descript=item.descript'>
						<img :src="item.images"  @load='successLoadImg' @error='errorLoadImg' class="default-image">
					</dt>
					<dd>
						<div class="name" v-text='item.name'></div>
						<div class="chooseDate">
							<div v-show='item.is_select_date==="1"'>
								<span v-text='item.date' @click.stop='chooseDate(index)'></span><i class="icon"></i>
							</div>
						</div>
						<div class="priceInfo">
							<div class="price">
								<em>{{item.price|currency}}</em>/人	
							</div>
							<div class="chooseNum" id='changeNum'>
								<span>份数&nbsp;&nbsp;</span>
								<em class="btn-box">
									<button @click='changCount(item,-1)' :disabled='item.count-0===0'><x-icon type="ios-minus-empty" size="20"></x-icon></button>
									<input type="number" name="" disabled  v-model.number='item.count'>
									<button @click='changCount(item,1)'><x-icon type="ios-plus-empty" size="20"></x-icon></button>
								</em>
							</div>
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
    		总价：<span> {{(totalprice-0).toFixed(2)|currency}}</span>
    	</dt>
    	<dd @click='completeInfo'>
    		下一步
    	</dd>
    </dl>
    <div v-transfer-dom>
      <x-dialog v-model="detailBol" :scroll="false" hide-on-blur>
      		<div v-html='descript' class='descript'>
      		</div>
      </x-dialog>
    </div>
 	<div v-transfer-dom>
  		<popup v-model="chooseBol">
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
import XDialog  from 'vux/src/components/x-dialog'
import VNumber from '../../comment/v-number'
import Popup from 'vux/src/components/popup'
import Picker from 'vux/src/components/picker'
import TransferDom from 'vux/src/directives/transfer-dom' 
import Utils from '../../config/toChinese'
import {selectSpecial} from '../../config/api'
let preRouter = '';
export default {
	directives: {
	    TransferDom
	},
  	data () {
  		
	    return {
	    	date: '请选择使用日期',
	    	chooseBol: false,
	    	dateList: [],
	    	dateVal: [""],
	    	userInfo: '',
	    	specialList: [],
	    	totalprice: 0,
	    	preBaseInfo: '',
	    	index: '',
	    	detailBol: false,
	    	descript: "",
	    	preRouter:''
	    }
  	},
	components: {
    	XHeader,VNumber,Picker,Popup,XDialog
  	},
  	watch:{
  		specialList:{
  			handler(newVal,oldVal){
  				let totalprice =  this.preBaseInfo.totalprice;
  				let price = 0;
  				for (let i = 0; i < newVal.length; i++) {
  					let date =  newVal[i].date;
  					if (newVal[i].is_select_date==='1') {
  						let reg = /\d/g;
  						if ((newVal[i].count-0)&&reg.test(date)) {
	  						price += newVal[i].price*newVal[i].count;
	  					}
  					}else{
  						if ((newVal[i].count-0)) {
	  						price += newVal[i].price*newVal[i].count;
	  					}
  					}
  					
  				}
  				this.totalprice = totalprice+price;
  			},
  			deep: true
  		}
  	},
  	methods: {
  		initDateList(){
  			let days =  this.preBaseInfo.travel_days;
  			let date = this.preBaseInfo.date-0;
  			let arr = [] ;
  			for (let i = 0; i < days; i++) {
  				let time = date + i*86400;
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
  			this.$vux.loading.show({
				text: 'Loading'
			});
  			let params = {
  				access_token: this.userInfo.access_token,
  				goods_id: this.reqParams.goods_id
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
      				this.$vux.loading.hide();
      				if (!arr.length) {
      					if (preRouter.indexOf('predatemine')>-1) {
      						let empty =[];
      						sessionStorage.special = JSON.stringify(empty);
      						this.$router.push('/completeInfo');
      					}else{
      						this.$router.back(-1);
      					}
      				}	
      			}
  			})
  		},
  		chooseDate(index){
  			this.index = index;
  			this.chooseBol = true;
  			this.dateVal[0] = this.dateList[0][0];
  		},
  		changCount(item,mask){
  			if (item.is_select_date==='1') {
  				let reg = /\d/g;
	  			if (!reg.test(item.date)) {
	  				this.$vux.toast.show({
	                    text: '请先选择使用日期',
	                    time: 3000,
	                    type: "text",
	                    width: "12em",
	                    position: 'bottom'
	                });
	                return false;
	  			}
  			}
  			if (mask<0) {
				item.count--;
			}else{
				item.count++;
			}
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
	    		let use_date = '';
	    		let  obj ;
	    		if (arr[i].is_select_date==='1') {
	    			let reg = /\d/g;
	    			if(arr[i].count&&reg.test(arr[i].date)){
		    			let date = arr[i].date.split('(')[0].split('-');
		    			use_date = parseInt((new Date(date[0],date[1]-0,date[2]).getTime()/1000));
		    			 obj = {
		    				count: arr[i].count,
		    				goods_special_id: arr[i].goods_special_id,
		    				price: arr[i].price,
		    				use_date: use_date
		    			}
		    			chooseArr.push(obj);
		    		}
	    		}else{
	    			if(arr[i].count){
		    			 obj = {
		    				count: arr[i].count,
		    				goods_special_id: arr[i].goods_special_id,
		    				price: arr[i].price,
		    				use_date: use_date
		    			}
		    			chooseArr.push(obj);
		    		}
	    		}
	    	}
	    	let passenger = [];
	    	sessionStorage.passenger = JSON.stringify(passenger);
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
  	beforeRouteEnter (to, from, next) {
  		next(()=>{
  			preRouter = from.path;	
  		});
  	},
  	mounted(){
  		this.$nextTick(()=>{
  			if (!this.userInfo.access_token) {
  				this.$router.replace('./login');
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
			height: 15px;
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
	.descript{
		width: 100%;
	    min-height: 50vh;
	    font-size: 14px;
	    padding: 15px;
	    text-align: left;
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