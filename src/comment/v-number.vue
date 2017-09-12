<template>
	<div class="wrap">
		<button @click='changVal(-1)' :disabled='currentValue-0===0'><x-icon type="ios-minus-empty" size="20"></x-icon></button>
		<input type="number" name="" disabled  v-model.number='currentValue'>
		<button @click='changVal(1)'><x-icon type="ios-plus-empty" size="20"></x-icon></button>
	</div>
</template>
<script type='text/esmascript-6'>
	export default {
		name: 'v-number',
		data(){
			return {
				currentValue: 0
			}
		},
		props:{
			value: {
		      	validator (value) {
		        	if (typeof value === 'number') {
		          		return true
		        	} else if (typeof value === 'string') {
		          		return value === ''
		       		}
		        	return false
		      	},
		      	default: 1
		    },
		    index: {
		      	type: Number,
		      	required:false,
		    },
		    date:{

		    }
		},
		methods:{
			changVal(mask){
				let index =  this.index;
				let reg = /\d/g;
	  			let date = this.date;
	  			if (!reg.test(date)) {
	  				this.$vux.toast.show({
	                    text: '请先选择使用日期',
	                    time: 3000,
	                    type: "text",
	                    width: "12em",
	                    position: 'bottom'
	                });
	                return false;
	  			}
				if (mask<0) {
					this.currentValue =  this.currentValue-0?this.currentValue:0;
				}else{
					this.currentValue++;
				}
				let obj = {
	      			index: index,
	      			value: this.currentValue
	      		}
		      	this.$emit('onchange',obj);
			}
		},
	}
</script>
<style type="text/css" lang='scss' scoped>
	.wrap{
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
</style>