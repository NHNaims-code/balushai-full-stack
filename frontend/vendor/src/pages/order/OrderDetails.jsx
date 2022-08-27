import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import { Box, Divider, Paper, Tab, Table, TableBody, TableContainer, TableHead, TableRow, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import CaseDecision from 'components/switch/CaseDecision';
import { order_details_variation } from 'constants/index';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrder } from 'services/order/OrderService';
import { ErrorToast } from 'utils';
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
            <CaseDecision type={children} />
          </Typography>
        </Box>
      )}
    </div>
  );
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

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

const OrderDetails = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const history = useNavigate();
  const [order, setOrder] = useState({})
  const { id } = useParams();
  const getVendorSingleOrder = async () => {
    try {
      const res = await getOrder(id);
      setOrder(res?.data);
    } catch (error) {
      ErrorToast("Order Not Found");
      history('/order/list')
    }
  }

  useEffect(() => {
    getVendorSingleOrder();
  }, [])
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", margin: 1, marginTop: 5 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Customer" {...a11yProps(0)} />
          <Tab label="Amount" {...a11yProps(1)} />
          <Tab label="Transaction" {...a11yProps(3)} />
          <Tab label="Billing Address" {...a11yProps(4)} />
          <Tab label="Shipping Address" {...a11yProps(5)} />
        </Tabs>
      </Box>
      {
        order_details_variation.map((type, index) => {
          return (<TabPanel value={value} index={index}>
            {type}
          </TabPanel>)
        })
      }
      <Divider>Items</Divider>
      <center style={{ margin: '10px 0' }}>ID: {order?._id}</center>
      <Divider sx={{ marginX: 2 }}></Divider>
      <Box sx={{ padding: 1 }}>
        <TableContainer component={Paper} sx={{ width: '100%' }}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>SKU</StyledTableCell>
                <StyledTableCell>Product</StyledTableCell>
                <StyledTableCell>More</StyledTableCell>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell>Price</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Shipping</StyledTableCell>
                <StyledTableCell>Promotion</StyledTableCell>
                <StyledTableCell>Voucher</StyledTableCell>
                <StyledTableCell>Refunds</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order?.products?.map((product, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {product?.seller_sku}
                  </StyledTableCell>
                  <StyledTableCell>
                    {
                      <small>
                        {product?.name}<br></br>
                        color: {product?.color}<br></br>
                        size: {product?.size}
                      </small>
                    }
                  </StyledTableCell>
                  <StyledTableCell>
                    {
                      <small>
                        drop off: {product?.provider?.drop_off}<br></br>
                        delivery: {product?.provider?.delivery}<br></br>
                        tracking: <small sx={{ fontSize: '12px' }}>{product?.tracking_number}</small>
                      </small>
                    }
                  </StyledTableCell>
                  <StyledTableCell> <small>{product?.quantity}</small> </StyledTableCell>
                  <StyledTableCell><small>{Number(product?.price)}</small></StyledTableCell>
                  <StyledTableCell><small>{product?.status}</small> </StyledTableCell>
                  <StyledTableCell> <small>{product?.shipment_fee}</small> </StyledTableCell>
                  <StyledTableCell> <small>{product?.promotion}</small> </StyledTableCell>
                  <StyledTableCell> <small>{product?.voucher}</small> </StyledTableCell>
                  <StyledTableCell> <small>{product?.refunds}</small> </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default OrderDetails