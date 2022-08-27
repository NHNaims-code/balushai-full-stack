import Cookies from 'js-cookie';
const ONE_DAY = 1;
const CookieSet = (res) => {
    Cookies.set('admin', res?.data?.token, {
        expires: ONE_DAY,
        path: '/',
        secure: true,
        sameSite: 'None'
    })
}
export { CookieSet }