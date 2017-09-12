<template>
  <div class="wrap">
    <x-header :left-options="{backText: ''}">关于我们</x-header>
      <div class="container"v-html='content'>
    </div>
  </div>
</template>

<script type='text/esmascript-6'>
import XHeader from 'vux/src/components/x-header'
import {about_us} from '../../config/api'
export default {
    data(){
      return{
        content: ''
      }
    },
    components: {
      XHeader
    },
    mounted(){
      this.$nextTick(()=>{
        about_us().then(res=>{
          let {errcode,message,content} = res;
            if (errcode!==0) {
              this.errcode(errcode,message);
            }else{
              this.content = this.escape2Html(content);
            }
        })
      })
    }
  
}
</script>
<style type="text/css" lang='scss' scoped>
@import '../../style/mixin.scss';
.wrap,.container{
	width: 100%;
	height: 100%;
	background-color: #fff;
}
.container{
  padding: 15px;
   h1{
    @include sc(18px,#000);
    font-weight: bolder;
    margin: 10px 0px;
  }
  p{
    text-indent: 2em;
    @include sc(15px,$title_color);
    line-height: 26px;
  }
}
</style>