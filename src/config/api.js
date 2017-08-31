import axios from 'axios'

// 开发
// let base = '/hengyou' ;
// 测试
let base = 'http://hengyou.zertone1.com/app'
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
// 获取同目的地
export const  getDes = params =>{
	params =  trans(params);
	return axios.get(`${base}/categoryAction/getDes?${params}`).then(res=>res.data);
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



// 我的
// 基本信息
export const getUserInfo = params =>{
	params= trans(params);
	return axios.get(`${base}/userAction/getUserInfo?${params}`).then(res=>res.data);
}
// 我的旅客
export const passenger = params =>{
	params= trans(params);
	return axios.get(`${base}/userAction/passenger?${params}`).then(res=>res.data);
}
// 获取旅客信息
export const passengerInfo = params =>{
	params= trans(params);
	return axios.get(`${base}/userAction/passengerInfo?${params}`).then(res=>res.data);
}
// 添加旅客信息
export const addPassenger = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/addPassenger`,params).then(res=>res.data);
}
// 编辑旅客信息
export const editPassenger = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/editPassenger`,params).then(res=>res.data);
}
// 删除旅客
export const delPassenger = params =>{
	params = trans(params);
	return axios.post(`${base}/userAction/delPassenger`,params).then(res=>res.data);
}
// 我的优惠券
export const myCoupon = params =>{
	params= trans(params);
	return axios.get(`${base}/userAction/myCoupon?${params}`).then(res=>res.data);
}
// 获取所有消息
export const GetAllMessage = params =>{
	params= trans(params);
	return axios.get(`${base}/messageAction/GetAllMessage?${params}`).then(res=>res.data);
}
//  获取联系人
export const getContact = params =>{
	params = trans(params);
	return axios.get(`${base}/userAction/getContact?${params}`).then(res=>res.data);
}
// 编辑紧急联系人
export const editContact = params =>{
	params = trans(params);
	return axios.get(`${base}/userAction/editContact?${params}`).then(res=>res.data);
}


// 订单
// 订单列表
export  const orderList = params =>{
	params = trans(params);
	return axios.get(`${base}/orderAction/lists?${params}`).then(res=>res.data);
}
// 申请退款
export  const refund = params =>{
	params = trans(params);
	return axios.post(`${base}/orderAction/refund`,params).then(res=>res.data);
}
// 取消退款
export  const cancelRefund = params =>{
	params = trans(params);
	return axios.post(`${base}/orderAction/cancelRefund`,params).then(res=>res.data);
}
// 取消订单
export  const cancelOrder = params =>{
	params = trans(params);
	return axios.post(`${base}/orderAction/cancel`,params).then(res=>res.data);
}
// 立即支付
export const pay = params =>{
	params = trans(params);
	return axios.get(`${base}/orderAction/pay?${params}`).then(res=>res.data);
}
// 订单详情
export const detail = params =>{
	params = trans(params);
	return axios.get(`${base}/orderAction/detail?${params}`).then(res=>res.data);
}
// 生成订单
export const generate = params=>{
	params = trans(params);
	return axios.post(`${base}/orderAction/generate`,params).then(res=>res.data);
}

