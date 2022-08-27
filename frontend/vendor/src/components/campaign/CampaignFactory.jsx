/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from "react";
import Countdown from 'react-countdown';
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
import { TryCatch } from "utils";
import { useNavigate } from "react-router-dom";
import { getCampaigns } from "services/promotions/Promotion.Service";
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

export default function CampaignFactory({ type }) {
    const [campaigns, setCampaigns] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const history = useNavigate();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const joinCampaign = async (id) => {
        history(`/campaign/${id}/details`)
    };

    const getAllCampaigns = () => {
        TryCatch(async () => {
            if (type === 'online') {
                const res = await getCampaigns('promotions/online-campaigns');
                setCampaigns(res?.data)
            } else if (type === 'incoming') {
                const res = await getCampaigns('promotions/incoming-campaigns');
                setCampaigns(res?.data)
            } else {
                setCampaigns([])
            }
        });
    }

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        return completed ? <span style={{ color: 'red' }}>Registration Closed</span> : <span>{days}d : {hours}h : {minutes}m : {seconds}s</span>;
    };
    useEffect(() => {
        getAllCampaigns();
    }, [type])

    return (
        <>
            <Paper sx={{ overflowX: "auto" }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Title</StyledTableCell>
                                <StyledTableCell>Period</StyledTableCell>
                                <StyledTableCell>Registration Ends</StyledTableCell>
                                <StyledTableCell>Seller</StyledTableCell>
                                <StyledTableCell>Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {campaigns.length > 0 && campaigns
                                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((campaign, index) => {
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
                                                    {campaign.title}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {campaign.campaign_start_time?.slice(0, 10)}
                                                    <br /> -<br></br>
                                                    {campaign.campaign_end_time?.slice(0, 10)}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {campaign.registration_end_time?.slice(0, 10)}<br></br>
                                                    <span style={{ color: 'blue' }}>
                                                        <Countdown date={new Date(campaign.registration_end_time)}
                                                            renderer={renderer} />
                                                    </span>
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row">
                                                    {campaign?.vendors}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {
                                                        new Date().getTime() < new Date(campaign?.registration_end_time)?.getTime() ?
                                                            <IconButton
                                                                onClick={() => joinCampaign(campaign?._id)}
                                                                size="small"
                                                                title="Join"
                                                                className="px-1"
                                                                sx={{ color: "green" }}
                                                            >
                                                                Join
                                                            </IconButton> : null
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
                    rowsPerPageOptions={[10, 20, 30]}
                    component="div"
                    count={campaigns?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </>

    );
}