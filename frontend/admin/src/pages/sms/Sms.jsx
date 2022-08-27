/* eslint-disable jsx-a11y/alt-text */
import { Box, Grid } from "@mui/material";
import FormikInput from "components/Input/FormikInput";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Button } from "@mui/material";
import { ErrorToast } from "utils";
import { useNavigate } from "react-router-dom";
import Loader from "layouts/loader/loader";
import BooleanCheckBox from "components/Input/CheckBox";
import FormikRichText from "components/Input/FormikRichText";
import Swal from "sweetalert2";
import { sendSms } from "services/sms/SmsService";


export default function SMS() {
    const [value, setValue] = useState("");
    const [loader, setLoader] = useState(false)
    const history = useNavigate();
    const initialValues = {
        phone: undefined,
        all_phone: false,
        body: undefined
    };

    const onSubmit = async (values) => {
        values.body = value;
        try {
            setLoader(true);
            await sendSms(values);
            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'SMS Send Successful',
                showConfirmButton: false,
                timer: 1500
            })
            history('/');
        } catch (error) {
            if (error.response) {
                ErrorToast(error.response?.data?.err);
            }
        } finally {
            setLoader(false);
        }
    };
    const handleBooleanChange = (event, setFieldValue, type) => {
        setFieldValue(type, event.target.checked)
    };
    return (
        <>
            <Box sx={{ p: { xs: 2 }, mt: 5, p: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {/* Formik Form handler */}
                        <Formik
                            enableReinitialize={true}
                            onSubmit={onSubmit}
                            initialValues={initialValues}
                        >
                            {({ values, setFieldValue }) => (
                                <Form>
                                    <Box
                                        sx={{
                                            backgroundColor: "white",
                                            boxShadow: 2,
                                            p: 2,
                                        }}
                                    >
                                        <FormikInput
                                            id="phone"
                                            name="phone"
                                            label="Phone"
                                            placeholder="Enter The Phone Number to send custom sms"
                                            disabled={values.all_phone ? true : false}
                                            type="phone"
                                        />
                                        <BooleanCheckBox
                                            id="all_phone"
                                            name="all_phone"
                                            label="Send SMS to all Customer"
                                            check={values.all_phone}
                                            handleBooleanChange={handleBooleanChange}
                                            setFieldValue={setFieldValue}
                                            type="all_phone"
                                        />
                                        <FormikRichText
                                            id="body"
                                            name="body"
                                            label="SMS Body"
                                            value={value}
                                            setValue={setValue}
                                        />
                                    </Box>
                                    {loader ? <Loader />
                                        : <Box
                                            sx={{
                                                backgroundColor: "white",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                padding: 1
                                            }}
                                        >
                                            <span></span>
                                            <Button type="submit" variant="contained">
                                                Submit
                                            </Button>
                                        </Box>}

                                </Form>
                            )}
                        </Formik>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
