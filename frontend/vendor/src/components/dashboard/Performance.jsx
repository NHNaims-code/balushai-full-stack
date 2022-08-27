import { Card, CardContent, CardHeader, Divider, Grid, IconButton, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from "react-router-dom";

const Performance = (props) => {
    return (
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
                        <strong>Rating & Followers</strong>
                    </Typography> <Divider />
                    <Link to={{
                        pathname: `/product/list`
                    }}>
                        <Typography variant="body2" color="#333" sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
                            <strong>Product Rating </strong> {props?.product_rating}
                        </Typography></Link> <Divider />
                    <Typography variant="body2" color="#333" sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
                        <strong>Followers </strong> {props?.followers}
                    </Typography> <Divider />
                </CardContent>
            </Card>
        </Grid>
    );
}

export default Performance