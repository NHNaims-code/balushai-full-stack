import { Card, CardContent, CardHeader, Divider, Grid, IconButton, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from "react";
import { TryCatch } from 'utils';
import { getPendingProductCounts, getSuspendedProductCounts, getApprovedProductCounts } from 'services/dashboard/DashboardService'
import { Link } from "react-router-dom";

const ProductOperation = () => {
    const [pending_product, setPending_product] = useState(0);
    const [suspended_product, setSuspended_product] = useState(0);
    const [approved_product, setApproved_product] = useState(0);
    const getPendingProductCount = async () => {
        TryCatch(async () => {
            const response = await getPendingProductCounts();
            setPending_product(response?.data || 0);
        });
    };
    const getSuspendedProductCount = async () => {
        TryCatch(async () => {
            const response = await getSuspendedProductCounts();
            setSuspended_product(response?.data || 0);
        });
    };
    const getApprovedProductCount = async () => {
        TryCatch(async () => {
            const response = await getApprovedProductCounts();
            setApproved_product(response?.data || 0);
        });
    };

    const getProductInfo = () => {
        getSuspendedProductCount();
        getPendingProductCount();
        getApprovedProductCount();
    }
    useEffect(() => {
        getProductInfo();
    }, []);
    return (
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
                    <Link to={{
                        pathname: `/product/list`
                    }}>
                        <Typography variant="body2" color="#333" sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
                            <strong>Suspended Product</strong> {suspended_product}
                        </Typography> </Link><Divider />
                    <Link to={{
                        pathname: `/product/list`
                    }}>
                        <Typography variant="body2" color="#333" sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
                            <strong>Approved Product </strong> {approved_product}
                        </Typography></Link> <Divider />
                    <Link to={{
                        pathname: `/product/list`
                    }}>
                        <Typography variant="body2" color="#333" sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
                            <strong>Pending Product</strong> {pending_product}
                        </Typography></Link> <Divider />
                </CardContent>
            </Card>
        </Grid>
    );
}

export default ProductOperation