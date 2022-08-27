import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { vendor_variation } from "constants/index";
import CaseDecision from "components/switch/CaseDecision";
import { useEffect, useState } from "react";
import { TryCatch } from "utils";
import { getVendorCount } from "services/vendor/VendorService";
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
                        <CaseDecision type={children} getAllVendorCountManage={props?.getAllVendorCountManage} />
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

export default function VendorTabs() {
    const [value, setValue] = useState(0);
    const [deActiveVendorsCount, setDeActiveVendorsCount] = useState(0);
    const [activeVendorsCount, setActiveVendorsCount] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const getDeActiveVendorsCount = () => {
        TryCatch(async () => {
            const cnt = await getVendorCount('de_active');
            setDeActiveVendorsCount(cnt?.data || 0);
        });
    }
    const getActiveVendorsCount = () => {
        TryCatch(async () => {
            const cnt = await getVendorCount('active');
            setActiveVendorsCount(cnt?.data || 0);
        });
    }

    const getAllVendorCountManage = async () => {
        await Promise.all([
            getDeActiveVendorsCount(),
            getActiveVendorsCount(),
        ])
    }
    useEffect(() => {
        getAllVendorCountManage();
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
                    <Tab sx={{ textTransform: 'capitalize' }} label={`Pending/DeActive (${deActiveVendorsCount})`} {...a11yProps(1)} />
                    <Tab sx={{ textTransform: 'capitalize' }} label={`Active (${activeVendorsCount})`} {...a11yProps(2)} />
                </Tabs>
            </Box>
            {
                vendor_variation.map((type, index) => {
                    return (<TabPanel value={value} index={index} getAllVendorCountManage={getAllVendorCountManage}>
                        {type}
                    </TabPanel>)
                })
            }
        </Box>
    );
}