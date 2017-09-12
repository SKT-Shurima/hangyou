<template>
  <div class="wrap">
    <x-header :left-options="{backText: ''}">消息</x-header>
    <div class="container" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="0">
    	<ul class="msgList">
    		<li v-for='(item,index) in msgList' :key='index'>
    			<dl>
    				<dt class="num">
    					订单编号：{{item.order_sn}}
    				</dt>
    				<dd>
    					<div class="status" v-text='item.title'></div>
    					<div class="info" v-text='item.content'>
    					</div>
    					<div class="time">
    						<span>
    							{{item.date_add*1000|dateStyle}}&nbsp;&nbsp;{{item.date_add*1000|timeStyle}}
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
import {GetAllMessage} from  '../../config/api'  
export default {
  	data () {
	    return {
	    	userInfo: '',
	    	msgList: [],
        page: 1,
        busy: false,
        noMore: false
	    }
  	},
  	components: {
    	XHeader
  	},
  	methods: {
      loadMore: function() {
        this.busy = true;
        let _this = this;
        if (this.noMore) {
          return;
        }
        setTimeout(() => {
            _this.page++;
            _this.getMsg();
          }, 1000);
      },
  		getMsg(){
  			let params = {
  				access_token: this.userInfo.access_token,
          page: this.page
  			}
  			GetAllMessage(params).then(res=>{
  				let {errcode,message,content} = res;
      			if (errcode!==0) {
      				this.errcode(errcode,message);
      			}else{
              this.busy = false;
              if (content.length) {
                this.msgList = this.msgList.concat(content);
              }else{
                this.noMore= true;
              }
              this.$vux.loading.hide();
      			}
  			})
  		}
  	},
  	created(){
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
  				this.getMsg();
          this.$vux.loading.show({
            text: 'Loading'
          });
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
	left: 0px;
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	background-color: #f7f7f7;
	padding: 0px 15px 120px;
}
.msgList{
	width: 100%;
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