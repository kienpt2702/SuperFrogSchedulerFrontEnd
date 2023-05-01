import cache from '@/utils/cacheUtils';
import {loginUser} from '@/apis/userApis';
import router from '@/router';

export async function login(loginInfo) {
    const { data: {token} } = await loginUser(loginInfo);
    // We obviously can do this directly:
    // localStorage.setItem('token', token);
    // However, we choose to create an utility object to handle expire time
    cache.set('login_token', {token}, 7200); // token is valid for 2h
    //after successful login, redirect to home page
    const routeName = 'home';
    router.push({name: routeName});
}

export function logout() {
    cache.remove('login_token');
// redirect to root page
    router.push('/home');
}