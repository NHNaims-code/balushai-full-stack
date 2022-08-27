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
import { useNavigate } from "react-router-dom";
import { ActiveVoucher, DeActiveVoucher, getVouchers } from "services/promotions/Promotion.Service";

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

export default function VoucherFactory({ type }) {
    const [vouchers, setVouchers] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const history = useNavigate();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const editVoucher = async (id) => {
        history(`/edit-voucher/${id}`)
    };
    const activeVoucher = async (id) => {
        TryCatch(async () => {
            TryCatch(async () => {
                await ActiveVoucher(id);
                SuccessToast('Activated');
                getAllVouchers();
            });
        });
    };
    const deActiveVoucher = async (id) => {
        TryCatch(async () => {
            await DeActiveVoucher(id);
            SuccessToast('De Activated');
            getAllVouchers();
        });
    };
    const getAllVouchers = () => {
        TryCatch(async () => {
            if (type === 'all') {
                const res = await getVouchers('promotions/vouchers');
                setVouchers(res?.data)
            } else if (type === 'active') {
                const res = await getVouchers('promotions/active-vouchers');
                setVouchers(res?.data)
            } else if (type === 'deactive') {
                const res = await getVouchers('promotions/deactive-vouchers');
                setVouchers(res?.data)
            } else {
                setVouchers([])
            }
        });
    }
    useEffect(() => {
        getAllVouchers();
    }, [type])
    return (
        <Paper sx={{ overflowX: "auto" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Code</StyledTableCell>
                            <StyledTableCell>Period</StyledTableCell>
                            <StyledTableCell>Minimum BDT</StyledTableCell>
                            <StyledTableCell>Details</StyledTableCell>
                            <StyledTableCell>Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vouchers.length > 0 && vouchers
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((voucher, index) => {
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
                                                {voucher.name}
                                            </StyledTableCell>
                                            <StyledTableCell component="th" scope="row">
                                                {voucher.code}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {voucher.start_from?.slice(0, 10)}
                                                <br /> -<br></br>
                                                {voucher.end_time?.slice(0, 10)}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {voucher.min_amount_to_apply}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <small>
                                                    Type: {voucher?.discount_type}<br></br>
                                                    Total: {voucher?.total_issued_voucher}<br></br>
                                                    Per Customer: {voucher?.limit_voucher_usage_for_customer}<br></br>
                                                    {voucher?.discount_type === 'MONEY_VALUE_VOUCHER' ? <>
                                                        Discount(BDT): {voucher?.discount_amount}
                                                    </> : <>
                                                        Discount(%): {voucher?.discount_amount_percentage}
                                                        Discount(Max): {voucher?.max_discount_amount}</>}
                                                </small>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <IconButton
                                                    onClick={() => editVoucher(voucher?._id)}
                                                    size="small"
                                                    title="Edit"
                                                    className="px-1"
                                                    sx={{ color: "green" }}
                                                >
                                                    <i class="fas fa-edit"></i>
                                                </IconButton>
                                                {
                                                    (voucher?.is_active) ? <>
                                                        <IconButton
                                                            onClick={() => deActiveVoucher(voucher._id)}
                                                            size="small"
                                                            title="DeActive"
                                                            className="px-1"
                                                        >
                                                            <i class="fa-solid fa-ban"></i>
                                                        </IconButton>
                                                    </> : <IconButton
                                                        onClick={() => activeVoucher(voucher._id)}
                                                        size="small"
                                                        title="Active"
                                                        className="px-1"
                                                        sx={{ color: "green" }}
                                                    >
                                                        <i class="fa-solid fa-check"></i>
                                                    </IconButton>
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
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={vouchers?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
