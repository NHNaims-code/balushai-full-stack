import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthInput, Image } from "components";
import { TryCatch, SuccessToast, CookieSet } from "utils";
import { signIn } from "adapters/auth/signin";
import AuthApi from "store/AuthApi";

const SignIn = () => {
    const [user, setUser] = useState({ phone: "", email: "", password: "" }),
        context = useContext(AuthApi),
        [auth, setAuth] = useState("email"),
        history = useNavigate(),
        inputHandler = (event) => {
            const { name, value } = event.target;
            setUser((oldUser) => {
                return { ...oldUser, [name]: value };
            });
        },
        signInSubmit = async (e) => {
            e.preventDefault();
            if (auth === 'email') {
                TryCatch(async () => {
                    const res = await signIn('email-sign-in', user);
                    context?.setUser(true);
                    CookieSet(res);
                    SuccessToast(`Welcome Back`);
                    window.location.href = ('/')
                });
            } else {
                TryCatch(async () => {
                    const res = await signIn("phone-sign-in", user);
                    context?.setUser(true);
                    CookieSet(res);
                    SuccessToast(`Welcome Back`)
                    history('/');
                });
            }
        }
    return (
        <div style={{marginTop: '50px'}}>
            <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 mx-auto">
                <div className="card card0 border-0">
                    <div className="row d-flex">
                        <div className="col-lg-6">
                            <div className="card1 pb-5">
                                <div className="row px-3 pt-5 justify-content-center mt-4 mb-5 border-line-sign-in">
                                    <Image
                                        src="images/auth.svg"
                                        className="image"
                                        alt="Auth Image"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="border-0 px-4 py-5 mt-lg-2">
                                <div className="px-1">
                                    <ul className="nav nav-pills mb-3">
                                        <li
                                            className="nav-item text-center"
                                            title="EMAIL"
                                            onClick={() => setAuth("email")}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {" "}
                                            <div className="nav-link active" data-toggle="pill">
                                                <span className="text-black font-weight-bold">
                                                    EMAIL
                                                </span>
                                            </div>{" "}
                                        </li>
                                        <li
                                            className="nav-item text-center"
                                            title="PHONE"
                                            onClick={() => setAuth("phone")}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {" "}
                                            <div className="nav-link" data-toggle="pill">
                                                <span className="text-black font-weight-bold">
                                                    PHONE
                                                </span>
                                            </div>{" "}
                                        </li>
                                    </ul>
                                </div>
                                <form onSubmit={signInSubmit}>
                                    {auth === "email" ? (
                                        <AuthInput
                                            label="Email Address"
                                            onChange={inputHandler}
                                            className="mb-4"
                                            type="email"
                                            name="email"
                                            placeholder="Enter a valid email address"
                                            required={true}
                                        />
                                    ) : (
                                        <AuthInput
                                            label="Phone Number"
                                            onChange={inputHandler}
                                            className="mb-4"
                                            type="number"
                                            name="phone"
                                            placeholder="Enter your phone number"
                                            required={true}
                                        />
                                    )}
                                    <AuthInput
                                        label="Password"
                                        onChange={inputHandler}
                                        type="password"
                                        name="password"
                                        placeholder="Enter password"
                                        required={true}
                                    />

                                    <div className="px-3 mb-4">
                                        <NavLink
                                            to="/forgot-password"
                                            className="ml-auto mb-0 text-sm"
                                        >
                                            Forgot Password?
                                        </NavLink>
                                    </div>
                                    <center>
                                        <div className="row btn mb-3 px-3">
                                            <button
                                                type="submit"
                                                className="btn btn-custom text-center"
                                            >
                                                Sign In
                                            </button>
                                        </div>
                                    </center>
                                </form>
                                <div className="row mb-4 px-3">
                                    <div className="font-weight-bold text-sm">
                                        Don’t have an account yet?{" "}
                                        <NavLink to="/sign-up" className="text-danger ">
                                            Become A Seller
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SignIn;
