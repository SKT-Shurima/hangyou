import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router/router';
import store from './store/';
import { routerMode } from './config/env';
import './config/rem';
import FastClick from 'fastclick';
import { LoadingPlugin, ToastPlugin, DatetimePlugin, AlertPlugin } from 'vux';


Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(DatetimePlugin)
Vue.use(AlertPlugin)
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
new Vue({
    router,
    store,
}).$mount('#app')