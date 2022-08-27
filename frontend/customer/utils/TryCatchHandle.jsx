import { ErrorToast } from "./Error";
export async function TryCatch(fn) {
    try {
        await fn()
    } catch (error) {
        /* if(error.response?.status === 401 || error.response?.status === 403){
            ErrorToast('Authorized') ;
            //Cookies?.remove('vendor', { path: '/' })
            //window.location.href = ('/#/sign-in');
        } */
        console.log(error.response)
        if (error?.response) { 
            return(error.response?.data?.err)
            // ErrorToast(error.response?.data?.err) ;
            // console.log("R error: ", error.response?.data?.err)
        }else{
            console.log(error)
            ErrorToast('Something went wrong') ;
            return 0
        }
    }
};
