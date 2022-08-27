import * as React from 'react';
import { Grid } from '@mui/material';
import moment from "moment";
import { DatePicker } from 'antd';

export default function DateRangePicker({ name = '', label = '', disabled = false, defaultValue, placeholder, edit = false, setFieldValue, ...rest }) {
    const onChange = (date, dateString) => {
        if (name === "start_from" || name === "specific_period.start_date") {
            rest?.StartDateHandler(date, dateString, setFieldValue);
        } else {
            rest?.EndDateHandler(date, dateString, setFieldValue);
        }
    }
    const dateFormat = "YYYY-MM-DD";
    function disabledDate(current) {
        // Can not select days before today and today
        return current && current.valueOf() < Date.now();
    }
    return (
        <>
            <Grid container sx={{ marginBottom: '10px', marginTop: '8px' }}>
                <Grid item md={3} xs={12} sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', pr: 2 }}>
                    <label htmlFor={name} className='text-end'>{label} :</label>
                </Grid>
                <Grid item md={9} xs={12}>
                    {
                        edit ? <DatePicker
                            disabled={disabled}
                            placeholder={placeholder}
                            disabledDate={disabledDate}
                            allowClear={false}
                            style={{ width: '100%' }}
                            onChange={onChange}
                            value={moment(defaultValue)}
                            format={dateFormat}
                        /> : <DatePicker
                            disabled={disabled}
                            placeholder={placeholder}
                            disabledDate={disabledDate}
                            allowClear={false}
                            style={{ width: '100%' }}
                            onChange={onChange}
                        />
                    }
                </Grid>
            </Grid>
        </>

    );
}
