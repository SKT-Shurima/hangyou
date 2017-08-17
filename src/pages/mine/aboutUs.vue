<template>
  <div class="wrap">
    <x-header :left-options="{backText: ''}">关于我们</x-header>
    <div class="container">
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
.wrap,.container{
	width: 100%;
	height: 100%;
	background-color: #fff;
}
</style>