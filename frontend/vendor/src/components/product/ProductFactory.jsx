/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { IconButton } from "@mui/material";
import { SuccessToast, TryCatch } from "utils";
import { dynamicFeaturesHandler, getProducts } from "services/product/ProductService";
import { useNavigate } from "react-router-dom";

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
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export default function ProductFactory(props) {
    const [page, setPage] = useState(0);
    const [products, setProducts] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const history = useNavigate();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const getAllProducts = async () => {
        TryCatch(async () => {
            const response = await getProducts(props.type);
            let temp = [];
            response?.data.forEach(function (product) {
                product.variant_stock_price?.forEach((variant) => {
                    variant?.sizes?.map((nestedSize) => {
                        temp.push({
                            _id: product._id,
                            name: product.product_name,
                            status: product.status,
                            created: product.createdAt,
                            updated: product.updatedAt,
                            color: variant.color_family,
                            image: variant.images[0].url,
                            size: nestedSize.size,
                            sku: nestedSize.seller_sku,
                            quantity: nestedSize.quantity,
                            price: nestedSize.pricing?.price,
                            special_price: nestedSize.pricing?.special_price,
                        });
                    });
                });
            });
            setProducts(temp);
        });
    };
    const editProduct = async (id) => {
        history(`/edit-product/${id}`)
    };
    const deleteProduct = async (type, id) => {
        TryCatch(async () => {
            await dynamicFeaturesHandler(type, id);
            SuccessToast('Product Deleted Successful');
            getAllProducts();
        });
    };
    const activeProduct = async (type, id) => {
        TryCatch(async () => {
            TryCatch(async () => {
                await dynamicFeaturesHandler(type, id);
                SuccessToast('Product Activated Successful');
                getAllProducts();
            });
        });
    };
    const deActiveProduct = async (type, id) => {
        TryCatch(async () => {
            await dynamicFeaturesHandler(type, id);
            SuccessToast('Product De Activated Successful');
            getAllProducts();
        });
    };
    const restoreProduct = async (type, id) => {
        TryCatch(async () => {
            await dynamicFeaturesHandler(type, id);
            SuccessToast('Product Restored Successful');
            getAllProducts();
        });
    };

    useEffect(() => {
        getAllProducts();;
    }, []);

    return (
        <Paper sx={{ overflowX: "auto" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Product</StyledTableCell>
                            <StyledTableCell>Image</StyledTableCell>
                            <StyledTableCell>SKU</StyledTableCell>
                            <StyledTableCell>Price</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell>Stock</StyledTableCell>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products && products
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((product, index) => {
                                return (
                                    <>
                                        <StyledTableRow
                                            key={index}
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <StyledTableCell component="th" scope="row">
                                                {product.name}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <img
                                                    height="100px"
                                                    width="80px"
                                                    className="img-fluid ml-5 m-2"
                                                    src={product.image}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell>{product.sku}</StyledTableCell>
                                            <StyledTableCell>
                                                <del>{product.price}</del>
                                                <br />
                                                {product.special_price}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {product.status}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {product.quantity > 5 ? (
                                                    <span className="text-success">
                                                        {product.quantity}
                                                    </span>
                                                ) : (
                                                    <span className="text-danger">
                                                        {product.quantity}
                                                    </span>
                                                )}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                Created<br />
                                                {product.created?.slice(0, 10)}
                                                <br />
                                                Updated<br />
                                                {product.updated?.slice(0, 10)}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {
                                                    (props.type !== 'deleted') ? <>
                                                        <IconButton
                                                            onClick={() => editProduct(product._id)}
                                                            size="small"
                                                            title="Edit"
                                                            className="px-1"
                                                            sx={{ color: "green" }}
                                                        >
                                                            <i className="fas fa-edit"></i>
                                                        </IconButton>
                                                    </> : null
                                                }

                                                {
                                                    (props.type !== 'deleted') ? <>
                                                        <IconButton
                                                            onClick={() => deleteProduct('delete', product._id)}
                                                            size="small"
                                                            className="px-1"
                                                            title="Delete"
                                                            sx={{ color: "red" }}
                                                        >
                                                            <i className="fa-solid fa-trash-can"></i>
                                                        </IconButton>
                                                    </> : null
                                                }

                                                {
                                                    (props.type === 'online') ? <>
                                                        <IconButton
                                                            onClick={() => deActiveProduct('deactive'.product._id)}
                                                            size="small"
                                                            title="DeActive"
                                                            className="px-1"
                                                        >
                                                            <i className="fa-solid fa-ban"></i>
                                                        </IconButton>
                                                    </> : null
                                                }
                                                {
                                                    props.type === 'deactive' ? <>
                                                        <IconButton
                                                            onClick={() => activeProduct('active', product._id)}
                                                            size="small"
                                                            title="Active"
                                                            className="px-1"
                                                            sx={{ color: "green" }}
                                                        >
                                                            <i className="fa-solid fa-square-check"></i>
                                                        </IconButton>
                                                    </> : null
                                                }
                                                {
                                                    props.type === 'deleted' ? <>
                                                        <IconButton
                                                            onClick={() => restoreProduct('restore', product._id)}
                                                            size="small"
                                                            title="Restore"
                                                            className="px-1"
                                                            sx={{ color: "green" }}
                                                        >
                                                            <i className="fa-solid fa-trash-can-undo"></i>
                                                        </IconButton>
                                                    </> : null
                                                }

                                            </StyledTableCell>
                                        </StyledTableRow>
                                    </>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={products?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
