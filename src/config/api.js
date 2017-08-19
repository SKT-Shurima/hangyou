import axios from 'axios'

// 开发
let base = '/hengyou' ;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';



const trans = params => {
    // Do whatever you want to transform the data
    let ret = ''
    for (let it in params) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
    }
    return ret ;
}

// 发送验证码
export const  sendCode = params=>{
	params =  trans(params);
	return axios.post(`${base}/userAction/sendCode`,params).then( res => res.data);
}

// 注册
export const oauthRegister  = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/oauthRegister`,params).then( res => res.data);
}
// 登录
export const OauthLogin = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/OauthLogin`,params).then(res=>res.data);
}
// 忘记密码
export const  resetPasswd = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/resetPasswd`,params).then(res=>res.data);
}
//  首页
// 轮播图
export const banner = params=>{
	params = trans(params);
	return axios.post(`${base}/initAction/banner`,params).then(res=>res.data);
}
// 首页热卖产品
export const hot = () =>{
	return axios.post(`${base}/initAction/hot`).then(res=>res.data);
}
// 首页搜索
export const search = params =>{
	return axios.get(`${base}/initAction/search?keyword=${params.keyword}`).then(res=>res.data);
}
// 优惠券推送
export const pushCoupon = params =>{
	params =  trans(params);
	return axios.get(`${base}/initAction/pushCoupon?${params}`).then(res=>res.data);
}


// 预定
// 预定首页
export const getCategory = params =>{
	params = trans(params);
	return axios.get(`${base}/categoryAction/getCategory?${params}`).then(res=>res.data);
}
// 产品详情
export const info = params =>{
	params = trans(params);
	return axios.get(`${base}/startAction/info?${params}`).then(res=>res.data);
}
// 预定
export const reserve = params =>{
	params = trans(params);
	return axios.get(`${base}/orderAction/reserve?${params}`).then(res=>res.data);
}
// 酒店航班详情
export const hotelFlightDetail = params =>{
	params = trans(params);
	return axios.get(`${base}/orderAction/hotelFlightDetail?${params}`).then(res=>res.data);
}
// 特定项目
export const  selectSpecial = params =>{
	params = trans(params);
	return axios.get(`${base}/orderAction/selectSpecial?${params}`).then(res=>res.data);
}
// 特定项目详情
export const  specialDetail = params =>{
	params = trans(params);
	return axios.get(`${base}/orderAction/specialDetail?${params}`).then(res=>res.data);
}