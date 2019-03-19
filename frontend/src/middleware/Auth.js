import router from '../router';
import {store} from '../store';

// eslint-disable-next-line
export default (to, from, next) => {
    var isLogin = localStorage.getItem('isLoggedin');
    if(!isLogin) {
        // alert("Anda belum login");        
        // console.log(store.getters['user/status']);
        return router.push({name:'Login'})
    }
    return next()
}