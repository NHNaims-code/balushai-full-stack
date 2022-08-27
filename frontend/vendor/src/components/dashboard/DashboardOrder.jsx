/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { Box, Button, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link } from "react-router-dom";

const OrderRow = (props) => {
    const { order } = props;
    const [open, setOpen] = React.useState(false);
    let total = 0;
    let qty = 0;
    order?.products?.forEach(product => {
        total += product?.total_price;
        qty += product?.quantity
    })
    if (order?.products?.length === 0) {
        return null;
    } else {
        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row" title={order?._id} sx={{ cursor: 'pointer' }}>
                        <Link to={{
                            pathname: `/order/${order?._id}`
                        }}>{order._id?.slice(0, 8)}...</Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {order?.createdAt?.slice(0, 10)}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {order?.payment_information?.method}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {total}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {qty}
                    </TableCell>
                    <TableCell component="th" scope="row" sx={{ fontSize: '12px' }}>
                        {order?.products?.length === 1 ? <><small>{order?.products[0].status}</small></> : <>*</>}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        <Button variant="outlined" size="small" color="secondary">
                            <Link to={{
                                pathname: `/order/list`
                            }}>More</Link>
                        </Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Order Details #{order?._id}
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Customer</TableCell>
                                            <TableCell>Product</TableCell>
                                            <TableCell>Image</TableCell>
                                            <TableCell>More</TableCell>
                                            <TableCell>#</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell title="Ship On Time SLA">SLA</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            order?.products && order?.products?.map((product, index) => {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell>
                                                            <small>
                                                                {
                                                                    order?.billing_address ? <>
                                                                        {order?.billing_address?.full_name}<br></br>
                                                                        {order?.billing_address?.address}<br></br>
                                                                        {order?.billing_address?.area}<br></br>
                                                                        {order?.billing_address?.city}<br></br>
                                                                        {order?.billing_address?.region}<br></br>
                                                                        {order?.billing_address?.phone}
                                                                    </> : <span>*</span>
                                                                }
                                                            </small>
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                <small>
                                                                    {product?.name}<br></br>
                                                                    color: {product?.color}<br></br>
                                                                    size: {product?.size}
                                                                </small>
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            <img
                                                                height="100px"
                                                                width="80px"
                                                                className="img-fluid ml-5 m-2"
                                                                src={product?.image}
                                                                alt="Product Image"
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                <small>
                                                                    drop off: {product?.provider?.drop_off}<br></br>
                                                                    delivery: {product?.provider?.delivery}<br></br>
                                                                    tracking: <small sx={{ fontSize: '12px' }}>{product?.tracking_number}</small>
                                                                </small>
                                                            }
                                                        </TableCell>
                                                        <TableCell><small>{product?.quantity}</small></TableCell>
                                                        <TableCell>
                                                            <small>{product?.total_price}</small>
                                                        </TableCell>
                                                        <TableCell sx={{ fontSize: '12px' }} title={product?.status === 'CANCELLED' ? `${product?.cancellation_reasons}` : null}><small>{product?.status}</small></TableCell>
                                                        <TableCell><small>{product?.ship_on_time?.slice(0, 10)}</small></TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

}

export default OrderRow