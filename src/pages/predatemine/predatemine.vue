<template>
  <div class="wrap">
    <x-header :left-options="{backText: ''}">预定</x-header>
  	<div class="container">
  		<div class="travelInfo">
  			<h1>酒店信息<a href="">详情</a></h1>
  			<dl v-for='item in 2'>
  				<dt class="date">
  					{{1512121211*1000|dateStyle}}至{{1512121211*1000|dateStyle}}
  				</dt>
  				<dd class="name">
  					香港铜锣湾皇悦酒店
  				</dd>
  			</dl>
  			<h1>航班信息</h1>
  			<dl v-for='item in 3'>
  				<dt class="date">
  					{{1512121211*1000|dateStyle}}
  				</dt>
  				<dd class="site">
  					杭州（07：25）<i class="airIcon"></i>香港（10:52）<em>+1</em>
  				</dd>
  			</dl>
  		</div>
  		<div class="dateInfo">
  			<div class="title">
  				<span class="pre"><x-icon type="ios-arrow-left" size="14"></x-icon>7月</span>
  				<strong>2017年8月</strong>
  				<span class="next">9月<x-icon type="ios-arrow-right" size="14"></x-icon></span>
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
		         			<dl :class='{"active":dateIndex == item.date}' @click='dateIndex=item.date'>
		         				<dt class="date" v-text='item.date'></dt>
		         				<dd class="price">{{item.adult_price|currency}}</dd>
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
  					<span>成人</span>&nbsp;&nbsp;<em>{{2000|currency}}</em>/人
  					<v-number :value='adult_num' @onchange='changeAdultNum'></v-number>
				</li>
  				<li>
  					<span>儿童</span>&nbsp;&nbsp;<em>{{1899|currency}}</em>/人&nbsp;&nbsp;不占床位
  					<v-number ></v-number>
  				</li>
  				<li>
  					<span>房间</span>&nbsp;&nbsp;单间差<em>{{1000|currency}}</em>
  					<v-number ></v-number>
  				</li>
  			</ul>
  		</div>
  	</div>
    <dl class="submit">
    	<dt>
    		总价：<span> {{77751|currency}}</span>
    	</dt>
    	<dd>
    		下一步
    	</dd>
    </dl>
  </div>
</template>

<script type='text/esmascript-6'>
import XHeader from 'vux/src/components/x-header'
import XNumber from 'vux/src/components/x-number'
import Group from 'vux/src/components/group'
import VNumber from '../../comment/v-number'
export default {
  	data () {
	    return {
	    	month: new Date().getMonth()+1,
	    	year: new Date().getFullYear(),
	    	dateList: [],
	    	dateIndex: "0",
	    	adult_num: 0,
	    }
  	},
  		components: {
    	XHeader,XNumber,Group,VNumber
  	},
  	methods: {
  		initDate(){
  			let year = this.year,month = this.month ;
  			let firstDay = new Date(year,month-1).getDay();
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
  			for(let j = 0 ; j< date ; j++){
  				let obj = {
  					date: j+1,
					adult_price: j*200,
					ticket: j%3+""
			  	}
			  	arr.push(obj);
  			}
  			let lastDay = new Date(year,month).getDay();
  			for (let k = lastDay; k < 7; k++) {
  				let emptyObj = {
  					date: '',
					adult_price: '',
					ticket: ''
			  	}
			  	arr.push(emptyObj);
  			}
  			// 分割
  			let dateArr = [];
  			let index = 1 ;
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
  		changeAdultNum(val){
  			this.adult_num = val;
  		}
	},
  	mounted(){
  		this.$nextTick(()=>{
  			this.initDate();
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
				line-height: 24px;
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
		}	
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