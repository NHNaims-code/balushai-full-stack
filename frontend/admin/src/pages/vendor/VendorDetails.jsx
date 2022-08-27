import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import { Box, Divider, Tab, Tabs, Typography } from '@mui/material';
import CaseDecision from 'components/switch/CaseDecision';
import { vendor_details_variation } from 'constants/index';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorToast } from 'utils';
import { getVendor } from 'services/vendor/VendorService';
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>
            <CaseDecision type={children}/>
          </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const VendorDetails = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const history = useNavigate();
  const [vendor, setVendor] = useState({})
  const { id } = useParams();
  const getSingleVendor = async () => {
    try {
      const res = await getVendor(id);
      setVendor(res?.data);
    } catch (error) {
      ErrorToast("Vendor Not Found");
      history('/vendor/list')
    }
  }

  useEffect(() => {
    getSingleVendor();
  }, [])
  return (
    <Box sx={{ width: "100%" }}>
      <Divider sx={{ mt: 1 }}></Divider>
      <center style={{ margin: '10px 0' }}>ID: {vendor?._id}</center>
      <center style={{ margin: '10px 0' }}>{vendor?.seller_account?.shop_name}</center>
      <Divider></Divider>
      <Box sx={{ borderBottom: 1, borderColor: "divider", margin: 1, marginTop: 5 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab sx={{ textTransform: 'capitalize' }} label={`Orders (${vendor?.orders?.length || 0})`} {...a11yProps(0)} />
          <Tab sx={{ textTransform: 'capitalize' }} label={`Products (${vendor?.products?.length || 0})`} {...a11yProps(1)} />
          <Tab sx={{ textTransform: 'capitalize' }} label={`Vouchers (${vendor?.vouchers?.length || 0})`} {...a11yProps(2)} />
          <Tab sx={{ textTransform: 'capitalize' }} label={`Free Shipments (${vendor?.free_shipments?.length || 0})`} {...a11yProps(3)} />
          <Tab sx={{ textTransform: 'capitalize' }} label={`Campaigns (${vendor?.campaigns?.length || 0})`} {...a11yProps(4)} />
        </Tabs>
      </Box>
      {
        vendor_details_variation.map((type, index) => {
          return (<TabPanel value={value} index={index} vendor={vendor}>
            {type}
          </TabPanel>)
        })
      }
    </Box>
  );
}

export default VendorDetails