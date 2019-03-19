import router from '../router';
import {store} from '../store';
import axios from 'axios'
// eslint-disable-next-line
export default (to, from, next) => {
    var isLogin = localStorage.getItem('isLoggedin');
    var userID = localStorage.getItem('user')
    var userToken = localStorage.getItem('userToken')
    if(isLogin) {
        axios.get('http://localhost:3000/api/users/'+userID, {
            headers: {
                'authorization': 'Bearer ' + userToken
            }
        }).then(response => {
            if(response.data.success) {
                store.dispatch('user/setUser', response.data.attributes)
            } else {
                store.dispatch('user/logout')
                router.push({name:'Login'})
            }
        }).catch(error => {
            alert(error)
            store.dispatch('user/logout')
        })
        return next();
    }
    
    return next()
}