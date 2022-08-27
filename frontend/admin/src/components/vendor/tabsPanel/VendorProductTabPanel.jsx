import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { vendor_product_variation } from "constants/index";
import CaseDecision from "components/switch/CaseDecision";
import { useEffect, useState } from "react";
import { TryCatch } from "utils";
import { getProductCount } from "services/product/ProductService";
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

export default function VendorProductTabs() {
    const [value, setValue] = useState(0);
    const [allProductCount, setAllProductCount] = useState(0);
    const [pendingProductCount, setPendingProductCount] = useState(0);
    const [onlineProductCount, setOnlineProductCount] = useState(0);
    const [suspendedProductCount, setSuspendedProductCount] = useState(0);
    const { id } = useParams();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getProductsCount = () => {
        TryCatch(async () => {
            const cnt = await getProductCount('all', id);
            setAllProductCount(cnt?.data || 0);
        });
    }

    const getPendingProductsCount = () => {
        TryCatch(async () => {
            const cnt = await getProductCount('pending', id);
            setPendingProductCount(cnt?.data || 0);
        });
    }

    const getOnlineProductsCount = () => {
        TryCatch(async () => {
            const cnt = await getProductCount('online', id);
            setOnlineProductCount(cnt?.data || 0);
        });
    }

    const getSuspendedProductsCount = () => {
        TryCatch(async () => {
            const cnt = await getProductCount('suspended', id);
            setSuspendedProductCount(cnt?.data || 0);
        });
    }

    const getAllProductCountManage = async () => {
        await Promise.all([
            getProductsCount(),
            getOnlineProductsCount(),
            getPendingProductsCount(),
            getSuspendedProductsCount()
        ])
    }
    useEffect(() => {
        getAllProductCountManage();
    }, [])


    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab sx={{ textTransform: 'capitalize', fontSize: '12px' }} label={`All (${allProductCount})`} {...a11yProps(0)} />
                    <Tab sx={{ textTransform: 'capitalize', fontSize: '12px' }} label={`Online (${pendingProductCount})`} {...a11yProps(1)} />
                    <Tab sx={{ textTransform: 'capitalize', fontSize: '12px' }} label={`Pending (${onlineProductCount})`} {...a11yProps(2)} />
                    <Tab sx={{ textTransform: 'capitalize', fontSize: '12px' }} label={`Suspended (${suspendedProductCount})`} {...a11yProps(3)} />
                </Tabs>
            </Box>
            {
                vendor_product_variation.map((type, index) => {
                    return (<TabPanel value={value} index={index} getAllProductCountManage={getAllProductCountManage}>
                        {type}
                    </TabPanel>)
                })
            }
        </Box>
    );
}