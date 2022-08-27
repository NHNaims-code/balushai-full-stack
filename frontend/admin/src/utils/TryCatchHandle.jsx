import { ErrorToast } from "./Error";
import Cookies from 'js-cookie';
async function TryCatch(fn) {
    try {
        await fn()
    } catch (error) {
        if(error.response?.status === 401 || error.response?.status === 403){
            ErrorToast('Unauthorized.Please Sign in Again') ;
            /* Cookies?.remove('vendor', { path: '/' })
            window.location.href = ('/#/sign-in'); */
        }
        if (error.response) { 
            ErrorToast(error.response?.data?.err) ;
        }else{
            console.log(error)
            ErrorToast('Something went wrong') ;
        }
    }
};

export { TryCatch }