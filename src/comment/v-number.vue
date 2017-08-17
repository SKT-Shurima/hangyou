<template>
	<div class="wrap">
		<button @click='currentValue--;' :disabled='currentValue-0===1'><x-icon type="ios-minus-empty" size="20"></x-icon></button>
		<input type="number" name="" disabled  v-model.number='currentValue'>
		<button @click='currentValue++;'><x-icon type="ios-plus-empty" size="20"></x-icon></button>
	</div>
</template>
<script type='text/esmascript-6'>
	export default {
		name: 'v-number',
		data(){
			return {
				currentValue: 1
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
		},
		 watch: {
		    currentValue (newValue, old) {
		      	if (newValue !== '') {
		        	newValue = newValue-0<=1?1:newValue ;
		      	}
		      	this.$emit('on-change', this.currentValue)
		    },
		    value (newValue) {
		      this.currentValue = newValue
		    }
		  },
		methods:{

		}
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