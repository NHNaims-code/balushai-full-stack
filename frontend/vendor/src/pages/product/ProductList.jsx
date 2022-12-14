import { Box, Typography } from '@mui/material'
import ProductTabs from 'components/TabsPanel/ProductTabPanel'
import React from 'react'

const ProductList = () => {
  return (
    <Box sx={{ paddingX: 4, paddingY: 2 }}>
      <Typography variant="h5" gutterBottom component="div">
        Product Management
      </Typography>
      <ProductTabs />
    </Box>
  )
}

export default ProductList