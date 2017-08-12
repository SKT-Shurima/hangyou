
import travellerInfo from '../pages/travellerInfo'
import main from '../pages/main'
import home from '../pages/home/homeMain'
import predatemine from '../pages/predatemine/preMian'
import mine from '../pages/mine/mineMain'


export default [{
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
            path: '/predatemine',
            component: predatemine
        },
        {
            path: '/mine',
            component: mine
        }
    ]
}]
