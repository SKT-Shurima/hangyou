<template>
  <div class="wrap">
    <x-header :left-options="{backText: ''}">消息</x-header>
    <div class="container">
    	<ul class="msgList">
    		<li v-for='(item,index) in 6'>
    			<dl>
    				<dt class="num">
    					订单编号：10086
    				</dt>
    				<dd>
    					<div class="status">
							<p v-show='index===0'>
								您有一笔订单退款失败
							</p>
							<p v-show='index===1'>
								您有一笔订单退款成功
							</p> 
							<p v-show='index===2'>
								您有一笔订单支付成功，后台已确认
							</p>
							<p v-show='index===3'>
								您有一笔已支付订单审核失败，现已为您退款
							</p>
							<p v-show='index===4'>
								您有一笔订单退款成功，正等待后台确认
							</p>
							<p v-show='index===5'>
								您有一笔订单提交成功
							</p>

    					</div>
    					<div class="info">
    						<p v-show='index!==5'>
    							感谢您选择夯游，我们诚挚为您服务！
    						</p>
    						<p v-show='index===5'>
    							请在1小时内完成支付，超时订单将被取消	
    						</p>
    					</div>
    					<div class="time">
    						<span>
    							{{15215561165*100|dateStyle}}&nbsp;&nbsp;{{15215561165*1000|timeStyle}}
    						</span>
    					</div>
    				</dd>
    			</dl>
    		</li>
    	</ul>
    	<div class="noMore">
			没有更多了
		</div>
    </div>
  </div>
</template>

<script type='text/esmascript-6'>
import XHeader from 'vux/src/components/x-header'    
export default {
  	data () {
	    return {
	    }
  	},
  	methods: {
  	},
   components: {
    XHeader
  },
}
</script>
<style type="text/css" lang='scss' scoped>
@import '../../style/mixin.scss';
.container{
	position: fixed;
	top: 46px;
	left: 0px;
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	background-color: #f7f7f7;
	padding: 0px 15px;
}
.msgList{
	width: 100%;
	padding-bottom: 100px;
	li{
		border-radius: 5px;
		margin-top: 16px;
		background-color: #fff;
		box-shadow: 0px 0px 2px 1px #e6e6e6;
	}
	dt,dd{
		padding: 0px 10px;
	}
	.num{
		height: 36px;
		@include border-bottom-1px(#e6e6e6);
	}
	.num,.status,.time{
		line-height: 36px;
		@include sc(14px,#000);
	}
	.info{
		line-height: 20px;
		@include sc(14px,$hint_color);
	}
	.time{
		overflow: hidden;
		span{
			float: right;
			@include sc(12px,$hint_color);
		}
	}
}
.noMore{
	margin-top: 16px;
	text-align: center;
	@include sc(15px,$hint_color);
}
</style>