/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { Box, Button, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { TryCatch } from "utils";
import { imageHover } from 'components/hoverImage/HoverImage';
import { activeVendor, deActiveVendor } from 'services/vendor/VendorService';

const VendorRow = (props) => {
    const { vendor } = props;
    const [open, setOpen] = React.useState(false);
    const vendorActiveHandle = async (id) => {
        const res = await Swal.fire({
            title: 'Do you want to Active this vendor?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `cancel`,
        })
        if (res?.isConfirmed) {
            TryCatch(async () => {
                await activeVendor(id);
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'This Vendor has been Activated',
                    showConfirmButton: false,
                    timer: 1500
                })
                props?.getAllVendorCountManage();
                props?.getAllVendors()
            });
        }
    }
    const vendorDeActiveHandle = async (id) => {
        const res = await Swal.fire({
            title: 'Do you want to De Active this vendor?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `cancel`,
        })
        if (res?.isConfirmed) {
            TryCatch(async () => {
                await deActiveVendor(id);
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'This Vendor has been DeActivated',
                    showConfirmButton: false,
                    timer: 1500
                })
                props?.getAllVendorCountManage();
                props?.getAllVendors()
            });
        }
    }
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
                <TableCell component="th" scope="row" title={vendor?._id} sx={{ cursor: 'pointer' }}>
                    <Link to={{
                        pathname: `/vendor/${vendor?._id}`
                    }}>{vendor._id}</Link>
                </TableCell>
                <TableCell component="th" scope="row">
                    {vendor?.createdAt?.slice(0, 10)}
                </TableCell>
                <TableCell component="th" scope="row">
                    {vendor?.orders?.length}
                </TableCell>
                <TableCell component="th" scope="row">
                    {vendor?.products?.length}
                </TableCell>
                <TableCell component="th" scope="row">
                    {vendor?.vouchers?.length}
                </TableCell>
                <TableCell component="th" scope="row" sx={{ fontSize: '12px' }}>
                    {
                        vendor?.is_active ? <i className="fa fa-check text-success" title='Active'></i> : <i className="fa fa-times text-danger" title='De Active'></i>
                    }
                </TableCell>
                <TableCell component="th" scope="row">
                    <Button variant="outlined" size="small" color="secondary">
                        <Link to={{
                            pathname: `/vendor/${vendor?._id}`
                        }}>More</Link>
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Vendor Details #{vendor?._id}
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Account Info</TableCell>
                                        <TableCell>Bank Account Info</TableCell>
                                        <TableCell>Logo</TableCell>
                                        <TableCell>WareHouse Address</TableCell>
                                        <TableCell>Return Address</TableCell>
                                        <TableCell>Active</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={1}>
                                        <TableCell>
                                            {
                                                vendor?.seller_account ? <>
                                                    <small>
                                                        Shop: {vendor?.seller_account?.shop_name}<br></br>
                                                        Email: {vendor?.seller_account?.email}<br></br>
                                                        Phone: {vendor?.seller_account?.phone}<br></br>
                                                    </small></> : null
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {
                                                vendor?.bank_account ? <>
                                                    <small>
                                                        Title: {vendor?.bank_account?.title}<br></br>
                                                        Number: {vendor?.bank_account?.number}<br></br>
                                                        Name: {vendor?.bank_account?.name}<br></br>
                                                        Branch: {vendor?.bank_account?.branch}<br></br>
                                                        Routing: {vendor?.bank_account?.routing_number}<br></br>
                                                        <img
                                                            height="64px"
                                                            width="64px"
                                                            style={{ cursor: 'pointer' }}
                                                            className="img-fluid mt-1"
                                                            src={vendor?.bank_account?.cheque_copy}
                                                            alt="Cheque Copy"
                                                            onClick={() => imageHover(vendor?.bank_account?.cheque_copy)}
                                                        />
                                                    </small></> : null
                                            }

                                        </TableCell>
                                        <TableCell>
                                            {
                                                vendor?.logo ? <>
                                                    <small>
                                                        <img
                                                            height="64px"
                                                            width="64px"
                                                            style={{ cursor: 'pointer' }}
                                                            className="img-fluid"
                                                            src={vendor?.logo?.url}
                                                            alt="Cheque Copy"
                                                            onClick={() => imageHover(vendor?.logo?.url)}
                                                        />
                                                    </small></> : null
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {
                                                vendor?.warehouse_address ? <>
                                                    <small>
                                                        Name: {vendor?.warehouse_address?.name}<br></br>
                                                        Address: {vendor?.warehouse_address?.address}<br></br>
                                                        Phone: {vendor?.warehouse_address?.phone}<br></br>
                                                        City/Town: {vendor?.warehouse_address?.city_or_town}<br></br>
                                                        Country: {vendor?.warehouse_address?.country}<br></br>
                                                        Division: {vendor?.warehouse_address?.division}<br></br>
                                                        City: {vendor?.warehouse_address?.city}<br></br>
                                                        Post: {vendor?.warehouse_address?.post_code}<br></br>
                                                    </small></> : null
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {
                                                vendor?.return_address ? <>
                                                    <small>
                                                        Name: {vendor?.return_address?.name}<br></br>
                                                        Address: {vendor?.return_address?.address}<br></br>
                                                        Phone: {vendor?.return_address?.phone}<br></br>
                                                        City/Town: {vendor?.return_address?.city_or_town}<br></br>
                                                        Country: {vendor?.return_address?.country}<br></br>
                                                        Division: {vendor?.return_address?.division}<br></br>
                                                        City: {vendor?.return_address?.city}<br></br>
                                                        Post: {vendor?.return_address?.post_code}<br></br>
                                                    </small></> : null
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {
                                                vendor?.is_active ? <i className="fa fa-check text-success" title='Active'></i> : <i className="fa fa-times text-danger" title='De Active'></i>
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {(vendor && (!vendor?.is_active)) ? <><small>{
                                                <small>
                                                    <Button sx={{ my: 1 }} variant="outlined" size="small" color="success" onClick={() => vendorActiveHandle(vendor?._id)}>
                                                        Active
                                                    </Button>
                                                </small>
                                            }</small></> : <> <small>
                                                <Button sx={{ my: 1 }} variant="outlined" size="small" color="error" onClick={() => vendorDeActiveHandle(vendor?._id)}>
                                                    DeActive
                                                </Button>
                                            </small> </>}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );

}

export default VendorRow