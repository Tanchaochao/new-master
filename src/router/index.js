
import dashboard from '../pages/dashboard/dashboard.vue';
import dashboard2 from '../pages/dashboard/dashboard2.vue';
import dashboard3 from '../pages/dashboard/dashboard3.vue';
import user from '../pages/user/user.vue';
import user2 from '../pages/user/user2.vue';
import user3 from '../pages/user/user3.vue';
import device from '../pages/device/device.vue';
import device1 from '../pages/device/device1.vue';
import device2 from '../pages/device/device2.vue';
import login from '../pages/login/login.vue'
let routes = [
    {
        path:'/map',
        component:dashboard
    },
    {
        path:'/dashboard2',
        component:dashboard2
    },
    {
        path:'/dashboard3',
        component:dashboard3
    },
    {
        path:'/user',
        component:user
    },
    {
        path:'/user2',
        component:user2
    },
    {
        path:'/user3',
        component:user3
    },
    {
        path:'/device',
        component:device
    },
    {
        path:'/device1',
        component:device1
    },
    {
        path:'/device2',
        component:device2
    },
    {
        path:'/login',
        component:login
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/map' }
    }
];

export  default routes;