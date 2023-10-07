import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export type TabsValue = 'information' | 'comments' | 'colaborators';

interface TabPanelProps {
    children?: React.ReactNode;
    index: TabsValue;
    value: TabsValue;
}

export function CustomTabPanel(props: TabPanelProps) {
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
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export function getTabProps(index: TabsValue) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

export let tabsData = {
    information: null,
    comments: null,
    colaborators: null
};

