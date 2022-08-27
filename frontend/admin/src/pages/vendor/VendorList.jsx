import { Box, Typography } from '@mui/material'
import { VendorTabs } from 'components/TabsPanel'
import React from 'react'

const VendorList = () => {
  return (
    <Box sx={{ paddingX: 4, paddingY: 2 }}>
      <Typography variant="h5" gutterBottom component="div">
        Vendor Management
      </Typography>
      <VendorTabs />
    </Box>
  )
}

export default VendorList