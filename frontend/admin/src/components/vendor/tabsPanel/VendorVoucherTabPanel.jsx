import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { vendor_voucher_variation } from "constants/index";
import CaseDecision from "components/switch/CaseDecision";
import { useEffect, useState } from "react";
import { TryCatch } from "utils";
import { useParams } from "react-router-dom";
import { getVoucherCount } from "services/promotions/Promotion.Service";
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
                        <CaseDecision type={children} getAllVoucherCountManage={props?.getAllVoucherCountManage} />
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

export default function VendorVoucherTabs() {
    const [value, setValue] = useState(0);
    const [allVoucherCount, setAllVoucherCount] = useState(0);
    const [activeVoucherCount, setActiveVoucherCount] = useState(0);
    const [deActiveVoucherCount, setDeActiveVoucherCount] = useState(0);
    const { id } = useParams()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const getVouchersCount = () => {
        TryCatch(async () => {
            const cnt = await getVoucherCount('all', id);
            setAllVoucherCount(cnt?.data || 0);
        });
    }
    const getActiveVouchersCount = () => {
        TryCatch(async () => {
            const cnt = await getVoucherCount('active', id);
            setActiveVoucherCount(cnt?.data || 0);
        });
    }
    const getDeActiveVouchersCount = () => {
        TryCatch(async () => {
            const cnt = await getVoucherCount('deactive', id);
            setDeActiveVoucherCount(cnt?.data || 0);
        });
    }

    const getAllVoucherCountManage = async () => {
        await Promise.all([
            getVouchersCount(),
            getActiveVouchersCount(),
            getDeActiveVouchersCount(),
        ])
    }
    useEffect(() => {
        getAllVoucherCountManage();
    }, [])


    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab sx={{ textTransform: 'capitalize' }} label={`All (${allVoucherCount})`} {...a11yProps(0)} />
                    <Tab sx={{ textTransform: 'capitalize' }} label={`Active (${activeVoucherCount})`} {...a11yProps(1)} />
                    <Tab sx={{ textTransform: 'capitalize' }} label={`De Active (${deActiveVoucherCount})`} {...a11yProps(2)} />
                </Tabs>
            </Box>
            {
                vendor_voucher_variation.map((type, index) => {
                    return (<TabPanel value={value} index={index} getAllVoucherCountManage={getAllVoucherCountManage}>
                        {type}
                    </TabPanel>)
                })
            }
        </Box>
    );
}