import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { vendor_free_shipping_variation } from "constants/index";
import CaseDecision from "components/switch/CaseDecision";
import { useEffect, useState } from "react";
import { TryCatch } from "utils";
import { useParams } from "react-router-dom";
import { getFreeShippingCount } from "services/promotions/Promotion.Service";
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
                        <CaseDecision type={children} getAllFreeShippingCountManage={props?.getAllFreeShippingCountManage} />
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

export default function VendorFreeShipmentTabs() {
    const [value, setValue] = useState(0);
    const [allFreeShippingCount, setAllFreeShippingCount] = useState(0);
    const [activeFreeShippingCount, setActiveFreeShippingCount] = useState(0);
    const [deActiveFreeShippingCount, setDeActiveFreeShippingCount] = useState(0);
    const { id } = useParams()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const getFreeShippingsCount = () => {
        TryCatch(async () => {
            const cnt = await getFreeShippingCount('all', id);
            setAllFreeShippingCount(cnt?.data || 0);
        });
    }
    const getActiveFreeShippingsCount = () => {
        TryCatch(async () => {
            const cnt = await getFreeShippingCount('active', id);
            setActiveFreeShippingCount(cnt?.data || 0);
        });
    }
    const getDeActiveFreeShippingsCount = () => {
        TryCatch(async () => {
            const cnt = await getFreeShippingCount('deactive', id);
            setDeActiveFreeShippingCount(cnt?.data || 0);
        });
    }

    const getAllFreeShippingCountManage = async () => {
        await Promise.all([
            getFreeShippingsCount(),
            getActiveFreeShippingsCount(),
            getDeActiveFreeShippingsCount(),
        ])
    }
    useEffect(() => {
        getAllFreeShippingCountManage();
    }, [])


    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab sx={{ textTransform: 'capitalize', fontSize: '12px' }} label={`All (${allFreeShippingCount})`} {...a11yProps(0)} />
                    <Tab sx={{ textTransform: 'capitalize', fontSize: '12px' }} label={`Active (${activeFreeShippingCount})`} {...a11yProps(1)} />
                    <Tab sx={{ textTransform: 'capitalize', fontSize: '12px' }} label={`De Active (${deActiveFreeShippingCount})`} {...a11yProps(2)} />
                </Tabs>
            </Box>
            {
                vendor_free_shipping_variation.map((type, index) => {
                    return (<TabPanel value={value} index={index} getAllFreeShippingCountManage={getAllFreeShippingCountManage}>
                        {type}
                    </TabPanel>)
                })
            }
        </Box>
    );
}