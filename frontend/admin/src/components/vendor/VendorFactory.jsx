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
import { Box, TextField } from "@mui/material";
import VendorRow from "./VendorRow";
import { FilterByID } from "components/search/FilterBySearchValue";
import { getVendors } from "services/vendor/VendorService";

export default function VendorFactory(props) {
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);
    const [vendors, setVendors] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState("");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const getAllVendors = async () => {
        TryCatch(async () => {
            const response = await getVendors(props.type);
            setVendors(response?.data);
            setCount(response?.data?.length);
        });
    };

    useEffect(() => {
        getAllVendors();;
    }, []);
    const filterVendors = FilterByID(vendors, searchValue)

    return (
        <>
            <Box
                sx={{
                    maxWidth: '100%',
                    mb: 1
                }}
            >
                <TextField
                    fullWidth
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    id="filled-search"
                    label="Search By Vendor ID"
                    type="search"
                    variant="filled"
                />
            </Box>
            <Box sx={{ paddingY: 1 }}>
                <TableContainer component={Paper} sx={{ width: '100%' }}>
                    <Table stickyHeader aria-label="collapsible table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Vendor ID</TableCell>
                                <TableCell>Created</TableCell>
                                <TableCell>Orders</TableCell>
                                <TableCell>Products</TableCell>
                                <TableCell>Vouchers</TableCell>
                                <TableCell>Active</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filterVendors.length > 0 && filterVendors
                                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((vendor, index) => {
                                    return <VendorRow key={index} vendor={vendor} getAllVendors={getAllVendors} getAllVendorCountManage={props?.getAllVendorCountManage} />
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
        </>
    );
}
