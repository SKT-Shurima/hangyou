<template>
  	<div class="wrap">
    	<x-header :left-options="{backText: ''}">优惠券</x-header>
    	<div class="container">
    		<ul>
    			<li class="list" v-for='(item,index) in 3'>
    				<dl>
    					<dt class="border-right-1px">
    						{{50|currency}}
    						<i class="top_left"></i>
    						<i class="bottom_left"></i>
    					</dt>
    					<dd>
    						<div class="name">优惠抵扣</div>
    						<div class="date">{{1315181612*1000|dateStyle}}至{{1315181612*1000|dateStyle}}有效</div>
    						<i class="del" @click='confirmBol=true;delIndex=index;'>
    							<x-icon type="ios-close-empty" size="40"></x-icon>	
    						</i>
    					</dd>
    				</dl>
    			</li>
    		</ul>
    	</div>
    	 <div v-transfer-dom class="confirm">
	    <confirm v-model="confirmBol"
	    	@on-cancel="onCancel"
	   		@on-confirm="onConfirm">
	        <p>确定删除该购物券?</p>
	    </confirm>
    </div>
  	</div>
</template>

<script type='text/esmascript-6'>
import XHeader from 'vux/src/components/x-header'
import TransferDom from 'vux/src/directives/transfer-dom' 
import confirm from 'vux/src/components/confirm'
export default {
	directives: {
	    TransferDom
	},
  	data () {
	    return {
	    	confirmBol: false,
	    	delIndex: "",
	    }
  	},
	components: {
    	XHeader,confirm
  	},
  	methods: {
  		onCancel(){

  		},
  		onConfirm(){

  		}
	},
  	mounted(){
  		this.$nextTick(()=>{
  			
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
		padding: 0px 15px;
	}
	.list{
		margin-top: 10px;
		padding: 4px;
		overflow: hidden;
		dl{
			border-radius: 5px;
			box-shadow: 0px 0px 2px 1px #e6e6e6;
			background-color: #fff;
			height: 100px;
		}
		.border-right-1px{
			border-right: 1px dashed #ccc;
		}
		dt{
			width: 28%;
			text-align: center;
			@include sc(24px,$price_color);
			line-height: 100px;
			i{
				display: inline-block;
				width: 14px;
				height: 14px;
				border-radius: 50%;
				background-color: #f7f7f7;
				box-shadow: 0px 0px 2px 1px #e6e6e6;
				z-index: 100;
			}
			.top_left{
				position: absolute;
				top: -7px;
				right: -7px;
			}
			.bottom_left{
				position: absolute;
				bottom: -7px;
				right: -7px;
			}
		}
		dd{
			width: 72%;
			padding-top: 5%;
			padding-left: 8%;
			.name{
				line-height: 36px;
				@include sc(18px,#000);
			}
			.date{
				line-height: 28px;
				@include sc(13px,$hint_color);
			}
			.del{
				position: absolute;
				top: 6px;
				right: 6px;
				fill: $hint_color;
			}
		}
		dt,dd{
			float: left;
			position: relative;
		}
	}
</style>