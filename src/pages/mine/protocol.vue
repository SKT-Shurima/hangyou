<template>
  <div class="wrap">
    <x-header :left-options="{backText: ''}">用户条款及协议</x-header>
    <div class="container" v-html='protocol'>
     
    </div>
  </div>
</template>

<script type='text/esmascript-6'>
import XHeader from 'vux/src/components/x-header'
import {agreement} from '../../config/api'
export default {
  	data () {
	    return {
          protocol: ''
	    }
  	},
    components: {
      XHeader
    },
    mounted(){
      this.$nextTick(()=>{
        agreement().then(res=>{
          let {errcode,message,content} = res;
            if (errcode!==0) {
              this.errcode(errcode,message);
            }else{
              this.protocol =  this.escape2Html(content);
            }
        })
      })
    }
}
</script>
<style type="text/css" lang='scss' scoped>
@import '../../style/mixin.scss';
.wrap{
	width: 100%;
	height: 100%;
	background-color: #fff;
}
.container{
  position: fixed;
  top: 46px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 120px;
  background-color: #f7f7f7;
}
.container{
  padding: 15px;
   @include sc(15px,$title_color);
  h1{
      text-align: center;
      font-weight: bolder;
      font-size: 18px;
  }
  h2{
    font-weight: bold;
    margin: 10px 0px;
  }
  p{
    text-indent: 2em;
    margin-bottom: 10px;
    line-height: 22px;
  }
}
</style>