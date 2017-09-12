<template>
  	<div class="wrap">
    	<x-header :left-options="{backText: ''}">常用旅客</x-header>
    	<div class="container">
    		<ul v-if='passengerList.length'>
    			<li class="list" v-for='(item,index) in passengerList' :key='index'>
    				<div class="chooseBox" v-if='showCheck'>
    					<i :class="{'checked': item.checkBol}" @click='choose(item,index)'></i>
    				</div>
    				<div class='listBox'>
	    				<dl>
	    					<dt>
	    						<span v-text='item.name'></span>
	    						<em>{{item.lname}}/{{item.surname}}</em>
	    					</dt>
	    					<dd>
	    						<span>
	    							{{item.birthday*1000|dateStyle}}	
	    						</span>
	    						<em>
	    							{{item.sex==="0"?"男":"女"}}
	    						</em>
	    					</dd>
	    				</dl>
	    				<div class="operation">
	    					<span>
	    						<em class="edit" @click='editPassenger(item.customer_passenger_id)'>
	    							<i></i>编辑
	    						</em>
	    						<em class="del" @click='del(item.customer_passenger_id)'>
	    							<i></i>删除
	    						</em>
	    					</span>
	    				</div>
    				</div>
    			</li>
    		</ul>
    		<div v-else class="noPassager">
    			暂无旅客
    		</div>
    	</div>
	 	<div class="submit">
	 		<dl v-if='showCheck'>
	 			<dt @click='completeInfoAddTraveler'>添加旅客</dt>
	 			<dd @click='ensure'>确定</dd>
	 		</dl>
	 		<div v-else @click='addTraveler'>
	 			添加旅客
	 		</div>
    	</div>
  	</div>
</template>

<script type='text/esmascript-6'>
import XHeader from 'vux/src/components/x-header'
import {passenger,delPassenger} from '../../config/api'
export default {
  	data () {
	    return {
	    	userInfo: {
	    		access_token: ''
	    	},
	    	passengerList: [],
	    	reqParams:{},
	    	showCheck: false,
	    	chooseIndex: '',
	    	index: ''
	    }
  	},
	components: {
    	XHeader
  	},
  	methods: {
  		choose(item,index){
  			this.index =  index;
  			let len = this.passengerList.length;
  			for (var i = 0; i < len; i++) {
  				this.passengerList[i].checkBol= false;
  			}
  			item.checkBol =  true;
  		},	
  		getList(){
  			this.$vux.loading.show({
				text: 'Loading'
			});
  			let params = {
  				access_token: this.userInfo.access_token
  			}
  			passenger(params).then(res=>{
  				let {errcode,message,content} = res;
      			if (errcode!==0) {
      				this.errcode(errcode,message);
      			}else{
      				if (this.reqParams.choose) {
      					for (let i = 0; i < content.length; i++) {
      						content[i].checkBol = false;
      					}
      					this.passengerList = content;
      					this.showCheck = true;
      				}else{
      					this.passengerList = content;
      				}
      				this.$vux.loading.hide();
      			}
  			})
  		},
  		completeInfoAddTraveler(){
  			this.$router.push(`/addTraveler?addTraveler=true&chooseIndex=${this.reqParams.chooseIndex}`);
  		},
  		addTraveler(){
  			this.$router.push('/addTraveler');
  		},
  		editPassenger(id){
  			this.$router.push(`/addTraveler?customer_passenger_id=${id}`);
  		},
  		del(id){
  			let _this =  this ;
  			this.$vux.confirm.show({
  				title:"",
				content: '是否确认删除',
				onCancel () {
				    
				},
				onConfirm () {
					let params = {
		  				access_token: _this.userInfo.access_token,
		  				customer_passenger_id: id
		  			}
		  			delPassenger(params).then(res=>{
		  				let {errcode,message} = res;
		      			if (errcode!==0) {
		      				this.errcode(errcode,message);
		      			}else{
							_this.$vux.toast.show({
			                    text: message,
			                    time: 3000,
			                    type: "text",
			                    width: "12em",
			                    position: 'bottom'
			                })
							_this.getList();
		      			}
		  			})
				}
			})
  		},
  		ensure(){
  			if (this.index==='') {
  				this.$router.back(-1);
  			}else{
  				let passenger = JSON.parse(sessionStorage.passenger);
  				let choosePassenger = this.passengerList[this.index];
  				for(let i = 0 ; i<passenger.length;i++){
  					if (choosePassenger.customer_passenger_id===passenger[i].customer_passenger_id) {
  						this.$vux.toast.show({
		                    text: '该旅客已被选择',
		                    time: 3000,
		                    type: "text",
		                    width: "12em",
		                    position: 'bottom'
		                });
		                return false;
  					}
  				}
  				passenger[this.chooseIndex] = this.passengerList[this.index];
  				sessionStorage.passenger = JSON.stringify(passenger);
  				this.$router.back(-1);
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
		}
		if (sessionStorage.preBaseInfo) {
			let preBaseInfo = JSON.parse(sessionStorage.preBaseInfo);
			if (preBaseInfo&&this.reqParams.choose) {
				this.chooseIndex =  this.reqParams.chooseIndex;
			}else{
				if (this.reqParams.choose) {
					this.$router.back(-1);
				}
			}	
		}
	},
  	mounted(){
  		this.$nextTick(()=>{
  			if (!this.userInfo.access_token) {
  				this.$router.replace('./login');
  			}else{
  				this.getList();
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
		background-color: #f7f7f7;
		padding: 0px 15px;
		ul{
			margin-bottom: 120px;
		}
	}
	.list{
		display: -webkit-box;
		margin-top: 16px;
		.chooseBox{
			display: inline-block;
			margin-top: 50px;
			i{
				display: inline-block;
				width: 16px;
				height: 16px;
				vertical-align: -4px;
				@include border-1px(#ddd);
				margin-right: 6px;
				background-color: #fff;
			}
			.checked{
				@include bg_image('../../images/common/checked');
			}
		}
		.listBox{
			-webkit-box-flex: 1;
			border-radius: 5px;
			background-color: #fff;
			box-shadow: 0px 0px 2px 1px #e6e6e6;
		}
		dl{
			padding: 10px 14px;
			@include border-bottom-1px($border_color);
			@include sc(15px,#1a1a1a);
		}
		dt,dd{
			overflow: hidden;
			line-height: 30px;
			span{
				float: left;
			}
			em{
				float: right;
			}
		}
		.operation{
			height: 40px;
			line-height: 40px;
			padding: 0px 14px;
			@include sc(15px,$hint_color);
			span{
				float: right;
			}
			em{
				margin-left: 4px;
			}
			i{
				display: inline-block;
				width: 20px;
				height: 20px;
				margin: 0px 4px;
				vertical-align: sub;
			}
			.edit{
				color: $primary_color;
				i{
					@include bg-image('../../images/mine/edit');	
				}
			}
			.del{
				color: $hint_color;
				i{
					@include bg-image('../../images/mine/del');	
				}
			}
		}
	}
	.noPassager{
		margin: 20px auto;
		text-align: center;
		@include sc(16px,$hint_color);
	}
	.submit{
		position: fixed;
		bottom: 0px;
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		background-color: $primary_color;
		@include sc(16px,#fff);
		dl{
			overflow: hidden;
			dt,dd{
				float: left;
				width: 50%;
			}
			dt{
				background-color: #fff;
				color: $primary_color;
			}
		}
	}
</style>