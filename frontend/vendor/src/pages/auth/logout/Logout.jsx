import React, { useEffect } from 'react'
import Cookies from 'js-cookie';

const Logout = () => {
    useEffect(() => {
        Cookies?.remove('vendor', { path: '/' })
        window.location.href = ('#/sign-in');
    }, [])

    return (
        <></>
    )
}

export default Logout