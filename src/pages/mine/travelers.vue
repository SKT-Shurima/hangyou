<template>
  	<div class="wrap">
    	<x-header :left-options="{backText: ''}">选择特定项目</x-header>
    	<div class="container">
    		<ul>
    			<li class="list" v-for='item in 12'>
    				<dl>
    					<dt>
    						<span>圆周率</span>
    						<em>chen/xiaoMing</em>
    					</dt>
    					<dd>
    						<span>
    							{{131313113*1000|dateStyle}}	
    						</span>
    						<em>
    							男
    						</em>
    					</dd>
    				</dl>
    				<div class="operation">
    					<span>
    						<em class="edit">
    							<i></i>编辑
    						</em>
    						<em class="del">
    							<i></i>删除
    						</em>
    					</span>
    				</div>
    			</li>
    		</ul>
    	</div>
	 	<div class="submit">
     		添加旅客
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
	components: {
    	XHeader
  	},
  	methods: {
  		Confirm(){

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
		background-color: #f7f7f7;
		padding: 0px 15px;
		ul{
			margin-bottom: 120px;
		}
	}
	.list{
		border-radius: 5px;
		margin-top: 16px;
		background-color: #fff;
		box-shadow: 0px 0px 2px 1px #e6e6e6;
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
	.submit{
		position: fixed;
		bottom: 0px;
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		background-color: $primary_color;
		@include sc(16px,#fff);
	}
</style>