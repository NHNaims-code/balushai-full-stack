import { Route, Navigate } from "react-router-dom";
import { Authenticate } from "services/auth/Authenticate";
import { vendor } from "constants/index";
import Cookies from 'js-cookie';
import { TryCatch } from "utils";

const isAuthenticate = async () => {
    TryCatch(async () => {
        const res = await Authenticate(vendor);
        console.log(res)
        return (((res?.data) === true) ? true : false)
    })
}

export const PrivateRoute = ({ children }) => {
    if (!isAuthenticate()) {
      console.log(isAuthenticate());
      Cookies?.remove('vendor', { path: '/' })
      return <Navigate to="/sign-in" replace />;
    }
    return children;
  };