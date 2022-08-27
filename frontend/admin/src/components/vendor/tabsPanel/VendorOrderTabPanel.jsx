import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { vendor_order_variation } from "constants/index";
import CaseDecision from "components/switch/CaseDecision";
import { useEffect, useState } from "react";
import { TryCatch } from "utils";
import { getVendorOrderCount } from "services/vendor/VendorService";
import { useParams } from "react-router-dom";
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>
                        <CaseDecision type={children} getAllOrderCountManage={props?.getAllOrderCountManage} />
                    </Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function VendorOrderTabs() {
    const [value, setValue] = useState(0);
    const [pendingOrderCount, setPendingOrderCount] = useState(0);
    const [readyToShipOrderCount, setReadyToShipOrderCount] = useState(0);
    const [deliveredOrderCount, setDeliveredOrderCount] = useState(0);
    const [canceledOrderCount, setCanceledOrderCount] = useState(0);
    const [returnedOrderCount, setReturnedOrderCount] = useState(0);
    const [failedDeliveryOrderCount, setFailedDeliveryOrderCount] = useState(0);
    const [shippedOrderCount, setShippedOrderCount] = useState(0);
    const { id } = useParams();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const getPendingOrdersCount = () => {
        TryCatch(async () => {
            const cnt = await getVendorOrderCount('pending', id);
            setPendingOrderCount(cnt?.data || 0);
        });
    }
    const getReadyToShipOrdersCount = () => {
        TryCatch(async () => {
            const cnt = await getVendorOrderCount('ready_to_ship', id);
            setReadyToShipOrderCount(cnt?.data || 0);
        });
    }
    const getShippedOrdersCount = () => {
        TryCatch(async () => {
            const cnt = await getVendorOrderCount('shipped', id);
            setShippedOrderCount(cnt?.data || 0);
        });
    }
    const getDeliveredOrdersCount = () => {
        TryCatch(async () => {
            const cnt = await getVendorOrderCount('delivered', id);
            setDeliveredOrderCount(cnt?.data || 0);
        });
    }
    const getCanceledOrdersCount = () => {
        TryCatch(async () => {
            const cnt = await getVendorOrderCount('canceled', id);
            setCanceledOrderCount(cnt?.data || 0);
        });
    }
    const getReturnedOrdersCount = () => {
        TryCatch(async () => {
            const cnt = await getVendorOrderCount('returned', id);
            setReturnedOrderCount(cnt?.data || 0);
        });
    }
    const getFailedDeliveryOrdersCount = () => {
        TryCatch(async () => {
            const cnt = await getVendorOrderCount('failed', id);
            setFailedDeliveryOrderCount(cnt?.data || 0);
        });
    }

    const getAllOrderCountManage = async () => {
        await Promise.all([
            getPendingOrdersCount(),
            getReadyToShipOrdersCount(),
            getShippedOrdersCount(),
            getDeliveredOrdersCount(),
            getCanceledOrdersCount(),
            getReturnedOrdersCount(),
            getFailedDeliveryOrdersCount()
        ])
    }
    useEffect(() => {
        getAllOrderCountManage();
    }, [])


    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab sx={{ textTransform: 'capitalize', fontSize: '12px' }} label={`All`} {...a11yProps(0)} />
                    <Tab sx={{ textTransform: 'capitalize', fontSize: '12px' }} label={`Pending (${pendingOrderCount})`} {...a11yProps(1)} />
                    <Tab sx={{ textTransform: 'capitalize', fontSize: '12px' }} label={`Ready To Ship (${readyToShipOrderCount})`} {...a11yProps(2)} />
                    <Tab sx={{ textTransform: 'capitalize', fontSize: '12px' }} label={`Shipped (${shippedOrderCount})`} {...a11yProps(3)} />
                    <Tab sx={{ textTransform: 'capitalize', fontSize: '12px' }} label={`Delivered (${deliveredOrderCount})`} {...a11yProps(4)} />
                    <Tab sx={{ textTransform: 'capitalize', fontSize: '12px' }} label={`Canceled (${canceledOrderCount})`} {...a11yProps(5)} />
                    <Tab sx={{ textTransform: 'capitalize', fontSize: '12px' }} label={`Returned (${returnedOrderCount})`} {...a11yProps(6)} />
                    <Tab sx={{ textTransform: 'capitalize', fontSize: '12px' }} label={`Failed (${failedDeliveryOrderCount})`} {...a11yProps(7)} />
                </Tabs>
            </Box>
            {
                vendor_order_variation.map((type, index) => {
                    return (<TabPanel value={value} index={index} getAllOrderCountManage={getAllOrderCountManage}>
                        {type}
                    </TabPanel>)
                })
            }
        </Box>
    );
}