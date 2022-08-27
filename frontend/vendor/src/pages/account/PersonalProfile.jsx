import { Box, Typography } from "@mui/material";
import { PersonalAccountTabs } from "components/TabsPanel";
import React from "react";
const PersonalProfile = () => {
  return (
    <>
      <Box sx={{ paddingX: 4, paddingY: 2 }}>
        <Typography variant="h5" gutterBottom component="div">
          Account Settings
        </Typography>
        <PersonalAccountTabs />
      </Box>
    </>
  );
};

export default PersonalProfile