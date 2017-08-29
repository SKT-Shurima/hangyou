<template>
  <div class="wrap">
    <x-header :left-options="{backText: ''}">酒店航班详情</x-header>
  	<div class="container">
		<div class="hotelInfo">
			<h1>酒店信息</h1>
			<dl v-for='(item,index) in hotel' :key='index'>
				<dt class="date">
					{{item.start_date*1000|dateStyle}}至{{item.end_date*1000|dateStyle}}
				</dt>
				<dd class="name" v-text='item.name'></dd>
				<dd class="image">
	  				<img :src="item.images">
	  			</dd>
			</dl>
		</div>
		<div class="flightInfo">
			<h1>航班信息</h1>
			<div class="go" v-for='(item,index) in flight' :key='index'>
				<dl>
					<dt class="title">{{item.start_station}}-{{item.end_station}}{{item.is_return==="0"?"（往）":"（返）"}}</dt>
					<dd class="site">
						<flexbox>
							<flexbox-item>
								<div class="airport" v-text='item.start_airport'></div>
								<div class="time" v-text='item.start_time'></div>
							</flexbox-item>
							<flexbox-item class='icon'>
								<span></span>
								<i class="airIcon"></i>
								<span></span>
							</flexbox-item>
							<flexbox-item>
								<div class="airport" v-text='item.end_airport'></div>
								<div class="time" v-text='item.end_time'><em v-if='item.end_extra-0'>+1</em></div>
							</flexbox-item>
						</flexbox>
					</dd>
				</dl>
				<table cellspacing="0" class="flightTable">
					<tr class="tableHead">
						<th>出发日期</th>
						<th>航班编号</th>
						<th>航空公司</th>
						<th>所乘机型</th>
					</tr>
					<tr>
						<td>{{item.start_date*1000|dateStyle}}</td>
						<td v-text='item.flight_number'></td>
						<td v-text='item.airline_company'></td>
						<td v-text='item.model'></td>
					</tr>
				</table>
			</div>
		</div>
  	</div>
  </div>
</template>

<script type='text/esmascript-6'>
import XHeader from 'vux/src/components/x-header'
import {Flexbox,FlexboxItem} from 'vux/src/components/flexbox'
import {hotelFlightDetail} from '../../config/api'
export default {
  	data () {
	    return {
	    	userInfo: '',
	   		hotel: [],
	   		flight: [],
	   		date: ''
	    }
  	},
	components: {
    	XHeader,Flexbox,FlexboxItem
  	},
  	methods: {
  		initHotelFlight(hotel,flight){
  			var init_date =  this.reqParams.date-0;
  			hotel.sort(compare('sort'));
			flight.sort(compare('sort'));
			var extra = new Array();
			hotel.forEach(function(value,index,array){
				extra[index] = value['stay_day'];
			});
			//获取飞机到达时间
			var arrival_day = 0;
			flight.forEach(function(value,index,array){
				if(value['is_return'] == 0){
					arrival_day = value['end_extra'];
				}
				flight[index]['start_date'] = init_date+value['start_extra']*86400;
			});
			//酒店开始入住时间
			var hotel_init_date = init_date+86400*arrival_day;
			for(var i = 0;i<hotel.length;i++){
				var k = i;
				var date_start = hotel_init_date;
				var date_end = hotel_init_date;
		
				while(k >= 0){
					if(k-1 >= 0){
						date_start += 86400*hotel[k-1]['stay_day'];
					}
					date_end += 86400*hotel[k]['stay_day'];
					k--;
				}
				hotel[i]['start_date'] = date_start;
				hotel[i]['end_date'] = date_end;
			}
			function compare(property){
			    return function(a,b){
			        var value1 = a[property];
			        var value2 = b[property];
			        return value1 - value2;
			    }
			};
			this.hotel = hotel;
			this.flight = flight;
			this.$vux.loading.hide();
		},
	    getDetail(){
	    	let params = {
	    		access_token: this.userInfo.access_token,
	    		start_id: this.reqParams.start_id,
	    		order_id:""
	    	}
	    	hotelFlightDetail(params).then(res=>{
	    		let {errcode,message,content} = res;
      			if (errcode!==0) {
      				this.errcode(errcode,message);
      			}else{
      				this.initHotelFlight(content.hotel,content.flight);
      			}
	    	})
	    }
	},
	created(){
		this.reqParams = this.getHashReq();
		this.date = this.reqParams.date;
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
  				this.getDetail();
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

		.hotelInfo{
			padding: 10px 14px;
			background-color: #fff;
			dl{
				line-height: 24px;
				@include sc(14px,$title_color);
			}
			.image{
				width: 100%;
				margin-top: 10px;
				img{
					width: 100%;
				}
			}
		}
		.flightInfo{
			padding: 10px 14px;
			margin-top: 10px;
			background-color: #fff;
			.go{
				.title{
					width: 100%;
					height: 35px;
					line-height: 35px;
					text-align: center;
					@include sc(15px,#fff);
					background-color: $primary_color;
				}
				.vux-flexbox-item{
					text-align: center;
				}
				.site{
					width: 100%;
					text-align: center;
					padding: 10px 0px;
				}
				.airport{
					line-height: 16px;
					@include sc(14px,#000);
				}
				.time{
					line-height: 40px;
					@include sc(25px,$title_color);
					em{
						@include sc(14px,$price_color);
					}
				}
				.icon{
					span{
						display: inline-block;
						width: 30px;
						@include border-bottom-1px($primary_color);
					}
				}
				.airIcon{
					&::after{
						display: inline-block;
						content: "";
						width: 24px;
						height: 24px;
						vertical-align: top;
						margin: 0px 4px;
						@include bg_image('../../images/predatemine/air');
					};
				}
			}
			.flightTable{
				width: 100%;
				.tableHead{
					width: 100%;
					height: 35px;
					background-color: #e6e6e6;
					@include sc(12px,$detail_color);
				}
				tr{
					height: 49px;
					@include sc(13px,#000);
					background-color: #f7f7f7;
				}
				td,th{
					text-align: center;
				}
			}
			.back{
				margin-top: 20px;
			}
		}
	}
</style>