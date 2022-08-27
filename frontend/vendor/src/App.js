import React, { useEffect, useState } from 'react'
import { AllRoutes } from 'routes/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter } from "react-router-dom";
import Toast from 'components/Toast/Toast';
import 'assets/css/app.css'
import 'react-toastify/dist/ReactToastify.css';
import AuthApi from 'store/AuthApi';
import { vendor } from 'constants/index';
import { TryCatch } from "utils";

import { Authenticate } from "services/auth/Authenticate";
const App = () => {
  const [user, setUser] = useState(vendor ? true : false),
    readCookie = async () => {
      if (vendor && isAuthenticate()) {
        setUser(true);
      } else {
        setUser(false);
      }
    }
  const isAuthenticate = async () => {
    TryCatch(async () => {
      const res = await Authenticate(vendor);
      return (((res?.data) === true) ? true : false)
    })
  }

  useEffect(() => {
    readCookie();
  }, [])
  return (
    <>
      <AuthApi.Provider value={{ user, setUser }}>
        <HashRouter>
          <AllRoutes />
        </HashRouter>
      </AuthApi.Provider>
      <Toast />
    </>
  )
}

export default App