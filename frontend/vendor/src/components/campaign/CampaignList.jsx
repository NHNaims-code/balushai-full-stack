import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
import CampaignFactory from './CampaignFactory';

const CampaignList = () => {
    const [status, setStatus] = useState('incoming');
    const handleChange = (event) => {
        setStatus(event.target.value);
    };
    return (
        <>
            <Box sx={{ maxWidth: 240, marginBottom: '20px' }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="Status"
                        onChange={handleChange}
                    >

                        <MenuItem value='incoming'>Incoming</MenuItem>
                        <MenuItem value='online'>Online</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <CampaignFactory type={status} />
        </>
    )
}

export default CampaignList