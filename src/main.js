import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import routes from './router/router';
import mixins from  './config/mixins'
import vueg from 'vueg';
import 'vueg/css/transition-min.css';
import store from './store/store';
import { routerMode } from './config/env';
import './config/rem';
import FastClick from 'fastclick';
import ConfirmPlugin from 'vux/src/plugins/confirm'
import LoadingPlugin from 'vux/src/plugins/loading'
import Toast from 'vux/src/plugins/toast'
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)
Vue.use(Toast)


if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}


Vue.use(VueRouter)
const router = new VueRouter({
    routes,
    mode: routerMode,
    strict: process.env.NODE_ENV !== 'production'
});
Vue.use(vueg,router);


// 过滤器
Vue.filter('currency',val=> {
    if (val !== "") {
      val = (val-0).toFixed(2); 
        return `￥${val}`;
    } 
});
Vue.filter('dateStyle',time=> {
	time-=0;
    var newDate = new Date(time);
    let {y,m,d}={y:newDate.getFullYear(),m:newDate.getMonth()+1,d:newDate.getDate()};
    m = trans(m);
    d = trans(d);
    return y +'-' + m + "-" + d ;
});
Vue.filter('timeStyle',time =>{
    time -= 0;
    var newDate = new Date(time);
    let {h,m,s}={h:newDate.getHours(),m:newDate.getMinutes(),s:newDate.getSeconds()};
    h = trans(h);
    m = trans(m);
    s = trans(s);
    return `${h}:${m}:${s}`;
});
function trans (val){
    if (val < 10) {
      val = "0" + val ;
    }
    return val ;
};

// mixins
Vue.mixin(mixins);
router.afterEach((to, from, next) => {
    if (document.URL.indexOf('index.html?t=') < 0) {
      let timestamp = (new Date()).valueOf()
      window.location.href = '/index.html?t=' + timestamp + '#' + to.fullPath
    }
    let openid = mixins.methods.getCookie("openid");
    if (!openid) {
        const redirectUrl = encodeURIComponent("http://hengyou.zertone1.com/app/userAction/loginByWeixin" );
        let href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9a65a78e25129b57&redirect_uri="+redirectUrl+"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
            window.location.href = href;
    }
});

Vue.prototype.successLoadImg = function(event) {
  if (event.target.complete == true) {
    event.target.classList.remove("default-image");;
    var imgParentNode = event.target.parentNode;
    if(imgParentNode.classList.contains('show-img')==true){
      imgParentNode.style.background = "#000";
    }
  }
};
Vue.prototype.errorLoadImg = function(event) {
    event.target.src = '';
    event.target.classList.add("default-image");;
};
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
