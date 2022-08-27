import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { CreatedDateCheck } from 'services/finance/FinanceService';
import { TryCatch } from 'utils';
const FOURTEEN_DAYS = 14 * 24 * 60 * 60 * 1000;
const ONE_DAYS = 1 * 24 * 60 * 60 * 1000;

function AccountStatement() {
    const [status, setStatus] = useState('');
    const [rows, setRows] = useState([])
    const handleChange = (event) => {
        setStatus(event.target.value);
        console.log(event.target.value)
    };
    const checkSellerAccountCreatedDate = () => {
        TryCatch(async () => {
            const res = await CreatedDateCheck();
            let date = new Date(res?.data?.createdAt);
            (date?.getDate() > 0 && date?.getDate() < 16) ? date?.setDate(1) : date?.setDate(16);
            const diffTime = Math.abs(new Date() - new Date(date));
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const cnt = Math.floor(diffDays / 15);
            let tempRow = [];
            for (let i = 0; i < cnt; i++) {
                const tmpDate = date?.toISOString()?.slice(0, 10);
                date = new Date(date?.getTime() + (FOURTEEN_DAYS));
                const tmp = {
                    value: `${tmpDate}/${date?.toISOString()?.slice(0, 10)}`,
                    label: `${tmpDate} - ${date?.toISOString()?.slice(0, 10)}`
                }
                tempRow.push(tmp);
                date = new Date(date?.getTime() + (ONE_DAYS));
            }
            setRows(tempRow);
        });
    }
    useEffect(() => {
        checkSellerAccountCreatedDate();
    }, [])

    return (
        <>
            <Box sx={{ maxWidth: 240, marginBottom: '15px' }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Date</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="Date"
                        onChange={handleChange}
                    >
                        {
                            rows?.length > 0 && rows?.map((row, index) => {
                                return (
                                    <MenuItem key={index} value={row?.value}>{row?.label}</MenuItem>
                                )
                            })
                        }
                        
                    </Select>
                </FormControl>
            </Box>{/* 
            <FreeShippingFactory type={status} /> */}
        </>
    )
}

export default AccountStatement 