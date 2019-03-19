import Vue from 'vue'
import Router from 'vue-router'
import Read from '@/components/Read'
import Create from '@/components/Create'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import SingleUpload from '@/components/SingleUpload'
import Profile from '@/components/Profile'
import AuthCheck from '../middleware/Auth';
import Session from '../middleware/Session';
import {store} from '../store';
import axios from 'axios';

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        }, {
            path: '/read',
            name: 'Read',
            component: Read,
            meta: {
                auth: true
            }
        }, {
            path: '/create',
            name: 'Create',
            component: Create,
            meta: {
                auth: true
            }
        }, {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                protect_login: true
            }
        }, {
            path: '/register',
            name: 'Register',
            component: Register,
            meta: {
                protect_login: true
            }
        }, {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            meta: {
					auth: true
            }
        }, {
            path: '/upload',
            name: 'Upload',
            component: SingleUpload
        }
    ],
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    // mengecek ada tidak meta auth di dalam meta
    const isLogin = localStorage.getItem('isLoggedin');
    if (isLogin !== null) 
        store.dispatch('user/setStatus', 'isLogin')
    Session(to, from, next);
    if (to.matched.some(record => record.meta.auth)) {
        AuthCheck(to, from, next)
    } else if (to.matched.some(record => record.meta.protect_login)) {
        if (isLogin) 
            return router.push({name: from.name})
        next();
    } else {
        next();
    }
});

export default router;