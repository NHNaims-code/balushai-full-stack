import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { order_variation } from "constants/index";
import CaseDecision from "components/switch/CaseDecision";
import { useEffect, useState } from "react";
import { TryCatch } from "utils";
import { getOrderCount } from "services/order/OrderService";
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

export default function OrderTabs() {
    const [value, setValue] = useState(0);
    const [pendingOrderCount, setPendingOrderCount] = useState(0);
    const [readyToShipOrderCount, setReadyToShipOrderCount] = useState(0);
    const [shippedOrderCount, setShippedOrderCount] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const getPendingOrdersCount = () => {
        TryCatch(async () => {
            const cnt = await getOrderCount('pending');
            setPendingOrderCount(cnt?.data);
        });
    }
    const getReadyToShipOrdersCount = () => {
        TryCatch(async () => {
            const cnt = await getOrderCount('ready_to_ship');
            setReadyToShipOrderCount(cnt?.data);
        });
    }
    const getShippedOrdersCount = () => {
        TryCatch(async () => {
            const cnt = await getOrderCount('shipped');
            setShippedOrderCount(cnt?.data);
        });
    }
    const getAllOrderCountManage = async () => {
        await Promise.all([
            getPendingOrdersCount(),
            getReadyToShipOrdersCount(),
            getShippedOrdersCount()
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
                    <Tab sx={{ textTransform: 'capitalize' }} label={`All`} {...a11yProps(0)} />
                    <Tab sx={{ textTransform: 'capitalize' }} label={`Pending (${pendingOrderCount})`} {...a11yProps(1)} />
                    <Tab sx={{ textTransform: 'capitalize' }} label={`Ready To Ship (${readyToShipOrderCount})`} {...a11yProps(2)} />
                    <Tab sx={{ textTransform: 'capitalize' }} label={`Shipped (${shippedOrderCount})`} {...a11yProps(3)} />
                    <Tab sx={{ textTransform: 'capitalize' }} label="Delivered" {...a11yProps(4)} />
                    <Tab sx={{ textTransform: 'capitalize' }} label="Canceled" {...a11yProps(5)} />
                    <Tab sx={{ textTransform: 'capitalize' }} label="Returned" {...a11yProps(6)} />
                    <Tab sx={{ textTransform: 'capitalize' }} label="Failed Delivery" {...a11yProps(7)} />
                </Tabs>
            </Box>
            {
                order_variation.map((type, index) => {
                    return (<TabPanel value={value} index={index} getAllOrderCountManage={getAllOrderCountManage}>
                        {type}
                    </TabPanel>)
                })
            }
        </Box>
    );
}