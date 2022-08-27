/* eslint-disable jsx-a11y/alt-text */
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React from 'react'
import { TryCatch } from 'utils';
import { dynamicProductFeaturesHandler } from 'services/product/ProductService';
import { imageHover } from 'components/hoverImage/HoverImage';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ProductRow = (props) => {
    const { product } = props;
    const [open, setOpen] = React.useState(false);
    const suspendedProduct = async (type, id) => {
        const res = await Swal.fire({
            title: 'Enter the Suspended Reason',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            inputPlaceholder: 'Enter a reason',
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to input some value!'
                }
            }
        })
        if (res?.isConfirmed && res?.value) {
            TryCatch(async () => {
                await dynamicProductFeaturesHandler(type, id, { suspended_reasons: res?.value });
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'This product has been Suspended',
                    showConfirmButton: false,
                    timer: 1500
                })
                props.getAllProducts();
            });
        }
    };
    const approvedProduct = async (type, id) => {
        const res = await Swal.fire({
            title: 'Do you want to Approved this product?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `cancel`,
        })
        if (res?.isConfirmed) {
            TryCatch(async () => {
                await dynamicProductFeaturesHandler(type, id, {});
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'This Product has been Approved',
                    showConfirmButton: false,
                    timer: 1500
                })
                props.getAllProducts();
            });
        }
    };
    return (
        <>
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
                    <TableCell component="th" scope="row">
                        <Link to={{
                            pathname: `/product/${product?._id}`
                        }}>
                            <small>{product.name}</small>
                        </Link>
                    </TableCell>
                    <TableCell>
                        <img
                            height="100px"
                            width="80px"
                            className="img-fluid ml-5 m-2"
                            style={{ cursor: 'pointer' }}
                            src={product.image}
                            onClick={() => imageHover(product.image)}
                        />
                    </TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>
                        <del>{product?.price}</del>
                        <br />
                        {product?.special_price}
                    </TableCell>
                    <TableCell>
                        <small>{product.status}</small>
                    </TableCell>
                    <TableCell>
                        {product.quantity > 5 ? (
                            <span className="text-success">
                                {product.quantity}
                            </span>
                        ) : (
                            <span className="text-danger">
                                {product.quantity}
                            </span>
                        )}
                    </TableCell>
                    <TableCell>
                        <small>
                            Created<br />
                            {product.created?.slice(0, 10)}
                            <br />
                            Updated<br />
                            {product.updated?.slice(0, 10)}
                        </small>
                    </TableCell>
                    <TableCell>
                        {
                            (product?.status !== 'APPROVED') ? <>
                                <IconButton
                                    onClick={() => approvedProduct('approved', product._id)}
                                    title="Approved"
                                    className="px-2"
                                >
                                    <i className="fa fa-check-square text-success" ></i>
                                </IconButton>
                            </> : null
                        }
                        {
                            (product?.status !== 'SUSPENDED') ? <>
                                <IconButton
                                    onClick={() => suspendedProduct('suspended', product._id)}
                                    title="Suspended"
                                    className="px-2"
                                >
                                    <i className="fa fa-ban text-danger"></i>
                                </IconButton>
                            </> : null
                        }
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Vendor Information
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Image</TableCell>
                                            <TableCell>Information</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableCell>
                                            <small>{product?.vendor?._id}</small>
                                        </TableCell>
                                        <TableCell>
                                            <img
                                                height="100px"
                                                width="80px"
                                                className="img-fluid ml-5 m-2"
                                                style={{ cursor: 'pointer' }}
                                                src={product?.vendor?.logo?.url}
                                                onClick={() => imageHover(product?.vendor?.logo?.url)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <small>
                                                {product?.vendor?.seller_account?.shop_name}<br></br>
                                                {product?.vendor?.seller_account?.email}<br></br>
                                                {product?.vendor?.seller_account?.phone}
                                            </small>
                                        </TableCell>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        </>
    )
}

export default ProductRow