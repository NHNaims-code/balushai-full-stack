import { Box, Typography } from "@mui/material";
import { AccountTabs } from "components/TabsPanel";
import React from "react";
const ShopAccount = () => {
  return (
    <>
      <Box sx={{ paddingX: 4, paddingY: 2 }}>
        <Typography variant="h5" gutterBottom component="div">
          Profile
        </Typography>
        <AccountTabs />
      </Box>
    </>
  );
};

export default ShopAccount;
