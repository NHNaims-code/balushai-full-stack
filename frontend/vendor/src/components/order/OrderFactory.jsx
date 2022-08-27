import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { TryCatch } from "utils";
import { getOrders } from "services/order/OrderService";
import { Box } from "@mui/material";
import OrderRow from "./OrderRow";

export default function OrderFactory(props) {
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);
    const [orders, setOrders] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const getAllOrders = async () => {
        TryCatch(async () => {
            const response = await getOrders(props.type);
            setOrders(response?.data);
            let ctn = 0;
            response?.data?.forEach(order => {
                ctn += (order?.products?.length === 0 ? 0 : 1)
            });
            setCount(ctn);
        });
    };

    useEffect(() => {
        getAllOrders();
    }, []);

    return (
        <Box sx={{ paddingY: 1 }}>
            <TableContainer component={Paper} sx={{ width: '100%' }}>
                <Table stickyHeader aria-label="collapsible table" size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Order ID</TableCell>
                            <TableCell>Order Date</TableCell>
                            <TableCell>Payment Method</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>#</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.length > 0 && orders
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((order, index) => {
                                return <OrderRow key={index} order={order} getAllOrders={getAllOrders} getAllOrderCountManage={props?.getAllOrderCountManage}/>
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
}
