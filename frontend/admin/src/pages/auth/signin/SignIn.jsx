import React, { useState, useContext } from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { TryCatch, ErrorToast, SuccessToast, CookieSet } from "utils";
import { PhoneSignInValidation } from "validations";
import { sendOtp, signIn } from "adapters/auth/signin";
import AuthApi from "store/AuthApi";
import { Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
const TWO_MINUTES = 2 * 60 * 1000;

const SignIn = () => {
    const [phone, setPhone] = useState(''),
        context = useContext(AuthApi),
        handleSubmit = async (e) => {
            e.preventDefault();
            TryCatch(async () => {
                const validation = PhoneSignInValidation({ phone });
                if (validation.error) return ErrorToast(validation.error?.details[0].message);
                const response = await sendOtp({ phone });
                if (response?.data) {
                    const res = await Swal.fire({
                        text: `Enter the OTP. Please Check your Phone Number`,
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
                        setPhone('');
                        const tokenResponse = await signIn({ phone, otp: res?.value });
                        context?.setUser(true);
                        CookieSet(tokenResponse);
                        SuccessToast(`Welcome Admin`);
                        window.location.href = '/'
                    }
                }
            });
        }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 15,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        required
                        fullWidth
                        label="Phone"
                        value={phone}
                        name="phone"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};
export default SignIn;
