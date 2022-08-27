import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthInput from "components/Input/AuthInput";
import Image from "components/Image/Image";
import { TryCatch, SuccessToast } from "utils";
import { sendOtp, signUp, verifyOtp } from "adapters/auth/signup";
import Swal from "sweetalert2";
const TWO_MINUTES = 2 * 60 * 1000;

const Signup = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        shop_name: "",
        phone: "",
    }),
        inputHandler = (event) => {
            const { name, value } = event.target;
            setUser((oldUser) => {
                return { ...oldUser, [name]: value };
            });
        },
        history = useNavigate(),
        signUpSubmit = (e) => {
            e.preventDefault();
            TryCatch(async () => {
                const response = await sendOtp(user);
                if (response?.data) {
                    const res = await Swal.fire({
                        text: `Enter the OTP. Please Check your Phone Number\nIt Will be expired in 2 minute`,
                        input: 'number',
                        confirmButtonText: 'Submit',
                        timer: TWO_MINUTES,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        inputValidator: (value) => {
                            if (!value) {
                                return 'You need to input your OTP!'
                            }
                        },
                        
                    })
                    if (res?.isConfirmed && res?.value) {
                        await verifyOtp({ phone: user.phone, otp: res?.value });
                        await signUp("sign-up", user);
                        SuccessToast("Sign Up successful");
                        history("/sign-in");
                    }
                }
            });
        };
    return (
        <div style={{ marginTop: "30px" }}>
            <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 mx-auto">
                <div className="card card0 border-0">
                    <div className="row d-flex">
                        <div className="col-lg-6">
                            <div className="card1 pb-5">
                                <div className="row px-3 pt-5 justify-content-center mt-4 mb-5 border-line-sign-up">
                                    <Image
                                        src="images/auth.svg"
                                        className="image"
                                        alt="Auth Image"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="border-0 px-4  mt-lg-3 mt-md-4">
                                <form onSubmit={signUpSubmit}>
                                    <AuthInput
                                        label="Phone Number"
                                        onChange={inputHandler}
                                        className="mb-4"
                                        type="phone"
                                        name="phone"
                                        placeholder="Enter your phone number"
                                        required={true}
                                    />
                                    <AuthInput
                                        label="Shop Name"
                                        onChange={inputHandler}
                                        className="mb-4"
                                        type="text"
                                        name="shop_name"
                                        placeholder="Enter the shop name.Next time you can not change Shop Name"
                                        required={true}
                                    />
                                    <AuthInput
                                        label="Full Name"
                                        onChange={inputHandler}
                                        className="mb-4"
                                        type="text"
                                        name="name"
                                        placeholder="Enter your full name"
                                        required={true}
                                    />
                                    <AuthInput
                                        label="Email Address"
                                        onChange={inputHandler}
                                        className="mb-4"
                                        type="email"
                                        name="email"
                                        placeholder="Enter a valid email address"
                                        required={true}
                                    />
                                    <AuthInput
                                        label="Password"
                                        onChange={inputHandler}
                                        type="password"
                                        className="mb-4"
                                        name="password"
                                        placeholder="Enter password"
                                        required={true}
                                    />
                                    <AuthInput
                                        label="Confirm Password"
                                        onChange={inputHandler}
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm password"
                                        required={true}
                                    />
                                    <center>
                                        <div className="row btn mb-3 px-3">
                                            <button
                                                type="submit"
                                                className="btn btn-custom text-center"
                                            >
                                                Sign Up
                                            </button>
                                        </div>
                                    </center>
                                </form>
                                <div className="row mb-4 px-3">
                                    <small className="font-weight-bold text-sm">
                                        To keep connected with us please login with your personal
                                        info{" "}
                                        <NavLink to="/sign-in" className="text-danger ">
                                            Sign In
                                        </NavLink>
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
