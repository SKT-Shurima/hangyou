import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import routes from './router/router';
import store from './store/';
import { routerMode } from './config/env';
import './config/rem';
import FastClick from 'fastclick';
import AlertPlugin from 'vux/src/plugins/alert'
import LoadingPlugin from 'vux/src/plugins/loading'
import Toast from 'vux/src/plugins/toast'
import {hex_md5} from './config/md5'

Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
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
})

// 过滤器
Vue.filter('currency',val=> {
    if (val !== "") {
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
Vue.mixin({
    methods:{
        hex_md5(val){
            return hex_md5(val);
        },
        checkPhone(phone){
            if (phone === '') {
                this.$vux.alert.show({
                    title: '',
                    content: '请输入手机号'
                })
                return false ;
            } else {
                let reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/g ;
                if (!reg.test(phone)) {
                    this.$vux.alert.show({
                        title: '',
                        content: '请输入正确手机号'
                    });
                    return false ;
                }
            }
            return true;
        },
        checkVal(val,msg){
            if (val==="") {
                this.$vux.alert.show({
                    title: '',
                    content: `请输入${msg}`
                });
                return false;
            }
            return true;
        }
    }
})
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})