import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {  Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';

function createData(name, calories, fat, carbs, protein, price) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        history: [
            {
                date: '2020-01-05',
                customerId: '11091700',
                amount: 3,
            },
            {
                date: '2020-01-02',
                customerId: 'Anonymous',
                amount: 1,
            },
        ],
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

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
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.customerId}</TableCell>
                                            <TableCell align="right">{historyRow.amount}</TableCell>
                                            <TableCell align="right">
                                                {Math.round(historyRow.amount * row.price * 100) / 100}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function OrderTable() {
    return (
        <div>
            <Box sx={{ paddingX: 4, paddingY: 2 }}>
                <TableContainer component={Paper} sx={{ minWidth: 700 }}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Order ID</TableCell>
                                <TableCell align="left">Order Date</TableCell>
                                <TableCell align="left">Update Date</TableCell>
                                <TableCell align="left">Payment Method</TableCell>
                                <TableCell align="left">Price</TableCell>
                                <TableCell align="left">Quantity</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left">Printed</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <Row key={row.name} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <Card sx={{ maxWidth: 500, mt: 3, borderRadius: 2, }}>
                            <CardHeader
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title="Performance"
                            />
                            <Divider />
                            <CardContent>
                                <Typography variant="h6" gutterBottom component="div">
                                    <strong>Rating</strong>
                                </Typography> <Divider />
                                <Typography variant="body2" color="#333" sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Product Rating </strong> 5
                                </Typography> <Divider />
                                <Typography variant="body2" color="#333" sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Response Rate </strong> 100%
                                </Typography> <Divider />
                                <Typography variant="body2" color="#333" sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Response Time(min)</strong> 22.87
                                </Typography> <Divider />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card sx={{ maxWidth: 500, mt: 3, borderRadius: 2, }}>
                            <CardHeader
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title="Operation"
                            />
                            <Divider />
                            <CardContent>
                                <Typography variant="h6" gutterBottom component="div">
                                    <strong>Product</strong>
                                </Typography> <Divider />
                                <Typography variant="body2" color="#333" sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Suspended Product</strong> 5
                                </Typography> <Divider />
                                <Typography variant="body2" color="#333" sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Approved Product </strong> 1
                                </Typography> <Divider />
                                <Typography variant="body2" color="#333" sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Pending Product</strong> 2
                                </Typography> <Divider />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>


            </Box>
        </div>

    );
}
