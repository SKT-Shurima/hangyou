import main from '../pages/main'
import home from '../pages/home/homeMain'
import preMain from '../pages/predatemine/preMain'
import mine from '../pages/mine/mineMain'
import search from '../pages/home/search'
import getDes from '../pages/home/getDes'
import other from '../pages/home/other'
import goodDetail from '../pages/predatemine/goodDetail'
import predatemine from '../pages/predatemine/predatemine'
import hotelFlightDetail from '../pages/predatemine/hotelFlightDetail'
import chooseSpecial from '../pages/predatemine/chooseSpecial'
import completeInfo from '../pages/predatemine/completeInfo'
import msg from '../pages/mine/msg'
import setting from '../pages/mine/setting'
import aboutUs from '../pages//mine/aboutUs'
import protocol from '../pages/mine/protocol'
import orderList from '../pages/mine/orderList'
import orderDetail from '../pages/mine/orderDetail'
import travelers from '../pages/mine/travelers'
import addTraveler from '../pages/mine/addTraveler'
import checkTraveler from '../pages/mine/checkTraveler'
import coupons from '../pages/mine/coupons'
import editContact from '../pages/mine/editContact'
import contact from '../pages/mine/contact'
import login from '../pages/login/login'
import reg from '../pages/login/reg'
import forgetPw from '../pages/login/forgetPw'
const path = [
    {
        path: '/',
        component: main, 
        children: [
            {
                path: '/',
                component: home
            },
            {
                path: '/home',
                component: home
            },
            {
                path: '/preMain',
                component: preMain,
            },
            {
                path: '/mine',
                component: mine
            }
        ]
    },
    {
        path: '/search',
        component: search
    },{
        path: '/getDes',
        component: getDes
    },{
        path: '/other',
        component: other
    },{
        path: '/goodDetail',
        component: goodDetail
    },{
        path: '/predatemine',
        component: predatemine
    },{
        path: '/hotelFlightDetail',
        component: hotelFlightDetail
    },{
        path: '/chooseSpecial',
        component: chooseSpecial
    },{
        path:  '/completeInfo',
        component: completeInfo
    },{
        path: '/addTraveler',
        component: addTraveler
    },{
        path: '/checkTraveler',
        component: checkTraveler
    },{
        path: '/msg',
        component: msg
    },{
        path: '/setting',
        component: setting
    },{
        path: '/aboutUs',
        component: aboutUs
    },{
        path: '/protocol',
        component: protocol
    },{
        path: '/orderList',
        component: orderList
    },{
        path: '/orderDetail',
        component: orderDetail
    },{
        path:'/travelers',
        component: travelers
    },{
        path: '/coupons',
        component: coupons
    },{
        path: '/editContact',
        component: editContact
    },{
        path: '/contact',
        component: contact
    },{
        path: '/login',
        component: login
    },{
        path: '/reg',
        component: reg
    },{
        path: '/forgetPw',
        component: forgetPw
    }
]

export default path ;
