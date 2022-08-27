import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DashboardOrder from 'components/dashboard/DashboardOrder'
import { TryCatch } from 'utils';
import { getLatestPendingOrders, getFollowers } from 'services/dashboard/DashboardService';
import { useEffect, useState } from 'react';
import Performance from 'components/dashboard/Performance';
import ProductOperation from 'components/dashboard/ProductOperation'

export default function Dashboard() {
    const [orders, setOrders] = useState([]);
    const [followers, setFollowers] = useState(0);
    const [product_rating, setProduct_rating] = useState(0);
    const getAllOrders = async () => {
        TryCatch(async () => {
            const response = await getLatestPendingOrders();
            setOrders(response?.data);
        });
    };
    const getAllFollowers = async () => {
        TryCatch(async () => {
            const response = await getFollowers();
            setFollowers(response?.data || 0);
        });
    };
    const getDashboardInfo = () => {
        getAllOrders();
        getAllFollowers();
    }

    useEffect(() => {
        getDashboardInfo();
    }, []);
    return (
        <>
            <Box sx={{ paddingX: 4, paddingY: 2 }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Performance followers={followers} product_rating={product_rating} />
                   <ProductOperation />
                </Grid>
                <Typography variant="h6" gutterBottom component="div">
                    <small>Latest Pending Order</small>
                </Typography> <Divider />
                {
                    orders[0]?.products.length > 0 ? <TableContainer component={Paper} sx={{ width: '100%', marginTop: 1 }}>
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
                                    ?.slice(0, 3)
                                    .map((order, index) => {
                                        return <DashboardOrder key={index} order={order} />
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer> : <center>No Pending Orders Found</center>}
            </Box>
        </>

    );
}